import { 
    FD, 
    TZ,
    regions, 
    timezones, 
    districts, 
    type Locale, 
    type RegionItem 
} from '../dataset/dataset';
import { mapSVG } from '../map/map';
import { dict, type Dict } from '../dataset/dict';

export type Mode = 'region' | 'federal_district' | 'timezone';

export interface Region {
    id: string;
    title: string;
    federalDistrict: string;
    timezone: string;
    timezoneOffset: number;
}

export interface RUMapSettings {
    mode: Mode;
    locale?: Locale;
    selectedID?: string;
    mapClassName?: string;
    tooltipClassName?: string;
    onRegionClick?: (value: Region) => void;
}

const MINUTES_IN_HOUR = 60;
const MAP_SVG_ID = 'ru-map-russia-svg';
const CLASS_NAME_HOVERED = 'ru-map-hovered';
const CLASS_NAME_TOOLTIP = 'ru-map-tooltip';
const CLASS_NAME_SELECTED = 'ru-map-selected';
const CLASS_NAME_REGION = 'ru-map-russia-region';

export class RUMap {
    private dict: Dict = dict;
    private map: string = mapSVG;
    private timezones: Record<TZ, string[]> = timezones;
    private regions: Record<string, RegionItem> = regions;
    private federalDistricts: Record<FD, string[]> = districts;

    private root: HTMLElement | null = null;
    private tooltip: HTMLElement | null = null;
    private htmlRegions: HTMLCollection | never[] = [];
    
    private mode: Mode = 'region';
    private locale: Locale = 'ru';
    private selected_id: string | null = null;
    private mapClassName: string | null = null;
    private tooltipClassName: string | null = null;
    private onRegionClick: ((value: Region) => void) | null = null;

    constructor (id: string, settings?: RUMapSettings) {
        this.root = document.getElementById(id);
        
        if (settings?.mode) this.mode = settings.mode;
        if (settings?.locale) this.locale = settings.locale;
        if (settings?.selectedID) this.selected_id = settings.selectedID;
        if (settings?.mapClassName) this.mapClassName = settings.mapClassName;
        if (settings?.onRegionClick) this.onRegionClick = settings.onRegionClick;
        if (settings?.tooltipClassName) this.tooltipClassName = settings.tooltipClassName;

        if (this.root) {
            this.root.innerHTML = this.map;

            addRootStyles();

            const svg = document.getElementById(MAP_SVG_ID);

            if (this.mapClassName && svg) svg.classList.add(this.mapClassName);
  
            this.htmlRegions = this.root.getElementsByClassName(CLASS_NAME_REGION);
  
            for (let i = 0; i < this.htmlRegions.length; i++) {
                this.htmlRegions[i].addEventListener('click', this.onclick.bind(this));
                this.htmlRegions[i].addEventListener('mouseout', this.mouseout.bind(this));
                this.htmlRegions[i].addEventListener('mouseover', this.mouseover.bind(this));
                this.htmlRegions[i].addEventListener('mouseleave', this.clearAllHover.bind(this));
            }

            this.paintSelected();
        }
    }

    public setMode(mode: Mode) {
        this.mode = mode;

        this.paintSelected();
    }

    public setLocale(locale: Locale) {
        this.locale = locale;
    }

    private paintSelected() {
        this.clearAllSelected();

        if (!this.selected_id) return;

        const region = regions[this.selected_id];

        if (this.mode == 'region') {
            for (let i = 0; i < this.htmlRegions.length; i++) {
                if (this.selected_id === this.htmlRegions[i].id) {
                    this.htmlRegions[i].classList.add(CLASS_NAME_SELECTED);
                }
            }
        }
        if (this.mode == 'federal_district') {
            this.paintSelectedRegionsSet(this.federalDistricts[region.fd]);
        }
        if (this.mode == 'timezone') {
            this.paintSelectedRegionsSet(this.timezones[region.tz]);
        }
    }

    private drawTooltip(region: RegionItem, target: HTMLElement) {
        const rect: DOMRect = target.getBoundingClientRect();
        this.tooltip = document.createElement('span');
    
        switch (this.mode) {
        case 'federal_district':
            this.tooltip.innerText = `${region.title[this.locale]}\n${this.dict[region.fd][this.locale]}`;
            break;
        case 'timezone':
            this.tooltip.innerText = `${region.title[this.locale]}\n${this.dict[region.tz][this.locale]}`;
            break;
        case 'region':
        default:
            this.tooltip.innerText = region.title[this.locale];
            break;
        }

        this.tooltip.style.content = '';
        this.tooltip.style.position = 'absolute';
        this.tooltip.style.top = Math.round(rect.y + rect.height)+'px';
        this.tooltip.style.left = Math.round(rect.x + rect.width / 2)+'px';

        if (this.tooltipClassName) {
            this.tooltip.classList.add(this.tooltipClassName);
        } else {
            this.tooltip.classList.add(CLASS_NAME_TOOLTIP);
        };

        document.body.appendChild(this.tooltip);
    }

    private mouseover(event: Event) {
        const target = event.target as HTMLElement;
        const region = this.regions[target.id];

        this.drawTooltip(region, target);

        if (this.mode === 'federal_district') {
            this.paintHoverRegionsSet(this.federalDistricts[region.fd]);
        }

        if (this.mode === 'timezone') {
            this.paintHoverRegionsSet(this.timezones[region.tz]);
        }
    }

    private mouseout() {
        this.tooltip?.remove();
    }

    private onclick(event: Event) {
        const target = event.target as HTMLElement;
        const region = this.regions[target.id];

        const value: Region = {
            id: target.id,
            title: region.title[this.locale],
            federalDistrict: this.dict[region.fd][this.locale],
            timezone: this.dict[region.tz][this.locale],
            timezoneOffset: getTimezoneOffset(this.dict[region.tz][this.locale].split('UTC')[1]),
        };

        this.setSelected(value.id);

        if (this.onRegionClick) {
            this.onRegionClick(value);    
        }
    }

    private setSelected(id: string) {
        this.selected_id = id;
        this.paintSelected();
    }

    private clearAllHover() {
        for (let i = 0; i < this.htmlRegions.length; i++) {
            this.htmlRegions[i].classList.remove(CLASS_NAME_HOVERED);
        }
    }

    private clearAllSelected() {
        for (let i = 0; i < this.htmlRegions.length; i++) {
            this.htmlRegions[i].classList.remove(CLASS_NAME_SELECTED);
        }
    }

    private paintHoverRegionsSet(dataset: string[]) {
        for (let i = 0; i < this.htmlRegions.length; i++) {
            for (let j = 0; j < dataset.length; j++) {
                if (dataset[j] === this.htmlRegions[i].id) {
                    this.htmlRegions[i].classList.add(CLASS_NAME_HOVERED);
                }
            }
        }
    }

    private paintSelectedRegionsSet(dataset: string[]) {        
        for (let i = 0; i < this.htmlRegions.length; i++) {
            if (dataset.includes(this.htmlRegions[i].id)) {
                for (let j = 0; j < dataset.length; j++) {
                    this.htmlRegions[i].classList.add(CLASS_NAME_SELECTED);
                }
            }
        }
    }
}

function getTimezoneOffset(offset: string): number {
    const offsetHours = Number(offset);

    if (!Number.isNaN(offsetHours)) {
        return -(offsetHours  * MINUTES_IN_HOUR);
    }

    return 0;
}

function addRootStyles() {
    const css = `.${CLASS_NAME_REGION} { fill: lightgray; transition: 0.2s; } .${CLASS_NAME_REGION}:hover { fill: darkgray; }`;
    const cssTimezone = ` .${CLASS_NAME_HOVERED} { fill: darkgray; }`;
    const cssSelected = ` .${CLASS_NAME_SELECTED}{ fill: gray; }`;
    const cssTooltip = ` .${CLASS_NAME_TOOLTIP} { padding: 4px; color: white; background-color: #212121; font-size: 14px; }`;

    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css + cssTimezone + cssSelected + cssTooltip));

    document.head.appendChild(style);
}
