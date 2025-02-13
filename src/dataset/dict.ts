import { FD, TZ, type Locale } from './dataset';

export type Dict =  Record<FD | TZ, Record<Locale, string>>;

export const dict: Dict = {
    KALT: {
        ru: 'Калининградское время UTC+2',
        en: 'Kaliningrad time UTC+2',
    },
    MSK: {
        ru: 'Московское время UTC+3',
        en: 'Moscow time UTC+3',
    },
    SAMT: {
        ru: 'Самарское время UTC+4',
        en: 'Samara time UTC+4',
    },
    YEKT: {
        ru: 'Екатеринбургское время UTC+5',
        en: 'Yekaterinburg time UTC+5',
    },
    OMST: {
        ru: 'Омское время UTC+6',
        en: 'Omsk time UTC+6',
    },
    KRAT: {
        ru: 'Красноярское время UTC+7',
        en: 'Krasnoyarsk time UTC+7',
    },
    IRKT: {
        ru: 'Иркутское время UTC+8',
        en: 'Irkutsk time UTC+8',
    },
    YAKT: {
        ru: 'Якутское время UTC+9',
        en: 'Yakutsk time UTC+9',
    },
    VLAT: {
        ru: 'Владивостокское время UTC+10',
        en: 'Vladivostok time UTC+10',
    },
    MAGT: {
        ru: 'Магаданское время UTC+11',
        en: 'Magadan time UTC+11',
    },
    PETT: {
        ru: 'Камчатское время UTC+12',
        en: 'Kamchatka time UTC+12',
    },
    CFD: {
        ru: 'Центральный федеральный округ',
        en: 'Central federal district',
    },
    NWFD: {
        ru: 'Северо-Западный федеральный округ',
        en: 'Northwestern federal dfistrict',
    },
    SFD: {
        ru: 'Южный федеральный округ',
        en: 'Southern federal dfistrict',
    },
    NCFD: {
        ru: 'Северо-Кавказский федеральный округ',
        en: 'North Caucasian federal dfistrict',
    },
    PFD: {
        ru: 'Приволжский федеральный округ',
        en: 'Volga federal dfistrict',
    },
    UFD: {
        ru: 'Уральский федеральный округ',
        en: 'Ural federal dfistrict',
    },
    SBFD: {
        ru: 'Сибирский федеральный округ',
        en: 'Siberian federal dfistrict',
    },
    FEFD: {
        ru: 'Дальневосточный федеральный округ',
        en: 'Far Eastern federal dfistrict',
    },
};