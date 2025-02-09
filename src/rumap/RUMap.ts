import { 
    FD, 
    TZ,
    Dict, 
    dict,
    regions, 
    timezones, 
    districts, 
    type Locale, 
    type RegionItem 
} from '../dataset/dataset';
import { mapSVG } from '../map/map';

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
    onRegionClick?: (value: Region) => void;
}

const MINUTES_IN_HOUR = 60;

export class RUMap {
    private dict: Dict = dict;
    private map: string = mapSVG;
    private timezones: Record<TZ, string[]> = timezones;
    private regions: Record<string, RegionItem> = regions;
    private federal_districts: Record<FD, string[]> = districts;

    private root: HTMLElement | null = null;
    private tooltip: HTMLElement | null = null;
    private htmlRegions: HTMLCollection | never[] = [];
    
    private mode: Mode = 'region';
    private locale: Locale = 'ru';
    private on_region_click: ((value: Region) => void) | null = null;

    constructor (id: string, settings?: RUMapSettings) {
        this.root = document.getElementById(id);
        
        if (settings?.mode) this.mode = settings.mode;
        if (settings?.locale) this.locale = settings.locale;
        if (settings?.onRegionClick) this.on_region_click = settings.onRegionClick;

        if (this.root) {
            this.root.innerHTML = this.map;

            addStyles();
  
            this.htmlRegions = this.root.getElementsByClassName('ru-map-russia-region');
  
            for (let i = 0; i < this.htmlRegions.length; i++) {
                this.htmlRegions[i].addEventListener('click', this.onclick.bind(this));
                this.htmlRegions[i].addEventListener('mouseout', this.mouseout.bind(this));
                this.htmlRegions[i].addEventListener('mouseover', this.mouseover.bind(this));
                this.htmlRegions[i].addEventListener('mouseleave', this.clearAll.bind(this));
            }
        }
    }

    public setMode(mode: Mode) {
        this.mode = mode;
    }

    public setLocale(locale: Locale) {
        this.locale = locale;
    }

    private drawTooltip(region: RegionItem, target: HTMLElement) {
        const rect: DOMRect = target.getBoundingClientRect();
        this.tooltip = document.createElement('span');
    
        switch (this.mode) {
        case 'federal_district':
            this.tooltip.innerText = this.dict[region.fd][this.locale];
            break;
        case 'timezone':
            this.tooltip.innerText = this.dict[region.tz][this.locale];
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
        this.tooltip.style.padding = '4px';
        this.tooltip.style.color = 'white';
        this.tooltip.style.backgroundColor = '#212121';

        document.body.appendChild(this.tooltip);
    }

    private mouseover(event: Event) {
        const target = event.target as HTMLElement;
        const region = this.regions[target.id];

        this.drawTooltip(region, target);

        if (this.mode === 'federal_district') {
            const districts = this.federal_districts[region.fd];

            hoverRegions(this.htmlRegions, districts);
        }

        if (this.mode === 'timezone') {
            const timezone = this.timezones[region.tz];

            hoverRegions(this.htmlRegions, timezone);
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

        if (this.on_region_click) {
            this.on_region_click(value);
        }
    }

    private clearAll() {
        for (let i = 0; i < this.htmlRegions.length; i++) {
            this.htmlRegions[i].classList.remove('ru-map-hovered');
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

function hoverRegions(regions: HTMLCollection | never[], dataset: string[]) {
    for (let i = 0; i < regions.length; i++) {
        for (let j = 0; j < dataset.length; j++) {
            if (dataset[j] === regions[i].id) {
                regions[i].classList.add('ru-map-hovered');
            }
        }
    }
}

function addStyles() {
    const css = '.ru-map-russia-region { fill: lightgray; transition: 0.2s; } .ru-map-russia-region:hover { fill: gray; }';
    const cssTimezone = ' .ru-map-hovered { fill: gray; }';
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css + cssTimezone));

    document.head.appendChild(style);
}
