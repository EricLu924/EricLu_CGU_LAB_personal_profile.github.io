// --- Logic: Multi-language Support ---
const translations = {
    // 這裡只保留中文翻譯，英文從HTML抓
    "zh": {
        "nav_expertise": "專業領域",
        "nav_career": "職涯歷程",
        "nav_achievements": "成就獎項",
        "nav_contact": "聯絡方式",
        "hero_greeting": "Hi, I'm Eric Lu ！",
        "hero_title": "Train models, not your liver.",
        "hero_desc": "我是CGU AICV LAB的成員，同時也是一位AI系統工程師。<br>目前正專注於研究影像辨識、系統優化等相關領域。",
        "hero_cta": "查看資訊",
        "section_achievements": "競賽與實務經歷",
        "card_awards_title": "獲獎榮譽",
        "card_awards_desc": "榮獲 ERPS 學會 2024 e化系統創新應用競賽「佳作」，以及大學畢業專題「優等獎」。展現系統創新與實作能力。",
        "tag_erps": "ERPS 2024 佳作",
        "tag_grad": "畢業專題優等獎",
        "tag_inn": "系統創新",
        "card_research_title": "研究與專題計畫",
        "card_research_desc": "參與 2023 國科會大專生研究計畫，以及第 28、29 屆大專校院資訊應用服務創新競賽。代表系所參加聯合資訊展。",
        "tag_nstc": "國科會研究計畫",
        "tag_comp": "資服創新競賽",
        "tag_exh": "聯合資訊展",
        "card_community_title": "IT 社群服務",
        "card_community_desc": "<li>協助博幼基金會製作線上課程教材</li><li>參與宜蘭南澳鄉國中小資訊教育服務，致力於縮短數位落差。</li>",
        "tag_edu": "線上課程教材",
        "tag_cs": "資訊教育服務",
        "tag_vol": "志工服務",
        "section_career": "職涯歷程",
        "job_crawler_title": "爬蟲工程師",
        "job_crawler_desc": "專注於高效率數據抓取與清洗，<br>建構自動化流程系統",
        "job_fs_title": "全端工程師",
        "job_fs_desc": "整合前後端架構，優化系統效能<br>與使用者互動體驗",
        "job_ai_title": "AI 系統工程師",
        "job_ai_desc": "致力於電腦視覺與模型應用，<br>解決複雜的辨識與預測問題",
        "section_expertise": "專業領域",
        "exp_research_title": "研究方向",
        "exp_research_desc": "<li>影像辨識</li><li>物件偵測</li><li>臉部情緒辨識</li>",
        "exp_areas_title": "擅長運用",
        "exp_areas_desc": "<li>系統開發</li><li>網路爬蟲</li><li>資料清洗</li><li>自動化流程</li>",
        "contact_title": "準備好開始下一個專案了嗎？",
        "contact_desc": "無論是學術研究合作，還是系統開發需求，歡迎隨時與我聯繫。",
        "contact_btn": "Emial Me"
    }

};

let currentLang = 'en'; // 預設語言與 HTML 內容一致


// 程式啟動時，自動遍歷所有帶有 data-lang 的元素，將其目前的內容存為英文版
const enTranslations = {};
document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    enTranslations[key] = el.innerHTML; // 抓取 HTML 內的英文原文 (包含 &amp; 等實體)
});
// 將自動抓取到的英文內容合併回翻譯物件中
translations['en'] = enTranslations;


// --- 事件監聽：語言切換按鈕 ---
document.getElementById('lang-switch').addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateLanguage(currentLang);
});

// --- 函式：更新頁面語言 ---
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        // 確保翻譯存在才進行替換
        if (translations[lang] && translations[lang][key]) {
            // 統一使用 innerHTML 賦值
            el.innerHTML = translations[lang][key];
        }
    });

    // 亮起 Active
    const opts = document.querySelectorAll('.lang-opt');
    opts.forEach(opt => {
        if(opt.dataset.target === lang) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });

    document.querySelector('html').setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');
}

// --- 滑鼠光暈 ---
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
    });
});

// --- 滾動淡入動畫 ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// --- Header 玻璃擬態滾動 ---
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.9)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--glass-bg)';
        header.style.boxShadow = 'none';
    }
});
document.addEventListener('mousemove', (e) => {
    
    const eyes = document.querySelectorAll('.char-eye');
    
    eyes.forEach(eye => {
        // 取得眼白的中心座標
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        // 計算滑鼠與眼睛的角度
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);

        // 設定眼珠移動半徑 (限制在眼白內)
        // 眼白半徑 ~22px，眼珠半徑 ~9px，移動距離約 10px 比較剛好
        const distance = 3; 

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        // 移動眼珠
        const pupil = eye.querySelector('.char-pupil');
        if (pupil) {
            pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
        }
    });
});

// 反
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});


document.addEventListener('keydown', (e) => {

    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
    }
    
    if (e.ctrlKey && e.shiftKey && 
       (e.key === 'I' || e.key === 'J' || e.key === 'C' || 
        e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
    }
    
    if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
        e.preventDefault();
    }

    if (e.ctrlKey && (e.key === 'S' || e.keyCode === 83)) {
        e.preventDefault();
    }
});