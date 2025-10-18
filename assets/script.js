// KPN - Korea Preppers Network 공통 스크립트

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  // 현재 페이지 네비게이션 하이라이트
  highlightCurrentPage();
  
  // 환영 메시지 표시
  displayWelcomeMessage();
});

/**
 * 현재 페이지에 해당하는 네비게이션 링크에 active 클래스 추가
 */
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * localStorage에 저장된 닉네임이 있으면 환영 메시지 표시
 */
function displayWelcomeMessage() {
  const nickname = getNickname();
  const welcomeElement = document.querySelector('#welcome');
  
  if (nickname && welcomeElement) {
    welcomeElement.textContent = `${nickname}님, 다시 오셨군요.`;
    welcomeElement.style.display = 'block';
  }
}

/**
 * localStorage에서 닉네임 가져오기
 * @returns {string|null} 저장된 닉네임 또는 null
 */
function getNickname() {
  return localStorage.getItem('kpn_nickname');
}

/**
 * localStorage에 닉네임 저장
 * @param {string} nickname - 저장할 닉네임
 */
function setNickname(nickname) {
  localStorage.setItem('kpn_nickname', nickname);
}

/**
 * localStorage에서 닉네임 삭제
 */
function clearNickname() {
  localStorage.removeItem('kpn_nickname');
}

/**
 * 부드러운 스크롤 (앵커 링크용)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

