import { mapSVG } from './map-svg';
import { 
    dict, 
    Dict, 
    districts, 
    FD, 
    TZ,
    type Locale, 
    type Region, 
    regions, 
    timezones, 
} from './dataset';

export type Mode = 'region' | 'federal_district' | 'timezone'

export interface RUMapSettings {
    mode: Mode;
    locale?: Locale;
}

export class RUMap {
    private _root: HTMLElement | null = null;
    private _map: string = mapSVG;
    private _mode: Mode = 'region';
    private _locale: Locale = 'ru';
    private _tooltip: HTMLElement | null = null;
    private _regions: Record<string, Region> = regions;
    private _htmlRegions: HTMLCollection | never[] = [];
    private _federal_districts: Record<FD, string[]> = districts;
    private _timezones: Record<TZ, string[]> = timezones;
    private _dict: Dict = dict;

    constructor (id: string, settings: RUMapSettings) {
        this._mode = settings.mode;
        this._root = document.getElementById(id);
        
        if (settings.locale) this._locale = settings.locale;

        if (this._root) {
            this._root.innerHTML = this._map;

            addStyles();
  
            this._htmlRegions = this._root.getElementsByClassName('russia-region');
  
            for (let i = 0; i < this._htmlRegions.length; i++) {
                this._htmlRegions[i].addEventListener('mouseover', this.mouseover.bind(this));
                this._htmlRegions[i].addEventListener('mouseleave', this.clearAll.bind(this));
                this._htmlRegions[i].addEventListener('mouseout', this.mouseout.bind(this));
            }
        }
    }

    public setMode(mode: Mode) {
        this._mode = mode;
    }

    public setLocale(locale: Locale) {
        this._locale = locale;
    }

    mouseover(event: Event) {
        const target = event.target as HTMLElement;
        const rect: DOMRect = target.getBoundingClientRect();

        this._tooltip = document.createElement('span');
        
        const region = this._regions[target.id];
    
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
        this._tooltip.style.padding = '4px';
        this._tooltip.style.left = Math.round(rect.x + rect.width / 2)+'px';
        this._tooltip.style.top = Math.round(rect.y + rect.height)+'px';
        this._tooltip.style.backgroundColor = '#212121';
        this._tooltip.style.color = 'white';

        document.body.appendChild(this._tooltip);

        if (this._mode === 'federal_district') {
            const region = this._regions[target.id];

            const districts = this._federal_districts[region.fd];

            for (let i = 0; i < this._htmlRegions.length; i++) {
                for (let j = 0; j < districts.length; j++) {
                    if (districts[j] === this._htmlRegions[i].id) {
                        this._htmlRegions[i].classList.add('hovered');
                    }
                }
            }
        }

        if (this._mode === 'timezone') {
            const region = this._regions[target.id];

            const timezone = this._timezones[region.tz];

            for (let i = 0; i < this._htmlRegions.length; i++) {
                for (let j = 0; j < timezone.length; j++) {
                    if (timezone[j] === this._htmlRegions[i].id) {
                        this._htmlRegions[i].classList.add('hovered');
                    }
                }
            }
        }
    }

    mouseout() {
        this._tooltip?.remove();
    }

    clearAll() {
        const regions = document.getElementById('ru-map-root')?.getElementsByClassName('russia-region') || [];

        for (let i = 0; i < regions.length; i++) {
            regions[i].classList.remove('hovered');
        }
    }
}

function addStyles() {
    const css = '.russia-region { fill: lightgray; transition: 0.2s; } .russia-region:hover { fill: gray; }';
    const cssTimezone = ' .hovered { fill: gray; }';
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css + cssTimezone));

    document.head.appendChild(style);
}
