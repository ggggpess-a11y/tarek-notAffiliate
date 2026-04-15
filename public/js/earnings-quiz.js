/**
 * Hero earnings estimator — multi-step quiz (RUB-based estimate, displayed in local currency).
 * Currency from visitor geo (IP) + live USD-based FX. UI language from document.documentElement.lang.
 */
(function () {
  'use strict';

  var LANG = document.documentElement.lang === 'en' ? 'en' : 'ar';

  var T = {
    ar: {
      intro: [
        'مرحباً بك.',
        'هذا الاختبار التقديري يوضح نطاقاً تقريبياً لما يمكن أن يحققه نشاطك ضمن برنامج الشركاء.',
        'ستجيب على عدة أسئلة موجزة؛ النتيجة للإرشاد فقط وليست التزاماً مالياً.',
        'اضغط الزر للمتابعة داخل نافذة آمنة.'
      ],
      introCta: ' احسب أرباحك المحتملة ',
      qAge: 'هل عمرك 18 سنة فأكثر؟',
      qExp: 'ما مستوى خبرتك مع التسويق بالعمولة؟',
      qTime: 'كم الوقت الأسبوعي الذي تستطيع تخصيصه للبرنامج؟',
      qEarn: 'ما الهدف التقريبي لدخلك الشهري؟',
      qCap: 'ما حجم رأس المال التشغيلي الذي يمكنك تخصيصه تقريباً؟',
      yes: 'نعم',
      no: 'لا',
      expBeginner: 'جديد — دون خبرة سابقة',
      expSome: 'خبرة محدودة',
      expEarned: 'حققت أرباحاً سابقاً',
      expSteady: 'دخل شهري ثابت حالياً',
      time30: 'نحو 30 دقيقة يومياً',
      time12: 'من ساعة إلى ساعتين يومياً',
      time3: 'أكثر من 3 ساعات يومياً',
      timeFull: 'متوفر لأسلوب عمل بدوام كامل',
      earn1: '10–30 ألف ₽',
      earn2: '40–80 ألف ₽',
      earn3: '80–150 ألف ₽',
      earn4: '+150 ألف ₽',
      cap0: '$0',
      cap30: '$30',
      cap300: '$300',
      cap1000: '$1000+',
      minorTitle: 'شكراً لاهتمامك',
      minorText: 'يقتصر البرنامج على من بلغ 18 عاماً وفق الشروط.',
      minorCta: 'رجوع',
      resultDone: 'اكتمل التقدير',
      resultIncome: 'الدخل الشهري التقريبي نحو',
      resultPeriod: 'شهرياً',
      resultHint: 'الأرقام استرشادية؛ يُحدَّد الأداء الفعلي وفق سياسة البرنامج ونشاط الإحالات.',
      resultVideo: 'شاهد الفيديو التعريفي ثم أكمل التسجيل أو تواصل مع فريق الشراكة.',
      resultSignup: 'متابعة التسجيل',
      resultTelegram: 'التواصل عبر تيليغرام',
      restart: 'إعادة التقدير',
      resultModalClose: 'إغلاق',
      quizModalTitle: 'تقدير الدخل التقريبي',
      quizHeroCta: 'تقدير الدخل',
      quizProgressLabel: 'السؤال {cur} من {total}'
    },
    en: {
      intro: [
        'Welcome.',
        'This short estimator illustrates an approximate range for partner activity in the program.',
        'A few brief questions; the result is indicative only and not a financial commitment.',
        'Continue in the secure window.'
      ],
      introCta: 'Start estimate',
      qAge: 'Are you 18 or older?',
      qExp: "What's your experience with affiliate programs?",
      qTime: 'How much time can you dedicate to the affiliate program?',
      qEarn: 'How much would you like to earn?',
      qCap: "What's your working capital?",
      yes: 'Yes',
      no: 'No',
      expBeginner: 'Beginner, no experience',
      expSome: 'Some experience',
      expEarned: 'Earned before',
      expSteady: 'Currently earning steadily',
      time30: '30 minutes per day',
      time12: '1–2 hours per day',
      time3: '3+ hours per day',
      timeFull: 'Ready to work full-time',
      earn1: '10–30k ₽',
      earn2: '40–80k ₽',
      earn3: '80–150k ₽',
      earn4: '150k+ ₽',
      cap0: '$0',
      cap30: '$30',
      cap300: '$300',
      cap1000: '$1000+',
      minorTitle: 'Thanks for your interest',
      minorText: 'The partner program is for users aged 18 and over.',
      minorCta: 'Back',
      resultDone: "You've completed the test! 🔥",
      resultIncome: 'Your estimated income 💰 would be about',
      resultPeriod: 'per month',
      resultHint: '🚀 Your potential is impressive!',
      resultVideo: "Watch a short video about what you'll be doing and submit your application.",
      resultSignup: 'Submit your application',
      resultTelegram: 'Chat with Tarek',
      restart: 'Retake quiz',
      resultModalClose: 'Close',
      quizModalTitle: 'Income estimate quiz',
      quizHeroCta: 'Calculate your earnings',
      quizProgressLabel: 'Question {cur} of {total}'
    }
  };

  /** خطوات الأسئلة داخل النافذة — لشريط التقدّم فقط */
  var QUIZ_QUESTION_STEPS = ['qAge', 'qExp', 'qTime', 'qEarn', 'qCap'];

  var t = T[LANG];

  /** نتيجة الاختبار: فيديو يوتيوب بدل صورة الماسكوت (معرف من رابط youtu.be / watch?v=) */
  var RESULT_QUIZ_YOUTUBE_ID = 'zUWSf6IJN_k';

  function attrQuote(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  /** Euro adoption (ISO country → EUR) for geo fallback only — ipapi usually returns the real currency. */
  var EUR_ZONE = {
    AT: 1,
    BE: 1,
    CY: 1,
    EE: 1,
    FI: 1,
    FR: 1,
    DE: 1,
    GR: 1,
    IE: 1,
    IT: 1,
    LV: 1,
    LT: 1,
    LU: 1,
    MT: 1,
    NL: 1,
    PT: 1,
    SK: 1,
    SI: 1,
    ES: 1,
    HR: 1
  };

  var CC = {
    RU: 'RUB',
    EG: 'EGP',
    SA: 'SAR',
    AE: 'AED',
    KW: 'KWD',
    QA: 'QAR',
    BH: 'BHD',
    OM: 'OMR',
    JO: 'JOD',
    LB: 'LBP',
    IQ: 'IQD',
    MA: 'MAD',
    TN: 'TND',
    DZ: 'DZD',
    LY: 'LYD',
    SD: 'SDG',
    SY: 'SYP',
    YE: 'YER',
    US: 'USD',
    GB: 'GBP',
    TR: 'TRY',
    IL: 'ILS',
    UA: 'UAH',
    IN: 'INR',
    PK: 'PKR',
    BD: 'BDT',
    LK: 'LKR',
    NP: 'NPR',
    MY: 'MYR',
    SG: 'SGD',
    ID: 'IDR',
    TH: 'THB',
    VN: 'VND',
    PH: 'PHP',
    KR: 'KRW',
    JP: 'JPY',
    CN: 'CNY',
    HK: 'HKD',
    TW: 'TWD',
    AU: 'AUD',
    NZ: 'NZD',
    CA: 'CAD',
    MX: 'MXN',
    BR: 'BRL',
    AR: 'ARS',
    CL: 'CLP',
    CO: 'COP',
    ZA: 'ZAR',
    NG: 'NGN',
    KE: 'KES',
    GH: 'GHS',
    PL: 'PLN',
    CZ: 'CZK',
    HU: 'HUF',
    RO: 'RON',
    BG: 'BGN',
    SE: 'SEK',
    NO: 'NOK',
    DK: 'DKK',
    CH: 'CHF',
    IS: 'ISK',
    PS: 'ILS'
  };

  /**
   * Approximate units of local currency per 1 USD (offline fallback).
   * When live FX loads, it replaces this; keeps the visitor’s national currency visible.
   */
  var STATIC_USD_PER_UNIT = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    EGP: 49,
    SAR: 3.75,
    AED: 3.67,
    KWD: 0.31,
    QAR: 3.64,
    BHD: 0.38,
    OMR: 0.38,
    JOD: 0.71,
    LBP: 89500,
    IQD: 1310,
    MAD: 10,
    TND: 3.1,
    DZD: 134,
    LYD: 4.85,
    SDG: 600,
    SYP: 13000,
    YER: 250,
    RUB: 92,
    TRY: 34,
    ILS: 3.65,
    UAH: 41,
    INR: 83,
    PKR: 278,
    BDT: 122,
    LKR: 305,
    NPR: 133,
    MYR: 4.45,
    SGD: 1.35,
    IDR: 15700,
    THB: 36,
    VND: 25400,
    PHP: 57,
    KRW: 1380,
    JPY: 150,
    CNY: 7.2,
    HKD: 7.8,
    TWD: 32,
    AUD: 1.53,
    NZD: 1.68,
    CAD: 1.38,
    MXN: 17,
    BRL: 5.6,
    ARS: 900,
    CLP: 950,
    COP: 4100,
    ZAR: 18.5,
    NGN: 1550,
    KES: 130,
    GHS: 16,
    PLN: 4,
    CZK: 23,
    HUF: 365,
    RON: 4.6,
    BGN: 1.8,
    SEK: 10.5,
    NOK: 10.8,
    DKK: 6.85,
    CHF: 0.88,
    ISK: 138
  };

  var AR_LOCALE_BY_CC = {
    EG: 'ar-EG',
    SA: 'ar-SA',
    AE: 'ar-AE',
    MA: 'ar-MA',
    IQ: 'ar-IQ',
    JO: 'ar-JO',
    LB: 'ar-LB',
    KW: 'ar-KW',
    QA: 'ar-QA',
    BH: 'ar-BH',
    OM: 'ar-OM',
    TN: 'ar-TN',
    DZ: 'ar-DZ',
    LY: 'ar-LY',
    SD: 'ar-SD',
    YE: 'ar-YE',
    PS: 'ar-PS',
    SY: 'ar-SY'
  };

  function countryToCurrency(countryCode) {
    if (!countryCode) return 'USD';
    var cc = countryCode.toUpperCase();
    if (CC[cc]) return CC[cc];
    if (EUR_ZONE[cc]) return 'EUR';
    return 'USD';
  }

  /** One national currency: derive from country when available (not from a second FX code). */
  function normalizeCurrency(currencyCode, countryCode) {
    var cc = (countryCode || '').toUpperCase();
    if (cc) return countryToCurrency(cc);
    var cur = (currencyCode || '').toUpperCase();
    if (cur && cur.length === 3) return cur;
    return 'USD';
  }

  function moneyLocale(ctx) {
    if (LANG !== 'ar') return 'en-US';
    var cc = (ctx.countryCode || '').toUpperCase();
    return AR_LOCALE_BY_CC[cc] || 'ar';
  }

  /** أرقام لاتينية (0–9) حتى في واجهة ar — يتوافق مع توقع المستخدم في الاختبار */
  function numberFormatOptions(opts) {
    opts = opts || {};
    if (LANG === 'ar') {
      return Object.assign({}, opts, { numberingSystem: 'latn' });
    }
    return opts;
  }

  function ltrMoneyHtml(s) {
    return '<span dir="ltr" class="earnings-quiz-money-ltr">' + s + '</span>';
  }

  function currencyShortLabel(ctx) {
    var loc = moneyLocale(ctx);
    try {
      var parts = new Intl.NumberFormat(
        loc,
        numberFormatOptions({
          style: 'currency',
          currency: ctx.code,
          currencyDisplay: 'narrowSymbol',
          maximumFractionDigits: 0
        })
      ).formatToParts(0);
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].type === 'currency') return parts[i].value;
      }
    } catch (e) {}
    return ctx.code;
  }

  function promiseAllSettled(promises) {
    if (typeof Promise !== 'undefined' && Promise.allSettled) {
      return Promise.allSettled(promises);
    }
    return Promise.all(
      promises.map(function (p) {
        return Promise.resolve(p).then(
          function (v) {
            return { status: 'fulfilled', value: v };
          },
          function (e) {
            return { status: 'rejected', reason: e };
          }
        );
      })
    );
  }

  function fetchWithTimeout(url, ms) {
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, ms);
    return fetch(url, ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) {
        if (!r.ok) throw new Error('http');
        return r.json();
      })
      .then(
        function (data) {
          clearTimeout(timer);
          return data;
        },
        function (err) {
          clearTimeout(timer);
          throw err;
        }
      );
  }

  function fetchGeo(timeoutMs) {
    return fetchWithTimeout('https://ipapi.co/json/?fields=currency,country_code,error,error_reason', timeoutMs)
      .then(function (d) {
        if (d && d.error) throw new Error(d.error_reason || 'ipapi');
        var ccy = (d.currency || '').toUpperCase();
        var valid = ccy && ccy.length === 3;
        return {
          currency: valid ? ccy : countryToCurrency(d.country_code),
          country_code: (d.country_code || '').toUpperCase()
        };
      })
      .catch(function () {
        return fetchWithTimeout('https://ip-api.com/json/?fields=status,message,countryCode,currency', timeoutMs).then(
          function (d) {
            if (d.status !== 'success') throw new Error(d.message || 'ip-api');
            var ccy = (d.currency || '').toUpperCase();
            var cc = (d.countryCode || '').toUpperCase();
            if (!ccy || ccy.length !== 3) ccy = countryToCurrency(cc);
            return { currency: ccy, country_code: cc };
          }
        );
      });
  }

  /**
   * أسعار فورية من عدة واجهات بالتوازي (أول رد صالح يُعتمد).
   * exchangerate.host أصبح يشترط access_key — استُبدل بـ open.er-api + currency-api (Cloudflare + jsDelivr).
   */
  function parseOpenErConversionRates(d) {
    if (d && d.result === 'success' && d.conversion_rates) return d.conversion_rates;
    return null;
  }

  function parseFawazUsdTable(d) {
    var usd = d && d.usd;
    if (!usd || typeof usd !== 'object') return null;
    var out = {};
    for (var k in usd) {
      if (!Object.prototype.hasOwnProperty.call(usd, k)) continue;
      if (k.length !== 3) continue;
      var v = usd[k];
      if (typeof v !== 'number' || !(v > 0)) continue;
      out[k.toUpperCase()] = v;
    }
    return out.RUB > 0 ? out : null;
  }

  function fetchRatesUsd(timeoutMs) {
    var attempts = [
      fetchWithTimeout('https://open.er-api.com/v6/latest/USD', timeoutMs).then(parseOpenErConversionRates),
      fetchWithTimeout('https://latest.currency-api.pages.dev/v1/currencies/usd.json', timeoutMs).then(
        parseFawazUsdTable
      ),
      fetchWithTimeout(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
        timeoutMs
      ).then(parseFawazUsdTable)
    ];
    return promiseAllSettled(attempts).then(function (results) {
      var order = [0, 1, 2];
      for (var oi = 0; oi < order.length; oi++) {
        var idx = order[oi];
        var res = results[idx];
        if (!res || res.status !== 'fulfilled') continue;
        var table = res.value;
        if (table && table.RUB > 0) return table;
      }
      throw new Error('fx-all-fail');
    });
  }

  function tryLiveCtx(rates, g) {
    if (!rates || !rates.RUB || !(rates.RUB > 0)) return null;
    var cur = normalizeCurrency(g.currency, g.country_code);
    if (cur === 'USD') {
      return {
        code: 'USD',
        rubToLocal: 1 / rates.RUB,
        usdToLocal: 1,
        countryCode: g.country_code || '',
        approximate: false
      };
    }
    if (rates[cur] == null || !(rates[cur] > 0)) return null;
    return {
      code: cur,
      rubToLocal: rates[cur] / rates.RUB,
      usdToLocal: rates[cur],
      countryCode: g.country_code || '',
      approximate: false
    };
  }

  function buildCtxFromStatic(g) {
    var cur = normalizeCurrency(g.currency, g.country_code);
    var s = STATIC_USD_PER_UNIT;
    if (!s[cur] || !s.RUB) {
      cur = 'USD';
    }
    return {
      code: cur,
      rubToLocal: s[cur] / s.RUB,
      usdToLocal: s[cur],
      countryCode: g.country_code || '',
      approximate: true
    };
  }

  function resolveCurrencyContext(timeoutMs) {
    var geoP = fetchGeo(timeoutMs).catch(function () {
      return { currency: '', country_code: '' };
    });
    var ratesP = fetchRatesUsd(timeoutMs).catch(function () {
      return null;
    });
    return Promise.all([geoP, ratesP]).then(function (pair) {
      var g = pair[0];
      var rates = pair[1];
      var live = tryLiveCtx(rates, g);
      if (live) return live;
      return buildCtxFromStatic(g);
    });
  }

  function formatMoney(n, ctx, maxFrac) {
    var mf = maxFrac == null ? 0 : maxFrac;
    var loc = moneyLocale(ctx);
    try {
      return new Intl.NumberFormat(
        loc,
        numberFormatOptions({
          style: 'currency',
          currency: ctx.code,
          currencyDisplay: 'narrowSymbol',
          maximumFractionDigits: mf,
          minimumFractionDigits: 0
        })
      ).format(n);
    } catch (e) {
      return String(Math.round(n)) + ' ' + ctx.code;
    }
  }

  function formatCapUsd(usdAmount, ctx) {
    var v = usdAmount * ctx.usdToLocal;
    return ltrMoneyHtml(formatMoney(v, ctx, v > 0 && v < 1 ? 2 : 0));
  }

  /** رمز عملة واحد للمدى؛ dir=ltr يمنع عكس الأرقام في الواجهة العربية */
  function formatEarnRange(lowRub, highRub, ctx) {
    var lo = Math.round(lowRub * ctx.rubToLocal);
    var hi = highRub == null ? null : Math.round(highRub * ctx.rubToLocal);
    var loc = moneyLocale(ctx);
    var nf = new Intl.NumberFormat(loc, numberFormatOptions({ maximumFractionDigits: 0 }));
    var sym = currencyShortLabel(ctx);
    if (hi == null) {
      return ltrMoneyHtml(nf.format(lo) + '+ ' + sym);
    }
    return ltrMoneyHtml(nf.format(lo) + ' – ' + nf.format(hi) + ' ' + sym);
  }

  function applyCurrencyLabels(ctx) {
    t.cap0 = formatCapUsd(0, ctx);
    t.cap30 = formatCapUsd(30, ctx);
    t.cap300 = formatCapUsd(300, ctx);
    var capK = Math.round(1000 * ctx.usdToLocal);
    var loc = moneyLocale(ctx);
    var nf = new Intl.NumberFormat(loc, numberFormatOptions({ maximumFractionDigits: 0 }));
    t.cap1000 = ltrMoneyHtml(nf.format(capK) + '+ ' + currencyShortLabel(ctx));
    t.earn1 = formatEarnRange(10000, 30000, ctx);
    t.earn2 = formatEarnRange(40000, 80000, ctx);
    t.earn3 = formatEarnRange(80000, 150000, ctx);
    t.earn4 = formatEarnRange(150000, null, ctx);
  }

  function formatEstimateRub(rub, ctx) {
    return ltrMoneyHtml(formatMoney(Math.round(rub * ctx.rubToLocal), ctx, 0));
  }

  function signUpUrl() {
    return 'https://refpa3665.com/L?tag=d_4540647m_18645c_&site=4540647&ad=18645';
  }

  function telegramUrl() {
    return 'https://t.me/MELBET_PARTNERS1';
  }

  function estimateRub(answers) {
    if (!answers.adult) return 0;
    var base = 18000;
    var expPts = { beginner: 8000, some: 16000, earned: 28000, steady: 42000 };
    var timePts = { m30: 6000, h12: 16000, h3plus: 30000, full: 48000 };
    var earnPts = { e1: 10000, e2: 20000, e3: 36000, e4: 52000 };
    var capPts = { c0: 2000, c30: 8000, c300: 18000, c1000: 28000 };
    var sum =
      base +
      (expPts[answers.exp] || 0) +
      (timePts[answers.time] || 0) +
      (earnPts[answers.earn] || 0) +
      (capPts[answers.cap] || 0);
    sum = Math.round(sum / 5000) * 5000;
    return Math.min(850000, Math.max(35000, sum));
  }

  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstChild;
  }

  function mount(root, inner) {
    var wrap = root.querySelector('.earnings-quiz-inner');
    if (!wrap) return;
    wrap.innerHTML = '';
    wrap.appendChild(inner);
    if (document.querySelector('.earnings-quiz-full-modal') && root.id === 'earnings-quiz-modal-root') {
      window.setTimeout(function () {
        var mPanel = document.querySelector('.earnings-quiz-full-modal-panel');
        if (mPanel) focusPreferredInQuizModal(mPanel);
      }, 0);
    }
  }

  /** عندما يكون الاختبار داخل نافذة منبثقة لا نعدّل عناوين الهيرو في الصفحة */
  var earningsQuizSyncHeroHeadline = true;

  /** عنوان سؤال الاختبار: في الصفحة (هيرو) أو داخل النافذة المنبثقة */
  function heroHeadlineQuizMode(questionText) {
    var modalQ = document.getElementById('earnings-quiz-modal-question');
    if (!earningsQuizSyncHeroHeadline) {
      if (modalQ) {
        var wrap = modalQ.closest('.earnings-quiz-modal-question-wrap');
        if (questionText == null || questionText === '') {
          modalQ.textContent = '';
          if (wrap) wrap.setAttribute('hidden', '');
        } else {
          modalQ.textContent = questionText;
          if (wrap) wrap.removeAttribute('hidden');
        }
      }
      return;
    }
    var h1 = document.querySelector('.hero-intro-title');
    var h2 = document.getElementById('hero-quiz-headline');
    if (!h1 || !h2) return;
    if (questionText == null || questionText === '') {
      h1.classList.remove('is-quiz-hidden');
      h1.removeAttribute('hidden');
      h1.removeAttribute('aria-hidden');
      h2.textContent = '';
      h2.setAttribute('hidden', '');
      h2.setAttribute('aria-hidden', 'true');
    } else {
      h1.classList.add('is-quiz-hidden');
      h1.setAttribute('hidden', 'hidden');
      h1.setAttribute('aria-hidden', 'true');
      h2.textContent = questionText;
      h2.removeAttribute('hidden');
      h2.removeAttribute('aria-hidden');
    }
  }

  /** شريط التقدّم داخل النافذة المنبثقة فقط (العنصر غير موجود في الهيرو) */
  function syncModalQuizChrome(stepId) {
    var el = document.getElementById('earnings-quiz-modal-progress');
    if (!el) return;
    var idx = QUIZ_QUESTION_STEPS.indexOf(stepId);
    if (idx < 0) {
      el.setAttribute('hidden', '');
      el.innerHTML = '';
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
      return;
    }
    var total = QUIZ_QUESTION_STEPS.length;
    var cur = idx + 1;
    var label = t.quizProgressLabel.replace('{cur}', String(cur)).replace('{total}', String(total));
    var segs = '';
    var s;
    for (s = 0; s < total; s++) {
      segs +=
        '<span class="earnings-quiz-progress-seg' +
        (s < idx ? ' earnings-quiz-progress-seg--done' : '') +
        (s === idx ? ' earnings-quiz-progress-seg--current' : '') +
        '"></span>';
    }
    el.removeAttribute('hidden');
    el.innerHTML =
      '<div class="earnings-quiz-progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="' +
      total +
      '" aria-valuenow="' +
      cur +
      '" aria-label="' +
      attrQuote(label) +
      '">' +
      segs +
      '</div>' +
      '<p class="earnings-quiz-progress-text">' +
      label +
      '</p>';
  }

  function imgMascot() {
    return (
      '<div class="earnings-quiz-mascot earnings-quiz-mascot--intro">' +
        '<img class="earnings-quiz-mascot-photo" src="assets/images/hero-mascot-melbet.png" alt="' +
        attrQuote(
          LANG === 'en'
            ? 'MELBET partner program illustration'
            : 'صورة تعريفية ببرنامج الشركاء'
        ) +
        '" width="640" height="640" loading="lazy" decoding="async"/>' +
        '</div>'
    );
  }

  // صور خطوات الأسئلة داخل نافذة الكويز: كل الخطوات تعرض نفس “علامة الاستفهام”.
  function imgMascotQuestion() {
    return (
      '<div class="earnings-quiz-mascot earnings-quiz-mascot--intro">' +
        '<img class="earnings-quiz-mascot-photo" src="assets/images/hero-quiz-intro.png" alt="' +
        attrQuote(
          LANG === 'en'
            ? 'Illustration for income estimate questions'
            : 'توضيح بداية الاختبار التقديري'
        ) +
        '" width="640" height="640" loading="lazy" decoding="async"/>' +
        '</div>'
    );
  }

  function resultYoutubeEmbedSrc(queryExtra) {
    var q =
      'rel=0&modestbranding=1&autoplay=1&playsinline=1&iv_load_policy=3' +
      (queryExtra ? '&' + queryExtra : '');
    return (
      'https://www.youtube-nocookie.com/embed/' + RESULT_QUIZ_YOUTUBE_ID + '?' + q
    );
  }

  function resultMascotVideo() {
    var src = resultYoutubeEmbedSrc('');
    return (
      '<div class="earnings-quiz-mascot earnings-quiz-mascot--result-video">' +
        '<iframe class="earnings-quiz-youtube-iframe" src="' +
        src +
        '" title="' +
        attrQuote(t.resultVideo) +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>'
    );
  }

  function imgMascotIntro() {
    return (
      '<div class="earnings-quiz-mascot earnings-quiz-mascot--intro">' +
        '<img class="earnings-quiz-mascot-photo" src="assets/images/hero-quiz-intro.png" alt="' +
        attrQuote(
          LANG === 'en'
            ? 'Illustration: thinking about your income estimate'
            : 'توضيح بداية الاختبار التقديري'
        ) +
        '" width="640" height="640" loading="eager" decoding="async"/>' +
        '</div>'
    );
  }

  function introView(root, answers, go) {
    heroHeadlineQuizMode(null);
    syncModalQuizChrome(null);
    var lines = t.intro
      .map(function (line) {
        return '<p class="earnings-quiz-text">' + line + '</p>';
      })
      .join('');
    var node = el(
      '<div class="earnings-quiz-screen">' +
        imgMascotIntro() +
        '<div class="earnings-quiz-card">' +
        lines +
        '</div>' +
        '<button type="button" class="btn btn-primary btn-lg btn-hero-mega earnings-quiz-intro-cta">' +
        '<span class="btn-hero-mega-primary">' +
        t.introCta +
        '</span></button>' +
        '</div>'
    );
    node.querySelector('button').addEventListener('click', function () {
      go('qAge');
    });
    mount(root, node);
  }

  function yesNoView(root, answers, go) {
    heroHeadlineQuizMode(t.qAge);
    syncModalQuizChrome('qAge');
    var node = el(
      '<div class="earnings-quiz-screen">' +
        imgMascotIntro() +
        '<div class="earnings-quiz-row2">' +
        '<button type="button" class="earnings-quiz-choice earnings-quiz-choice--half" data-val="yes">' +
        '<span class="earnings-quiz-orb earnings-quiz-orb--yellow"></span><span>' +
        t.yes +
        '</span></button>' +
        '<button type="button" class="earnings-quiz-choice earnings-quiz-choice--half" data-val="no">' +
        '<span class="earnings-quiz-orb earnings-quiz-orb--black"></span><span>' +
        t.no +
        '</span></button>' +
        '</div>' +
        '</div>'
    );
    node.querySelectorAll('.earnings-quiz-choice').forEach(function (btn) {
      btn.addEventListener('click', function () {
        answers.adult = btn.getAttribute('data-val') === 'yes';
        if (!answers.adult) go('minor');
        else go('qExp');
      });
    });
    mount(root, node);
  }

  function listChoiceView(root, answers, currentStep, nextStep, key, questionText, items, go) {
    heroHeadlineQuizMode(questionText);
    syncModalQuizChrome(currentStep);
    var rows = items
      .map(function (item) {
        return (
          '<button type="button" class="earnings-quiz-choice earnings-quiz-choice--list" data-val="' +
          item.v +
          '">' +
          '<span class="earnings-quiz-orb earnings-quiz-orb--list"></span>' +
          '<span class="earnings-quiz-choice-label">' +
          item.label +
          '</span></button>'
        );
      })
      .join('');
    var node = el(
      '<div class="earnings-quiz-screen">' +
        imgMascotQuestion() +
        '<div class="earnings-quiz-list">' +
        rows +
        '</div>' +
        '</div>'
    );
    node.querySelectorAll('.earnings-quiz-choice').forEach(function (btn) {
      btn.addEventListener('click', function () {
        answers[key] = btn.getAttribute('data-val');
        go(nextStep);
      });
    });
    mount(root, node);
  }

  function minorView(root, answers, go) {
    heroHeadlineQuizMode(t.minorTitle);
    syncModalQuizChrome(null);
    var node = el(
      '<div class="earnings-quiz-screen">' +
        imgMascotQuestion() +
        '<div class="earnings-quiz-card">' +
        '<p class="earnings-quiz-text">' +
        t.minorText +
        '</p></div>' +
        '<button type="button" class="btn btn-outline-light earnings-quiz-btn-main">' +
        t.minorCta +
        '</button>' +
        '</div>'
    );
    node.querySelector('button').addEventListener('click', function () {
      go('reset');
    });
    mount(root, node);
  }

  var quizHeroRootEl = null;
  var quizLastCtx = null;
  var quizFullModalPrevFocus = null;
  var quizFullModalKeydownHandler = null;
  var quizFullModalFocusInHandler = null;
  var quizFullModalPanelEl = null;

  function isElementHiddenForFocus(el) {
    if (!(el instanceof HTMLElement)) return true;
    if (el.disabled) return true;
    var x = el;
    while (x) {
      if (x.hasAttribute('hidden')) return true;
      var cs = window.getComputedStyle(x);
      if (cs.display === 'none' || cs.visibility === 'hidden') return true;
      x = x.parentElement;
    }
    return false;
  }

  function getModalPanelFocusables(panel) {
    if (!panel) return [];
    var all = panel.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    return Array.prototype.slice.call(all).filter(function (el) {
      if (el.disabled) return false;
      if (!panel.contains(el)) return false;
      if (isElementHiddenForFocus(el)) return false;
      return true;
    });
  }

  function focusPreferredInQuizModal(panel) {
    if (!panel) return;
    var root = panel.querySelector('#earnings-quiz-modal-root');
    var inner = root && root.querySelector('.earnings-quiz-inner');
    var candidates = inner
      ? inner.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
      : [];
    var i;
    for (i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (!isElementHiddenForFocus(c) && typeof c.focus === 'function') {
        try {
          c.focus();
          return;
        } catch (err) {}
      }
    }
    var closeBtn = panel.querySelector('.earnings-quiz-full-modal-close');
    if (closeBtn && typeof closeBtn.focus === 'function') {
      try {
        closeBtn.focus();
      } catch (e2) {}
    }
  }

  function detachQuizFullModalEsc() {
    if (quizFullModalKeydownHandler) {
      document.removeEventListener('keydown', quizFullModalKeydownHandler);
      quizFullModalKeydownHandler = null;
    }
    if (quizFullModalFocusInHandler) {
      document.removeEventListener('focusin', quizFullModalFocusInHandler, true);
      quizFullModalFocusInHandler = null;
    }
    quizFullModalPanelEl = null;
  }

  function closeQuizFullModal() {
    detachQuizFullModalEsc();
    var shell = document.querySelector('.earnings-quiz-full-modal');
    if (shell) shell.remove();
    document.body.classList.remove('earnings-quiz-modal-open');
    earningsQuizSyncHeroHeadline = true;
    heroHeadlineQuizMode(null);
    if (quizFullModalPrevFocus && typeof quizFullModalPrevFocus.focus === 'function') {
      try {
        quizFullModalPrevFocus.focus();
      } catch (err) {}
    }
    quizFullModalPrevFocus = null;
    if (quizHeroRootEl && quizLastCtx) {
      renderQuizLauncher(quizHeroRootEl, quizLastCtx);
    }
  }

  function updateHeroEarningsQuizShellMode() {
    var shell = document.getElementById('hero-earnings-quiz');
    if (!shell) return;
    shell.classList.remove('hero-earnings-quiz--minimal');
  }

  /** نص موجز داخل بطاقة الهيرو */
  function heroIntroLinesForViewport() {
    if (LANG === 'en') {
      return ['Short estimator for approximate partner earnings (indicative only).'];
    }
    return ['هذا الاختبار يقدّر دخلك تقريباً ضمن برنامج الشركاء — للإرشاد فقط.'];
  }

  /** المقدمة (نص الترحيب + هيا نبدأ) تظهر في الهيرو؛ المودال يبدأ من أول سؤال مباشرة */
  function renderQuizLauncher(heroRoot, ctx) {
    quizHeroRootEl = heroRoot;
    quizLastCtx = ctx;
    updateHeroEarningsQuizShellMode();
    var lines = heroIntroLinesForViewport()
      .map(function (line) {
        return '<p class="earnings-quiz-text">' + line + '</p>';
      })
      .join('');
    var node = el(
      '<div class="earnings-quiz-screen earnings-quiz-launcher">' +
        imgMascot() +
        '<div class="earnings-quiz-card">' +
        lines +
        '</div>' +
        '<button type="button" class="btn btn-primary btn-lg btn-hero-mega earnings-quiz-intro-cta earnings-quiz-open-modal">' +
        '<span class="btn-hero-mega-primary">' +
        t.introCta +
        '</span></button>' +
        '</div>'
    );
    node.querySelector('.earnings-quiz-open-modal').addEventListener('click', function () {
      openQuizFullModal(heroRoot, quizLastCtx);
    });
    mount(heroRoot, node);
  }

  function bindQuizHeroViewportListener() {
    if (window.__earningsQuizHeroMqBound) return;
    window.__earningsQuizHeroMqBound = true;
    function refreshHeroLauncherIfIdle() {
      if (document.querySelector('.earnings-quiz-full-modal')) return;
      var hr = document.getElementById('hero-earnings-quiz');
      if (hr && quizLastCtx) renderQuizLauncher(hr, quizLastCtx);
    }
    if (typeof window.matchMedia === 'function') {
      ['(min-width: 641px)', '(min-width: 1024px)'].forEach(function (q) {
        var mq = window.matchMedia(q);
        if (mq.addEventListener) mq.addEventListener('change', refreshHeroLauncherIfIdle);
        else if (mq.addListener) mq.addListener(refreshHeroLauncherIfIdle);
      });
    }
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refreshHeroLauncherIfIdle, 200);
    });
  }

  function openQuizFullModal(heroRoot, ctx) {
    quizHeroRootEl = heroRoot;
    quizLastCtx = ctx;
    var existing = document.querySelector('.earnings-quiz-full-modal');
    if (existing) existing.remove();
    detachQuizFullModalEsc();

    var titleId = 'earnings-quiz-full-modal-title';
    var shell = el(
      '<div class="earnings-quiz-full-modal" role="dialog" aria-modal="true" aria-labelledby="' +
        titleId +
        '">' +
        '<div class="earnings-quiz-full-modal-backdrop" tabindex="-1"></div>' +
        '<div class="earnings-quiz-full-modal-panel">' +
        '<div class="earnings-quiz-full-modal-header">' +
        '<h2 class="earnings-quiz-full-modal-heading" id="' +
        titleId +
        '">' +
        attrQuote(t.quizModalTitle) +
        '</h2>' +
        '<button type="button" class="earnings-quiz-full-modal-close" aria-label="' +
        attrQuote(t.resultModalClose) +
        '">' +
        '<span aria-hidden="true">\u00d7</span></button>' +
        '</div>' +
        '<div class="hero-money-block hero-earnings-quiz earnings-quiz-modal-host" id="earnings-quiz-modal-root">' +
        '<div class="earnings-quiz-modal-question-wrap" hidden>' +
        '<div class="earnings-quiz-progress" id="earnings-quiz-modal-progress" hidden></div>' +
        '<p class="earnings-quiz-modal-question" id="earnings-quiz-modal-question"></p>' +
        '</div>' +
        '<div class="earnings-quiz-inner"></div></div></div></div>'
    );

    var backdrop = shell.querySelector('.earnings-quiz-full-modal-backdrop');
    var panel = shell.querySelector('.earnings-quiz-full-modal-panel');
    panel.addEventListener('click', function (ev) {
      ev.stopPropagation();
    });
    backdrop.addEventListener('click', function () {
      closeQuizFullModal();
    });
    shell.querySelector('.earnings-quiz-full-modal-close').addEventListener('click', function (ev) {
      ev.stopPropagation();
      closeQuizFullModal();
    });

    document.body.appendChild(shell);
    document.body.classList.add('earnings-quiz-modal-open');
    quizFullModalPrevFocus = document.activeElement;
    heroHeadlineQuizMode(null);

    quizFullModalPanelEl = panel;
    quizFullModalKeydownHandler = function (ev) {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        closeQuizFullModal();
        return;
      }
      if (ev.key !== 'Tab' || !quizFullModalPanelEl) return;
      var list = getModalPanelFocusables(quizFullModalPanelEl);
      if (list.length === 0) return;
      var first = list[0];
      var last = list[list.length - 1];
      if (ev.shiftKey) {
        if (document.activeElement === first) {
          ev.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', quizFullModalKeydownHandler);

    quizFullModalFocusInHandler = function (ev) {
      if (!quizFullModalPanelEl) return;
      var t = ev.target;
      if (t instanceof Node && quizFullModalPanelEl.contains(t)) return;
      focusPreferredInQuizModal(quizFullModalPanelEl);
    };
    document.addEventListener('focusin', quizFullModalFocusInHandler, true);

    var modalRoot = document.getElementById('earnings-quiz-modal-root');
    if (modalRoot) {
      flow(modalRoot, ctx, { skipModalIntro: true });
    }
    window.setTimeout(function () {
      focusPreferredInQuizModal(panel);
    }, 0);
  }

  function resultView(root, answers, go, ctx) {
    var rub = estimateRub(answers);
    heroHeadlineQuizMode(null);
    syncModalQuizChrome(null);
    var node = el(
      '<div class="earnings-quiz-screen earnings-quiz-screen--modal">' +
        resultMascotVideo() +
        '<div class="earnings-quiz-card earnings-quiz-card--result">' +
        '<p class="earnings-quiz-text" id="earnings-quiz-result-title">' +
        t.resultDone +
        '</p>' +
        '<p class="earnings-quiz-result-income"><span class="earnings-quiz-result-label">' +
        t.resultIncome +
        '</span> <strong class="earnings-quiz-result-num">' +
        formatEstimateRub(rub, ctx) +
        '</strong> ' +
        t.resultPeriod +
        '</p>' +
        '<p class="earnings-quiz-text earnings-quiz-text--accent">' +
        t.resultHint +
        '</p>' +
        '</div>' +
        '<div class="earnings-quiz-result-actions">' +
        '<a class="btn earnings-quiz-btn-main earnings-quiz-btn-signup" href="' +
        signUpUrl() +
        '" target="_blank" rel="noopener noreferrer">' +
        t.resultSignup +
        '</a>' +
        '<a class="btn btn-outline-light earnings-quiz-btn-secondary" href="' +
        telegramUrl() +
        '" target="_blank" rel="noopener noreferrer">' +
        t.resultTelegram +
        '</a>' +
        '<button type="button" class="earnings-quiz-link-restart">' +
        t.restart +
        '</button>' +
        '</div>' +
        '</div>'
    );

    node.querySelector('.earnings-quiz-link-restart').addEventListener('click', function () {
      go('reset');
    });

    mount(root, node);
  }

  function flow(root, ctx, flowOptions) {
    flowOptions = flowOptions || {};
    var skipModalIntro = !!flowOptions.skipModalIntro;
    earningsQuizSyncHeroHeadline = !root.classList.contains('earnings-quiz-modal-host');
    var answers = {
      adult: null,
      exp: null,
      time: null,
      earn: null,
      cap: null
    };

    function go(step) {
      if (step === 'reset') {
        answers = { adult: null, exp: null, time: null, earn: null, cap: null };
        if (skipModalIntro) {
          go('qAge');
        } else {
          introView(root, answers, go);
        }
        return;
      }
      if (step === 'intro') {
        introView(root, answers, go);
        return;
      }
      if (step === 'qAge') {
        yesNoView(root, answers, go);
        return;
      }
      if (step === 'qExp') {
        listChoiceView(root, answers, 'qExp', 'qTime', 'exp', t.qExp, [
          { v: 'beginner', label: t.expBeginner },
          { v: 'some', label: t.expSome },
          { v: 'earned', label: t.expEarned },
          { v: 'steady', label: t.expSteady }
        ], go);
        return;
      }
      if (step === 'qTime') {
        listChoiceView(root, answers, 'qTime', 'qEarn', 'time', t.qTime, [
          { v: 'm30', label: t.time30 },
          { v: 'h12', label: t.time12 },
          { v: 'h3plus', label: t.time3 },
          { v: 'full', label: t.timeFull }
        ], go);
        return;
      }
      if (step === 'qEarn') {
        listChoiceView(root, answers, 'qEarn', 'qCap', 'earn', t.qEarn, [
          { v: 'e1', label: t.earn1 },
          { v: 'e2', label: t.earn2 },
          { v: 'e3', label: t.earn3 },
          { v: 'e4', label: t.earn4 }
        ], go);
        return;
      }
      if (step === 'qCap') {
        listChoiceView(root, answers, 'qCap', 'result', 'cap', t.qCap, [
          { v: 'c0', label: t.cap0 },
          { v: 'c30', label: t.cap30 },
          { v: 'c300', label: t.cap300 },
          { v: 'c1000', label: t.cap1000 }
        ], go);
        return;
      }
      if (step === 'minor') {
        minorView(root, answers, go);
        return;
      }
      if (step === 'result') {
        resultView(root, answers, go, ctx);
      }
    }

    if (skipModalIntro) {
      go('qAge');
    } else {
      go('intro');
    }
  }

  function start() {
    var root = document.getElementById('hero-earnings-quiz');
    if (!root) return;
    var timeout = 8000;
    var quickCtx = buildCtxFromStatic({ currency: '', country_code: '' });
    applyCurrencyLabels(quickCtx);
    renderQuizLauncher(root, quickCtx);
    bindQuizHeroViewportListener();
    resolveCurrencyContext(timeout).then(function (ctx) {
      applyCurrencyLabels(ctx);
      quizLastCtx = ctx;
    });
  }

  /** يعمل مع React/Vite: إن وُجد العقدة بعد اكتمال التحميل أو بعد رسم React */
  var quizBootstrapped = false;
  var quizBootAttempts = 0;
  var MAX_QUIZ_BOOT_ATTEMPTS = 600;

  function bootstrapQuiz() {
    if (quizBootstrapped) return;
    var root = document.getElementById('hero-earnings-quiz');
    if (!root) {
      if (quizBootAttempts++ > MAX_QUIZ_BOOT_ATTEMPTS) return;
      requestAnimationFrame(bootstrapQuiz);
      return;
    }
    quizBootstrapped = true;
    start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapQuiz);
  } else {
    bootstrapQuiz();
  }
})();

