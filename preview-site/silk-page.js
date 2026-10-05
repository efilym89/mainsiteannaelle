function silkPage(){
  const s=SILK_CONTENT;
  const cardAction=label=>book(label,'SILK CARD','','consultation');
  const hero=`<section class="hero silk-hero"><div class="wrap hero-grid">
    <div class="hero-copy"><p class="eyebrow">ANNAELLE SILK CARD</p><h1>${e(s.hero.title)}</h1>
      <p class="lead">${e(s.hero.lead)}</p>
      <div class="silk-price"><p>${e(s.hero.priceLabel)}</p><div><strong>699 000</strong><span>сум</span></div><p class="silk-price-note">${e(s.hero.priceNote)}</p></div>
      <div class="button-row">${cardAction(s.hero.action)}${link(s.hero.secondary,'#silk-benefits')}</div>
    </div>
    <div class="hero-photo"><div class="silk-art"><img src="${asset('silk-editorial.webp')}"${responsiveAttrs('silk-editorial.webp')} width="1122" height="1402" alt="Розовый шёлк" fetchpriority="high">
      <div class="wallet-card"><img src="${asset('logo-horizontal-white.svg')}" width="180" height="58" alt="Annaelle"><p>${e(s.hero.cardLabel)}</p><div class="wallet-bottom"><strong>Silk</strong><span>${e(s.hero.cardTerm)}</span></div></div>
    </div></div>
  </div></section>`;
  const benefits=section(heading(e(s.benefits.kicker),e(s.benefits.title),'<p>'+e(s.benefits.lead)+'</p>')+
    '<div class="silk-benefits">'+s.benefits.items.map(item=>`<article class="silk-benefit"><div class="silk-stat"><strong>${e(item.value)}</strong><span>${e(item.unit)}</span></div><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join('')+'</div>','silk-benefit-section','silk-benefits');
  const gifts=section(heading(e(s.gifts.kicker),e(s.gifts.title))+
    `<div class="silk-gifts"><article class="silk-gift silk-certificate"><p class="eyebrow">${e(s.gifts.certificateLabel)}</p><div class="silk-gift-value" aria-hidden="true">200 000<span>сум</span></div><h3>${e(s.gifts.certificateTitle)}</h3><p>${e(s.gifts.certificateText)}</p><p class="silk-small">${e(s.gifts.certificateNote)}</p></article>
    <article class="silk-gift silk-regularity"><p class="eyebrow">${e(s.gifts.visitLabel)}</p><h3>${e(s.gifts.visitTitle)}</h3><p>${e(s.gifts.visitText)}</p><div class="silk-progress" role="img" aria-label="${e(s.gifts.progressLabel)}">${[1,2,3,4,5,6].map(n=>'<span aria-hidden="true">'+n+'</span>').join('')}<span class="silk-progress-gift" aria-hidden="true">7${icon('star')}</span></div><p class="silk-small">${e(s.gifts.visitNote)}</p></article></div>`,'','silk-gifts');
  const guarantee=section(`<div class="silk-guarantee"><div><p class="eyebrow">${e(s.guarantee.kicker)}</p><h2>${e(s.guarantee.title)}</h2><p class="lead">${e(s.guarantee.intro)}</p></div><div class="silk-guarantee-terms"><h3>${e(s.guarantee.conditionsTitle)}</h3><ul>${s.guarantee.conditions.map(t=>'<li>'+icon('check')+'<span>'+e(t)+'</span></li>').join('')}</ul><p class="silk-small">${e(s.guarantee.note)}</p></div></div>`,'tinted','silk-guarantee');
  const how=section(`<div class="silk-how"><div><p class="eyebrow">${e(s.steps.kicker)}</p><h2>${e(s.steps.title)}</h2><p class="lead">${e(s.steps.lead)}</p><div class="button-row">${cardAction(s.steps.action)}</div></div><ol class="steps">${s.steps.items.map(t=>'<li><div><h3>'+e(t.title)+'</h3><p>'+e(t.text)+'</p></div></li>').join('')}</ol></div>`,'','silk-apply');
  const faq=section(`<div class="faq-grid"><div><p class="eyebrow">${e(s.faq.kicker)}</p><h2>${e(s.faq.title)}</h2></div><div class="faq-list">${s.faq.items.map(t=>'<details><summary>'+e(t.question)+'</summary><p>'+e(t.answer)+'</p></details>').join('')}</div></div>`,'silk-faq','silk-questions');
  return '<div class="silk-page">'+hero+benefits+gifts+guarantee+how+faq+'</div>';
}
