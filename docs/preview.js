(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const desktopNav = document.querySelector('.desktop-nav');
  const languageSwitcher = document.querySelector('.desktop-language-switcher');
  const previewLanguage = document.documentElement.lang.startsWith('uz')
    ? 'uz'
    : document.documentElement.lang.startsWith('en')
      ? 'en'
      : 'ru';
  const menuLabels = {
    ru: { open: 'Открыть меню', close: 'Закрыть меню' },
    uz: { open: 'Menyuni ochish', close: 'Menyuni yopish' },
    en: { open: 'Open menu', close: 'Close menu' },
  }[previewLanguage];

  if (header && menuButton && desktopNav && !document.getElementById('mobile-navigation')) {
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobile-navigation';
    mobileNav.hidden = true;
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNav.setAttribute('aria-label', desktopNav.getAttribute('aria-label') || 'Navigation');

    if (languageSwitcher) {
      const mobileLanguages = languageSwitcher.cloneNode(true);
      mobileLanguages.classList.remove('desktop-language-switcher');
      mobileLanguages.classList.add('mobile-language-switcher');
      mobileNav.append(mobileLanguages);
    }

    desktopNav.querySelectorAll('a').forEach((link) => {
      mobileNav.append(link.cloneNode(true));
    });

    const bookingLink = document.querySelector('.desktop-booking');
    if (bookingLink) {
      const mobileBooking = bookingLink.cloneNode(true);
      mobileBooking.className = 'button';
      mobileNav.append(mobileBooking);
    }

    header.append(mobileNav);

    const setOpen = (open) => {
      menuButton.classList.toggle('is-open', open);
      mobileNav.classList.toggle('is-open', open);
      mobileNav.hidden = !open;
      mobileNav.setAttribute('aria-hidden', String(!open));
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? menuLabels.close : menuLabels.open);
      document.body.toggleAttribute('data-navigation-open', open);
    };

    menuButton.addEventListener('click', () => {
      setOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    mobileNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.focus();
      }
    });
    window.addEventListener('pageshow', () => setOpen(false));
    setOpen(false);
  }

  const copy = {
    ru: {
      formNote: 'Это визуальная тестовая версия. Заявка не будет отправлена.',
      submit: 'Отправка отключена в тестовой версии',
      tabTitle: 'Интерактивное переключение доступно в рабочей версии',
      priceNote: 'В тестовой версии показан базовый прайс. Интерактивные вкладки доступны в рабочей версии.',
    },
    uz: {
      formNote: 'Bu vizual test versiyasi. So‘rov yuborilmaydi.',
      submit: 'Test versiyasida yuborish o‘chirilgan',
      tabTitle: 'Interaktiv almashtirish ishchi versiyada mavjud',
      priceNote: 'Test versiyasida asosiy narxlar ko‘rsatilgan. Interaktiv bo‘limlar ishchi versiyada mavjud.',
    },
    en: {
      formNote: 'This is a visual preview. The request will not be submitted.',
      submit: 'Submission disabled in preview',
      tabTitle: 'Interactive switching is available on the live site',
      priceNote: 'The preview shows the base price list. Interactive tabs are available on the live site.',
    },
  }[previewLanguage];

  document.querySelectorAll('.language-switcher a').forEach((link) => {
    const target = new URL(link.href, window.location.href);
    if (!target.search) target.search = window.location.search;
    if (!target.hash) target.hash = window.location.hash;
    link.href = target.toString();
  });

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const note = document.createElement('p');
    note.className = 'github-preview-note';
    note.textContent = copy.formNote;
    bookingForm.prepend(note);
    bookingForm.addEventListener('submit', (event) => event.preventDefault());
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = copy.submit;
    }
  }

  const tabList = document.querySelector('.price-tabs');
  if (tabList) {
    tabList.querySelectorAll('button').forEach((button) => {
      button.disabled = true;
      button.setAttribute('title', copy.tabTitle);
    });
    const note = document.createElement('p');
    note.className = 'github-preview-note';
    note.textContent = copy.priceNote;
    tabList.after(note);
  }
})();
