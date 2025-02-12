export type Locale = 'ru' | 'en';

export enum FD {
    CFD = 'CFD',
    NWFD = 'NWFD',
    SFD = 'SFD',
    NCFD = 'NCFD',
    PFD = 'PFD',
    UFD = 'UFD',
    SBFD = 'SBFD',
    FEFD = 'FEFD',
}

export enum TZ {
    KALT = 'KALT',
    MSK = 'MSK',
    SAMT = 'SAMT',
    YEKT = 'YEKT',
    OMST = 'OMST',
    KRAT = 'KRAT',
    IRKT = 'IRKT',
    YAKT = 'YAKT',
    VLAT = 'VLAT',
    MAGT = 'MAGT',
    PETT = 'PETT',
}

export interface RegionItem {
    title: {
        ru: string;
        en: string;
    },
    fd: FD;
    tz: TZ;
}

export const districts: Record<FD, string[]> = {
    // KALT (калининградское время) UTC+2
    [FD.CFD]: [
        'RU-BEL', 'RU-BRY', 'RU-VLA', 'RU-VOR', 'RU-IVA', 'RU-KLU',
        'RU-KOS', 'RU-KRS', 'RU-LIP', 'RU-MOS', 'RU-ORL', 'RU-RYA',
        'RU-SMO', 'RU-TAM', 'RU-TVE', 'RU-TUL', 'RU-YAR', 'RU-MOW'
    ],
    [FD.NWFD]: [
        'RU-ARK', 'RU-VLG', 'RU-KGD', 'RU-KR', 'RU-KO', 'RU-LEN',
        'RU-MUR', 'RU-NEN', 'RU-NGR', 'RU-PSK', 'RU-SPE'
    ],
    [FD.SFD]: [
        'RU-AD', 'RU-AST', 'RU-VGG', 'RU-KL', 'RU-KDA', 'RU-ROS', 'RU-CR', 'RU-SEV'
    ],
    [FD.NCFD]: [
        'RU-DA', 'RU-IN', 'RU-KB', 'RU-KC', 'RU-SE', 'RU-STA', 'RU-CE'
    ],
    [FD.PFD]: [
        'RU-BA', 'RU-KIR', 'RU-ME', 'RU-CU', 'RU-MO', 'RU-NIZ', 
        'RU-ORE', 'RU-PNZ', 'RU-PER', 'RU-SAM', 'RU-SAR', 'RU-TA',
        'RU-UD', 'RU-ULY'
    ],
    [FD.UFD]: [
        'RU-YAN', 'RU-KHM', 'RU-TYU', 'RU-KGN', 'RU-SVE', 'RU-CHE'
    ],
    [FD.SBFD]: [
        'RU-AL', 'RU-ALT', 'RU-IRK', 'RU-KEM', 'RU-KYA', 
        'RU-NVS', 'RU-OMS', 'RU-TOM', 'RU-TY', 'RU-KK'
    ],
    [FD.FEFD]: [
        'RU-AMU', 'RU-BU', 'RU-YEV', 'RU-ZAB', 'RU-KAM', 'RU-MAG', 
        'RU-PRI', 'RU-SA', 'RU-SAK', 'RU-KHA', 'RU-CHU'
    ],
};

export const timezones: Record<TZ, string[]> = {
    [TZ.KALT]: ['RU-KGD'],
    [TZ.MSK]: [
        'RU-KIR', 'RU-ME', 'RU-MO', 'RU-NIZ', 'RU-PNZ', 'RU-TA', 'RU-CU', 'RU-SEV', 'RU-CR', 
        'RU-ROS', 'RU-KDA', 'RU-KL', 'RU-VGG', 'RU-AD', 'RU-ARK', 'RU-VLG', 'RU-KR', 'RU-KO',
        'RU-LEN', 'RU-MUR','RU-NEN', 'RU-NGR', 'RU-PSK', 'RU-SPE', 'RU-BEL', 'RU-BRY', 'RU-VLA',
        'RU-VOR', 'RU-IVA', 'RU-KLU', 'RU-KOS', 'RU-KRS', 'RU-LIP', 'RU-MOS', 'RU-ORL', 'RU-RYA',
        'RU-SMO', 'RU-TAM', 'RU-TVE', 'RU-TUL', 'RU-YAR', 'RU-MOW', 'RU-DA', 'RU-IN', 'RU-KB', 
        'RU-KC', 'RU-SE', 'RU-STA', 'RU-CE'
    ],
    [TZ.SAMT]: ['RU-AST', 'RU-SAM', 'RU-SAR', 'RU-ULY', 'RU-UD'],
    [TZ.YEKT]: ['RU-YAN', 'RU-KHM', 'RU-TYU', 'RU-KGN', 'RU-SVE', 'RU-CHE', 'RU-ORE', 'RU-BA', 'RU-PER'],
    [TZ.OMST]: ['RU-OMS'],
    [TZ.KRAT]: ['RU-AL', 'RU-ALT', 'RU-KEM', 'RU-KYA', 'RU-NVS', 'RU-TOM', 'RU-TY', 'RU-KK'],
    [TZ.IRKT]: ['RU-BU', 'RU-IRK'],
    [TZ.YAKT]: ['RU-SA', 'RU-AMU', 'RU-ZAB'],
    [TZ.VLAT]: ['RU-PRI', 'RU-KHA'],
    [TZ.MAGT]: ['RU-MAG', 'RU-SAK'],
    [TZ.PETT]: ['RU-KAM', 'RU-CHU'],
};

export const regions: Record<string, RegionItem> = {
    'RU-BEL': {
        title: {
            ru: 'Белгородская область',
            en: 'Belgorod region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-BRY': {
        title: {
            ru: 'Брянская область',
            en: 'Bryansk region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-VLA': {
        title: {
            ru: 'Владимирская область',
            en: 'Vladimir region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-VOR': {
        title: {
            ru: 'Воронежская область',
            en: 'Voronezh region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-IVA': {
        title: {
            ru: 'Ивановская область',
            en: 'Ivanovo region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-KLU': {
        title: {
            ru: 'Калужская область',
            en: 'Kaluga region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-KOS': {
        title: {
            ru: 'Костромская область',
            en: 'Kostroma region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-KRS': {
        title: {
            ru: 'Курская область',
            en: 'Kursk region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-LIP': {
        title: {
            ru: 'Липецкая область',
            en: 'Lipetsk region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-MOS': {
        title: {
            ru: 'Московская область',
            en: 'Moscow region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-ORL': {
        title: {
            ru: 'Орловская область',
            en: 'Oryol region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-RYA': {
        title: {
            ru: 'Рязанская область',
            en: 'Ryazan region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-SMO': {
        title: {
            ru: 'Смоленская область',
            en: 'Smolensk region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-TAM': {
        title: {
            ru: 'Тамбовская область',
            en: 'Tambov region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-TVE': {
        title: {
            ru: 'Тверская область',
            en: 'Tver region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-TUL': {
        title: {
            ru: 'Тульская область',
            en: 'Tula region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-YAR': {
        title: {
            ru: 'Ярославская область',
            en: 'Yaroslavl region',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-MOW': {
        title: {
            ru: 'Москва',
            en: 'Moscow',
        },
        fd: FD.CFD,
        tz: TZ.MSK,
    },
    'RU-ARK': {
        title: {
            ru: 'Архангельская область',
            en: 'Arkhangelsk region',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-VLG': {
        title: {
            ru: 'Вологодская область',
            en: 'Vologda region',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-KGD': {
        title: {
            ru: 'Калининградская область',
            en: 'Kaliningrad region',
        },
        fd: FD.NWFD,
        tz: TZ.KALT,
    },
    'RU-KR': {
        title: {
            ru: 'Республика Карелия',
            en: 'Republic of Karelia',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-KO': {
        title: {
            ru: 'Республика Коми',
            en: 'Komi republic',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-LEN': {
        title: {
            ru: 'Ленинградская область',
            en: 'Leningrad region',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-MUR': {
        title: {
            ru: 'Мурманская область',
            en: 'Murmansk region',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-NEN': {
        title: {
            ru: 'Ненецкий автономный округ',
            en: 'Nenets autonomous okrug',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-NGR': {
        title: {
            ru: 'Новгородская область',
            en: 'Novgorod region',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-PSK': {
        title: {
            ru: 'Псковская область',
            en: 'Pskov region',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-SPE': {
        title: {
            ru: 'Санкт-Петербург',
            en: 'Saint Petersburg',
        },
        fd: FD.NWFD,
        tz: TZ.MSK,
    },
    'RU-AD': {
        title: {
            ru: 'Республика Адыгея',
            en: 'Republic of Adygea',
        },
        fd: FD.SFD,
        tz: TZ.MSK,
    },
    'RU-AST': {
        title: {
            ru: 'Астраханская область',
            en: 'Astrakhan region',
        },
        fd: FD.SFD,
        tz: TZ.SAMT,
    },
    'RU-VGG': {
        title: {
            ru: 'Волгоградская область',
            en: 'Volgograd region',
        },
        fd: FD.SFD,
        tz: TZ.MSK,
    },
    'RU-KL': {
        title: {
            ru: 'Республика Калмыкия',
            en: 'Republic of Kalmykia',
        },
        fd: FD.SFD,
        tz: TZ.MSK,
    },
    'RU-KDA': {
        title: {
            ru: 'Краснодарский край',
            en: 'Krasnodar krai',
        },
        fd: FD.SFD,
        tz: TZ.MSK,
    },
    'RU-ROS': {
        title: {
            ru: 'Ростовская область',
            en: 'Rostov region',
        },
        fd: FD.SFD,
        tz: TZ.MSK,
    },
    'RU-CR': {
        title: {
            ru: 'Республика Крым',
            en: 'Republic of Crimea',
        },
        fd: FD.SFD,
        tz: TZ.MSK,
    },
    'RU-SEV': {
        title: {
            ru: 'Севастополь',
            en: 'Sevastopol',
        },
        fd: FD.SFD,
        tz: TZ.MSK,
    },
    'RU-DA': {
        title: {
            ru: 'Республика Дагестан',
            en: 'Republic of Dagestan',
        },
        fd: FD.NCFD,
        tz: TZ.MSK,
    },
    'RU-IN': {
        title: {
            ru: 'Республика Ингушетия',
            en: 'Republic of Ingushetia',
        },
        fd: FD.NCFD,
        tz: TZ.MSK,
    },
    'RU-KB': {
        title: {
            ru: 'Кабардино-Балкарская республика',
            en: 'Kabardino-Balkarian republic',
        },
        fd: FD.NCFD,
        tz: TZ.MSK,
    },
    'RU-KC': {
        title: {
            ru: 'Карачаево-Черкесская Республика',
            en: 'Karachay-Cherkess republic',
        },
        fd: FD.NCFD,
        tz: TZ.MSK,
    },
    'RU-SE': {
        title: {
            ru: 'Республика Северная Осетия',
            en: 'Republic of North Ossetia',
        },
        fd: FD.NCFD,
        tz: TZ.MSK,
    },
    'RU-STA': {
        title: {
            ru: 'Ставропольский край',
            en: 'Stavropol krai',
        },
        fd: FD.NCFD,
        tz: TZ.MSK,
    },
    'RU-CE': {
        title: {
            ru: 'Чеченская Республика',
            en: 'Chechen republic',
        },
        fd: FD.NCFD,
        tz: TZ.MSK,
    },
    'RU-BA': {
        title: {
            ru: 'Республика Башкортостан',
            en: 'Republic of Bashkortostan',
        },
        fd: FD.PFD,
        tz: TZ.YEKT,
    },
    'RU-KIR': {
        title: {
            ru: 'Кировская область',
            en: 'Kirov region',
        },
        fd: FD.PFD,
        tz: TZ.MSK,
    },
    'RU-ME': {
        title: {
            ru: 'Республика Марий Эл',
            en: 'Republic of Mari El',
        },
        fd: FD.PFD,
        tz: TZ.MSK,
    },
    'RU-MO': {
        title: {
            ru: 'Республика Мордовия',
            en: 'Republic of Mordovia',
        },
        fd: FD.PFD,
        tz: TZ.MSK,
    },
    'RU-NIZ': {
        title: {
            ru: 'Нижегородская область',
            en: 'Nizhny Novgorod region',
        },
        fd: FD.PFD,
        tz: TZ.MSK,
    },
    'RU-ORE': {
        title: {
            ru: 'Оренбургская область',
            en: 'Orenburg region',
        },
        fd: FD.PFD,
        tz: TZ.YEKT,
    },
    'RU-PNZ': {
        title: {
            ru: 'Пензенская область',
            en: 'Penza region',
        },
        fd: FD.PFD,
        tz: TZ.MSK,
    },
    'RU-PER': {
        title: {
            ru: 'Пермский край',
            en: 'Perm krai',
        },
        fd: FD.PFD,
        tz: TZ.YEKT,
    },
    'RU-SAM': {
        title: {
            ru: 'Самарская область',
            en: 'Samara region',
        },
        fd: FD.PFD,
        tz: TZ.SAMT,
    },
    'RU-SAR': {
        title: {
            ru: 'Саратовская область',
            en: 'Saratov region',
        },
        fd: FD.PFD,
        tz: TZ.SAMT,
    },
    'RU-TA': {
        title: {
            ru: 'Республика Татарстан',
            en: 'Republic of Tatarstan',
        },
        fd: FD.PFD,
        tz: TZ.MSK,
    },
    'RU-UD': {
        title: {
            ru: 'Удмуртская Республика',
            en: 'Udmurt republic',
        },
        fd: FD.PFD,
        tz: TZ.SAMT,
    },
    'RU-ULY': {
        title: {
            ru: 'Ульяновская область',
            en: 'Ulyanovsk region',
        },
        fd: FD.PFD,
        tz: TZ.SAMT,
    },
    'RU-CU': {
        title: {
            ru: 'Чувашская Республика',
            en: 'Chuvash republic',
        },
        fd: FD.PFD,
        tz: TZ.MSK,
    },
    'RU-KGN': {
        title: {
            ru: 'Курганская область',
            en: 'Kurgan region',
        },
        fd: FD.UFD,
        tz: TZ.YEKT,
    },
    'RU-SVE': {
        title: {
            ru: 'Свердловская область',
            en: 'Sverdlovsk region',
        },
        fd: FD.UFD,
        tz: TZ.YEKT,
    },
    'RU-TYU': {
        title: {
            ru: 'Тюменская область',
            en: 'Tyumen region',
        },
        fd: FD.UFD,
        tz: TZ.YEKT,
    },
    'RU-KHM': {
        title: {
            ru: 'Ханты-Мансийский автономный округ',
            en: 'Khanty-Mansi autonomous okrug',
        },
        fd: FD.UFD,
        tz: TZ.YEKT,
    },
    'RU-CHE': {
        title: {
            ru: 'Челябинская область',
            en: 'Chelyabinsk region',
        },
        fd: FD.UFD,
        tz: TZ.YEKT,
    },
    'RU-YAN': {
        title: {
            ru: 'Ямало-Ненецкий автономный округ',
            en: 'Yamalo-Nenets autonomous okrug',
        },
        fd: FD.UFD,
        tz: TZ.YEKT,
    },
    'RU-AL': {
        title: {
            ru: 'Республика Алтай',
            en: 'Altai republic',
        },
        fd: FD.SBFD,
        tz: TZ.KRAT,
    },
    'RU-ALT': {
        title: {
            ru: 'Алтайский край',
            en: 'Altai krai',
        },
        fd: FD.SBFD,
        tz: TZ.KRAT,
    },
    'RU-IRK': {
        title: {
            ru: 'Иркутская область',
            en: 'Irkutsk region',
        },
        fd: FD.SBFD,
        tz: TZ.IRKT,
    },
    'RU-KEM': {
        title: {
            ru: 'Кемеровская область – Кузбасс',
            en: 'Kemerovo region – Kuzbass',
        },
        fd: FD.SBFD,
        tz: TZ.KRAT,
    },
    'RU-KYA': {
        title: {
            ru: 'Красноярский край',
            en: 'Krasnoyarsk krai',
        },
        fd: FD.SBFD,
        tz: TZ.KRAT,
    },
    'RU-NVS': {
        title: {
            ru: 'Новосибирская область',
            en: 'Novosibirsk region',
        },
        fd: FD.SBFD,
        tz: TZ.KRAT,
    },
    'RU-OMS': {
        title: {
            ru: 'Омская область',
            en: 'Omsk region',
        },
        fd: FD.SBFD,
        tz: TZ.OMST,
    },
    'RU-TOM': {
        title: {
            ru: 'Томская область',
            en: 'Tomsk region',
        },
        fd: FD.SBFD,
        tz: TZ.KRAT,
    },
    'RU-TY': {
        title: {
            ru: 'Республика Тыва',
            en: 'Tuva republic',
        },
        fd: FD.SBFD,
        tz: TZ.KRAT,
    },
    'RU-KK': {
        title: {
            ru: 'Республика Хакасия',
            en: 'Republic of Khakassia',
        },
        fd: FD.SBFD,
        tz: TZ.KRAT,
    },
    'RU-AMU': {
        title: {
            ru: 'Амурская область',
            en: 'Amur region',
        },
        fd: FD.FEFD,
        tz: TZ.YAKT,
    },
    'RU-BU': {
        title: {
            ru: 'Республика Бурятия',
            en: 'Republic of Buryatia',
        },
        fd: FD.FEFD,
        tz: TZ.IRKT,
    },
    'RU-YEV': {
        title: {
            ru: 'Еврейская автономная область',
            en: 'Jewish autonomous oblast',
        },
        fd: FD.FEFD,
        tz: TZ.YAKT,
    },
    'RU-ZAB': {
        title: {
            ru: 'Забайкальский край',
            en: 'Zabaykalsky krai',
        },
        fd: FD.FEFD,
        tz: TZ.YAKT,
    },
    'RU-KAM': {
        title: {
            ru: 'Камчатский край',
            en: 'Kamchatka krai',
        },
        fd: FD.FEFD,
        tz: TZ.PETT,
    },
    'RU-MAG': {
        title: {
            ru: 'Магаданская область',
            en: 'Magadan region',
        },
        fd: FD.FEFD,
        tz: TZ.MAGT,
    },
    'RU-PRI': {
        title: {
            ru: 'Приморский край',
            en: 'Primorsky krai',
        },
        fd: FD.FEFD,
        tz: TZ.VLAT,
    },
    'RU-SA': {
        title: {
            ru: 'Республика Саха',
            en: 'Sakha republic',
        },
        fd: FD.FEFD,
        tz: TZ.YAKT,
    },
    'RU-SAK': {
        title: {
            ru: 'Сахалинская область',
            en: 'Sakhalin region',
        },
        fd: FD.FEFD,
        tz: TZ.MAGT,
    },
    'RU-KHA': {
        title: {
            ru: 'Хабаровский край',
            en: 'Khabarovsk krai',
        },
        fd: FD.FEFD,
        tz: TZ.VLAT,
    },
    'RU-CHU': {
        title: {
            ru: 'Чукотский автономный округ',
            en: 'Chukotka autonomous okrug',
        },
        fd: FD.FEFD,
        tz: TZ.PETT,
    },
};