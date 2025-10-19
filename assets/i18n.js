// KPN 다국어 지원 시스템

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('kpn_lang') || 'ko';
    this.translations = {};
    this.initialized = false;
  }

  async init() {
    try {
      await this.loadLanguage(this.currentLang);
      this.applyTranslations();
      this.setupLanguageSwitcher();
      this.initialized = true;
    } catch (error) {
      console.error('i18n initialization error:', error);
    }
  }

  async loadLanguage(lang) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `i18n/${lang}.js`;
      script.onload = () => {
        this.translations = window[lang];
        this.currentLang = lang;
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load ${lang}.js`));
      document.head.appendChild(script);
    });
  }

  translate(key) {
    try {
      const keys = key.split('.');
      let value = this.translations;
      for (const k of keys) {
        value = value[k];
        if (value === undefined) return key;
      }
      return value;
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
  }

  applyTranslations() {
    // data-i18n 속성을 가진 모든 요소에 번역 적용
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = this.translate(key);
      
      // HTML 태그가 포함된 경우 innerHTML 사용, 아니면 textContent 사용
      if (el.getAttribute('data-i18n-html') === 'true') {
        el.innerHTML = translated;
      } else {
        el.textContent = translated;
      }
    });

    // data-i18n-placeholder 속성 처리 (input 필드용)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.translate(key);
    });

    // HTML lang 속성 업데이트
    document.documentElement.lang = this.currentLang;
  }

  setupLanguageSwitcher() {
    const langBtn = document.getElementById('lang-btn');
    const langCode = document.querySelector('.lang-code');
    
    if (langBtn && langCode) {
      // 현재 언어 표시
      langCode.textContent = this.currentLang.toUpperCase();
      
      // 클릭 이벤트 리스너
      langBtn.addEventListener('click', () => {
        const newLang = this.currentLang === 'ko' ? 'en' : 'ko';
        this.switchLanguage(newLang);
      });
    }
  }

  switchLanguage(lang) {
    localStorage.setItem('kpn_lang', lang);
    location.reload();
  }
}

// 페이지 로드 시 자동 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.kpnI18n = new I18n();
    window.kpnI18n.init();
  });
} else {
  window.kpnI18n = new I18n();
  window.kpnI18n.init();
}

