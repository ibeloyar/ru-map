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
} from './dataset';
import { mapSVG } from './map';

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
    private _dict: Dict = dict;
    private _map: string = mapSVG;
    private _timezones: Record<TZ, string[]> = timezones;
    private _regions: Record<string, RegionItem> = regions;
    private _federal_districts: Record<FD, string[]> = districts;

    private _root: HTMLElement | null = null;
    private _tooltip: HTMLElement | null = null;
    private _htmlRegions: HTMLCollection | never[] = [];
    
    private _mode: Mode = 'region';
    private _locale: Locale = 'ru';
    private _on_region_click: ((value: Region) => void) | null = null;

    constructor (id: string, settings?: RUMapSettings) {
        this._root = document.getElementById(id);
        
        if (settings?.mode) this._mode = settings.mode;
        if (settings?.locale) this._locale = settings.locale;
        if (settings?.onRegionClick) this._on_region_click = settings.onRegionClick;

        if (this._root) {
            this._root.innerHTML = this._map;

            addStyles();
  
            this._htmlRegions = this._root.getElementsByClassName('ru-map-russia-region');
  
            for (let i = 0; i < this._htmlRegions.length; i++) {
                this._htmlRegions[i].addEventListener('click', this.onclick.bind(this));
                this._htmlRegions[i].addEventListener('mouseout', this.mouseout.bind(this));
                this._htmlRegions[i].addEventListener('mouseover', this.mouseover.bind(this));
                this._htmlRegions[i].addEventListener('mouseleave', this.clearAll.bind(this));
            }
        }
    }

    public setMode(mode: Mode) {
        this._mode = mode;
    }

    public setLocale(locale: Locale) {
        this._locale = locale;
    }

    private drawTooltip(region: RegionItem, target: HTMLElement) {
        const rect: DOMRect = target.getBoundingClientRect();
        this._tooltip = document.createElement('span');
    
        switch (this._mode) {
        case 'federal_district':
            this._tooltip.innerText = this._dict[region.fd][this._locale];
            break;
        case 'timezone':
            this._tooltip.innerText = this._dict[region.tz][this._locale];
            break;
        case 'region':
        default:
            this._tooltip.innerText = region.title[this._locale];
            break;
        }

        this._tooltip.style.content = '';
        this._tooltip.style.position = 'absolute';
        this._tooltip.style.top = Math.round(rect.y + rect.height)+'px';
        this._tooltip.style.left = Math.round(rect.x + rect.width / 2)+'px';
        this._tooltip.style.padding = '4px';
        this._tooltip.style.color = 'white';
        this._tooltip.style.backgroundColor = '#212121';

        document.body.appendChild(this._tooltip);
    }

    private mouseover(event: Event) {
        const target = event.target as HTMLElement;
        const region = this._regions[target.id];

        this.drawTooltip(region, target);

        if (this._mode === 'federal_district') {
            const districts = this._federal_districts[region.fd];

            hoverRegions(this._htmlRegions, districts);
        }

        if (this._mode === 'timezone') {
            const timezone = this._timezones[region.tz];

            hoverRegions(this._htmlRegions, timezone);
        }
    }

    private mouseout() {
        this._tooltip?.remove();
    }

    private onclick(event: Event) {
        const target = event.target as HTMLElement;
        const region = this._regions[target.id];

        const value: Region = {
            id: target.id,
            title: region.title[this._locale],
            federalDistrict: this._dict[region.fd][this._locale],
            timezone: this._dict[region.tz][this._locale],
            timezoneOffset: getTimezoneOffset(this._dict[region.tz][this._locale].split('UTC')[1]),
        };

        if (this._on_region_click) {
            this._on_region_click(value);
        }
    }

    private clearAll() {
        for (let i = 0; i < this._htmlRegions.length; i++) {
            this._htmlRegions[i].classList.remove('ru-map-hovered');
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
