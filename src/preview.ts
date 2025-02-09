import { Region } from './rumap/RUMap';
import { RUMap, type Mode, type Locale } from './main';

function start() {
    const map = new RUMap('ru-map-root', { 
        mode: 'region',
        onRegionClick: (value: Region) => console.log(value),
    });

    const selectMode = document.getElementById('ru-map-mode-select');
    const selectLocale = document.getElementById('ru-map-locale-select');

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
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.onload = start();