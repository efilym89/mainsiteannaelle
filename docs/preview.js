(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const desktopNav = document.querySelector('.desktop-nav');

  if (header && menuButton && desktopNav && !document.getElementById('mobile-navigation')) {
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobile-navigation';
    mobileNav.setAttribute('aria-label', 'Мобильная навигация');

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
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
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
  }

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const note = document.createElement('p');
    note.className = 'github-preview-note';
    note.textContent = 'Это визуальная тестовая версия. Заявка не будет отправлена.';
    bookingForm.prepend(note);
    bookingForm.addEventListener('submit', (event) => event.preventDefault());
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Отправка отключена в preview';
    }
  }

  const tabList = document.querySelector('.price-tabs');
  if (tabList) {
    tabList.querySelectorAll('button').forEach((button) => {
      button.disabled = true;
      button.setAttribute('title', 'Интерактивное переключение доступно в рабочей версии');
    });
    const note = document.createElement('p');
    note.className = 'github-preview-note';
    note.textContent = 'В GitHub preview показан базовый прайс. Интерактивные вкладки доступны в рабочей версии.';
    tabList.after(note);
  }
})();
