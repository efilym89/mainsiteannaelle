export const navigation = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/prices", label: "Цены" },
  { href: "/silk", label: "Карта Silk" },
  { href: "/about", label: "О студии" },
  { href: "/specialists", label: "Специалисты" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacts", label: "Контакты" },
] as const;

export const serviceFormats = [
  {
    number: "01",
    title: "Разовые услуги",
    text: "15 отдельных зон с фиксированной стоимостью из актуального прайса.",
    href: "/prices#single",
  },
  {
    number: "02",
    title: "Комбо-пакеты",
    text: "Пакеты на 5, 7 или 9 сеансов со скидкой 20%, 25% или 30%.",
    href: "/prices#courses",
  },
  {
    number: "03",
    title: "Специальные предложения",
    text: "Три предложения, которые действуют только на первое посещение.",
    href: "/prices#offers",
  },
] as const;

export const singleServices = [
  {
    id: "mini-zone",
    name: "Мини зона",
    price: "120 000",
  },
  {
    id: "face",
    name: "Лицо",
    price: "210 000",
  },
  {
    id: "underarms",
    name: "Подмышки",
    price: "150 000",
  },
  {
    id: "arms-above-elbow",
    name: "Руки выше локтя",
    price: "220 000",
  },
  {
    id: "arms-to-elbow",
    name: "Руки до локтя",
    price: "220 000",
  },
  {
    id: "full-arms",
    name: "Руки полностью",
    price: "340 000",
  },
  {
    id: "full-back",
    name: "Спина полностью",
    price: "340 000",
  },
  {
    id: "chest",
    name: "Грудь",
    price: "220 000",
  },
  {
    id: "stomach",
    name: "Живот",
    price: "220 000",
  },
  {
    id: "classic-bikini",
    name: "Бикини классическое",
    price: "220 000",
  },
  {
    id: "total-bikini",
    name: "Тотальное бикини",
    price: "280 000",
  },
  {
    id: "buttocks",
    name: "Ягодицы",
    price: "220 000",
  },
  {
    id: "thighs",
    name: "Ноги выше колена (Бёдра)",
    price: "290 000",
  },
  {
    id: "lower-legs",
    name: "Ноги ниже колена (Голени)",
    price: "290 000",
  },
  {
    id: "full-legs",
    name: "Ноги полностью",
    price: "490 000",
  },
] as const;

const packageTitles = {
  basic: "Подмышки, бикини",
  arms: "Подмышки, бикини, руки полностью",
  back: "Подмышки, бикини, спина",
  legs: "Подмышки, бикини, ноги полностью",
  full: "Всё тело без ограничений",
} as const;

export const coursePackages = [
  {
    sessions: 5,
    discount: "−20%",
    items: [
      {
        id: "basic",
        title: packageTitles.basic,
        regularPrice: "2 150 000",
        regularPerSession: "430 000",
        price: "1 720 000",
        perSession: "344 000",
        savings: "430 000",
        bestseller: false,
      },
      {
        id: "arms",
        title: packageTitles.arms,
        regularPrice: "3 850 000",
        regularPerSession: "770 000",
        price: "3 080 000",
        perSession: "616 000",
        savings: "770 000",
        bestseller: false,
      },
      {
        id: "back",
        title: packageTitles.back,
        regularPrice: "3 850 000",
        regularPerSession: "770 000",
        price: "3 080 000",
        perSession: "616 000",
        savings: "770 000",
        bestseller: true,
      },
      {
        id: "legs",
        title: packageTitles.legs,
        regularPrice: "4 600 000",
        regularPerSession: "920 000",
        price: "3 680 000",
        perSession: "736 000",
        savings: "920 000",
        bestseller: false,
      },
      {
        id: "full",
        title: packageTitles.full,
        regularPrice: "4 995 000",
        regularPerSession: "999 000",
        price: "3 996 000",
        perSession: "799 200",
        savings: "999 000",
        bestseller: true,
      },
    ],
  },
  {
    sessions: 7,
    discount: "−25%",
    items: [
      {
        id: "basic",
        title: packageTitles.basic,
        regularPrice: "3 010 000",
        regularPerSession: "430 000",
        price: "2 257 500",
        perSession: "322 500",
        savings: "753 000",
        bestseller: true,
      },
      {
        id: "arms",
        title: packageTitles.arms,
        regularPrice: "5 390 000",
        regularPerSession: "770 000",
        price: "4 039 000",
        perSession: "577 000",
        savings: "1 351 000",
        bestseller: false,
      },
      {
        id: "back",
        title: packageTitles.back,
        regularPrice: "5 390 000",
        regularPerSession: "770 000",
        price: "4 039 000",
        perSession: "577 000",
        savings: "1 351 000",
        bestseller: true,
      },
      {
        id: "legs",
        title: packageTitles.legs,
        regularPrice: "6 440 000",
        regularPerSession: "920 000",
        price: "4 830 000",
        perSession: "690 000",
        savings: "1 610 000",
        bestseller: false,
      },
      {
        id: "full",
        title: packageTitles.full,
        regularPrice: "6 993 000",
        regularPerSession: "999 000",
        price: "5 243 000",
        perSession: "749 000",
        savings: "1 750 000",
        bestseller: false,
      },
    ],
  },
  {
    sessions: 9,
    discount: "−30%",
    items: [
      {
        id: "basic",
        title: packageTitles.basic,
        regularPrice: "3 870 000",
        regularPerSession: "430 000",
        price: "2 700 000",
        perSession: "299 000",
        savings: "1 170 000",
        bestseller: false,
      },
      {
        id: "arms",
        title: packageTitles.arms,
        regularPrice: "6 930 000",
        regularPerSession: "770 000",
        price: "4 851 000",
        perSession: "539 000",
        savings: "2 079 000",
        bestseller: true,
      },
      {
        id: "back",
        title: packageTitles.back,
        regularPrice: "6 930 000",
        regularPerSession: "770 000",
        price: "4 851 000",
        perSession: "539 000",
        savings: "2 079 000",
        bestseller: false,
      },
      {
        id: "legs",
        title: packageTitles.legs,
        regularPrice: "8 280 000",
        regularPerSession: "920 000",
        price: "5 796 000",
        perSession: "644 000",
        savings: "2 484 000",
        bestseller: false,
      },
      {
        id: "full",
        title: packageTitles.full,
        regularPrice: "8 991 000",
        regularPerSession: "999 000",
        price: "6 291 000",
        perSession: "699 000",
        savings: "2 700 000",
        bestseller: true,
      },
    ],
  },
] as const;

export const specialOffers = [
  {
    id: "underarms-bikini",
    title: "Подмышки + бикини",
    price: "299 000",
    condition: "Акция действует только на первое посещение",
  },
  {
    id: "three-zones",
    title: "Любые три зоны",
    price: "540 000",
    condition: "Акция действует только на первое посещение",
  },
  {
    id: "all-zones",
    title: "Все зоны",
    price: "699 000",
    condition: "Акция действует только на первое посещение",
  },
] as const;

export const bookingGroups = [
  {
    label: "Разовые услуги",
    options: singleServices.map((service) => ({
      id: `service-${service.id}`,
      value: service.name,
      label: `${service.name} — ${service.price}`,
    })),
  },
  ...coursePackages.map((course) => ({
    label: `Комбо-пакеты: ${course.sessions} сеансов ${course.discount}`,
    options: course.items.map((item) => ({
      id: `course-${course.sessions}-${item.id}`,
      value: `Комбо: ${item.title}, ${course.sessions} сеансов`,
      label: `${item.title} — ${course.sessions} сеансов`,
    })),
  })),
  {
    label: "Специальные предложения",
    options: specialOffers.map((offer) => ({
      id: `offer-${offer.id}`,
      value: `Акция: ${offer.title}`,
      label: `${offer.title} — ${offer.price}`,
    })),
  },
];

export const bookingServices = bookingGroups.flatMap((group) => group.options);

export const advantages = [
  {
    title: "Индивидуальные параметры",
    text: "Мастер учитывает выбранную зону и индивидуальные особенности, объясняет этапы и подбирает настройки.",
  },
  {
    title: "Деликатная консультация",
    text: "Спокойно отвечаем на вопросы, уточняем противопоказания и не предлагаем лишних услуг.",
  },
  {
    title: "Понятный план курса",
    text: "Объясняем, почему требуется несколько посещений и как интервалы меняются по мере курса.",
  },
  {
    title: "Комфорт и приватность",
    text: "Бережное отношение, аккуратность и спокойная атмосфера на каждом этапе визита.",
  },
  {
    title: "Рекомендации после процедуры",
    text: "Расскажем, как ухаживать за кожей и чего временно избегать после посещения.",
  },
  {
    title: "Удобная запись",
    text: "Вы выбираете услугу и предпочтительное время — администратор подтверждает детали.",
  },
] as const;

export const visitSteps = [
  {
    title: "Знакомимся",
    text: "Уточняем запрос, выбранные зоны и важную информацию перед процедурой.",
  },
  {
    title: "Подбираем параметры",
    text: "Мастер объясняет процесс и выбирает настройки с учётом индивидуальных особенностей.",
  },
  {
    title: "Проводим процедуру",
    text: "Вы в любой момент можете сообщить мастеру о своих ощущениях.",
  },
  {
    title: "Составляем план",
    text: "Вы получаете рекомендации по уходу и ориентир по следующему посещению.",
  },
] as const;

export const preparationSteps = [
  {
    period: "За 4 недели",
    text: "Не удаляйте волосы с корнем воском, шугарингом или пинцетом.",
  },
  {
    period: "За 2 недели",
    text: "Избегайте загара, солярия и автозагара в зоне процедуры.",
  },
  {
    period: "За 1 день",
    text: "Аккуратно сбрейте волосы в выбранной зоне.",
  },
  {
    period: "В день визита",
    text: "Не наносите на зону кремы, масла и дезодорант.",
  },
] as const;

export const specialistStandards = [
  {
    title: "Спокойная коммуникация",
    text: "Мастер объясняет каждый этап понятным языком и оставляет достаточно времени для вопросов.",
  },
  {
    title: "Внимание к ощущениям",
    text: "Во время процедуры специалист уточняет ваше самочувствие и ориентируется на обратную связь.",
  },
  {
    title: "Аккуратная работа",
    text: "В фокусе — точность, приватность и бережное отношение к выбранной зоне.",
  },
  {
    title: "Сопровождение после визита",
    text: "После процедуры мастер даёт понятные рекомендации по домашнему уходу и следующему посещению.",
  },
] as const;

export const reviews = [
  {
    name: "Севара",
    detail: "26 лет",
    text: "Боялась, что будет больно. Но на подмышках практически не чувствовала ничего, бикини — терпимо. Мастер предупреждала перед вспышками, это очень приятно.",
  },
  {
    name: "Шахноза",
    detail: "36 лет",
    text: "Пришла по рекомендации подруги. После первой процедуры уже заметила, что волосы растут медленнее. Это стало для меня решающим.",
  },
  {
    name: "Фатима",
    detail: "28 лет",
    text: "Сравниваю с предыдущей студией — здесь реально уделяют время консультации. Тщательно заполняют анкету перед процедурой — это успокаивает.",
  },
] as const;

export const faqs = [
  {
    category: "Курс и результат",
    question: "Сколько процедур потребуется?",
    answer:
      "Единого количества для всех нет. Оно зависит от выбранной зоны, особенностей роста волос и реакции организма. После консультации мастер даст ориентир и будет корректировать интервалы по мере курса.",
  },
  {
    category: "Подготовка",
    question: "Как подготовиться к посещению?",
    answer:
      "Не удаляйте волосы с корнем, избегайте активного загара и за день до визита аккуратно сбрейте волосы в выбранной зоне. В день процедуры не наносите на неё кремы, масла и дезодорант.",
  },
  {
    category: "Процедура",
    question: "Больно ли делать лазерную эпиляцию?",
    answer:
      "Чувствительность индивидуальна. Во время процедуры могут ощущаться тепло или лёгкое покалывание. Если вам некомфортно, сразу сообщите мастеру — параметры можно скорректировать.",
  },
  {
    category: "Между визитами",
    question: "Можно ли брить волосы между процедурами?",
    answer:
      "Да. Между посещениями можно использовать бритву или триммер. Способы, которые удаляют волос с корнем, лучше исключить.",
  },
  {
    category: "Курс и результат",
    question: "Когда появятся изменения?",
    answer:
      "Волосы не исчезают мгновенно: изменения происходят постепенно. Для последовательного результата требуется курс, а его продолжительность индивидуальна.",
  },
  {
    category: "Безопасность",
    question: "Есть ли противопоказания?",
    answer:
      "Да. Недавний загар, раздражение или повреждение кожи, некоторые заболевания и препараты могут стать причиной переноса процедуры. Перед первым визитом мы уточним важную информацию. При сомнениях проконсультируйтесь с врачом.",
  },
  {
    category: "Безопасность",
    question: "Можно ли проходить процедуру во время беременности?",
    answer:
      "В annaelle процедуру не проводят во время беременности и лактации. После завершения этого периода можно обратиться за консультацией и подобрать время для начала курса.",
  },
  {
    category: "Выбор услуги",
    question: "Как выбрать разовую услугу или комбо-пакет?",
    answer:
      "Оставьте заявку и укажите интересующие зоны. Администратор сравнит варианты, подтвердит актуальную стоимость и поможет подобрать удобный формат.",
  },
] as const;

export const contact = {
  address: "Ташкент, ул. Шота Руставели, 33",
  shortAddress: "Шота Руставели, 33",
  hours: "Ежедневно, 09:00–21:00",
  phone: "+998 (78) 222-36-82",
  phoneHref: "tel:+998782223682",
  email: "annaellelaser@gmail.com",
  emailHref: "mailto:annaellelaser@gmail.com",
  instagram: "https://instagram.com/annaelle.laser",
  map: "https://www.google.com/maps/search/?api=1&query=Ташкент%2C%20улица%20Шота%20Руставели%2C%2033",
} as const;
