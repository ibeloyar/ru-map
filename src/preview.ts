import { RUMap } from './main';
import type { Mode, Locale, Region } from './main';

function start() {
    const selectMode = document.getElementById('ru-map-mode-select');
    const selectLocale = document.getElementById('ru-map-locale-select');
    const selectedRegion = document.getElementById('ru-map-selected-regeon');

    const onRegionClick = (value: Region) => {
        if (selectedRegion) {
            selectedRegion.innerText = JSON.stringify(value, null, 2);
            console.log(value);
        }
    };

    const map = new RUMap('ru-map-root', { 
        mode: 'region',
        onRegionClick: onRegionClick,
        tooltipClassName: 'test_class_for_tooltip',
    });

    if (selectMode) {
        selectMode.onchange = (event: Event) => {
            const target = event.target as HTMLSelectElement;
            map.setMode(target.value as Mode);
        };
    }

    if (selectLocale) {
        selectLocale.onchange = (event: Event) => {
            const target = event.target as HTMLSelectElement;
            map.setLocale(target.value as Locale);
        };
    }

    if (selectedRegion) {
        selectedRegion.innerText = JSON.stringify({
            'id': '',
            'title': '',
            'federalDistrict': '',
            'timezone': '',
            'timezoneOffset': 0,
        }, null, 2);
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.onload = start();