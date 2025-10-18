// Google Sheets JSON URL (배포 후 여기에 URL 입력)
// SETUP_GUIDE.md를 참고하여 Google Sheets를 JSON으로 퍼블리시하고 아래 URL을 업데이트하세요
const SHEETS_JSON_URL = 'YOUR_GOOGLE_SHEETS_JSON_URL_HERE';

// 페이지 로드 시 인사이트 불러오기
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#insights-list')) {
    fetchInsights();
  }
});

/**
 * Google Sheets에서 인사이트 데이터를 가져와 렌더링
 */
async function fetchInsights() {
  const insightsList = document.querySelector('#insights-list');
  
  if (!insightsList) return;
  
  try {
    // SHEETS_JSON_URL이 설정되지 않은 경우 예시 데이터 사용
    if (SHEETS_JSON_URL === 'YOUR_GOOGLE_SHEETS_JSON_URL_HERE') {
      console.warn('Google Sheets JSON URL이 설정되지 않았습니다. 예시 데이터를 표시합니다.');
      renderExampleInsights();
      return;
    }
    
    // Google Sheets JSON 데이터 가져오기
    const response = await fetch(SHEETS_JSON_URL);
    
    if (!response.ok) {
      throw new Error('데이터를 불러올 수 없습니다.');
    }
    
    const data = await response.json();
    
    // 데이터 형식에 따라 파싱 (Google Sheets JSON 형식)
    const insights = parseGoogleSheetsData(data);
    
    if (insights && insights.length > 0) {
      renderInsights(insights);
    } else {
      renderExampleInsights();
    }
    
  } catch (error) {
    console.error('인사이트 불러오기 오류:', error);
    renderExampleInsights();
  }
}

/**
 * Google Sheets JSON 데이터 파싱
 * @param {Object} data - Google Sheets JSON 데이터
 * @returns {Array} 인사이트 배열
 */
function parseGoogleSheetsData(data) {
  // Google Sheets JSON 형식에 맞게 파싱
  // 실제 구조는 Sheets 설정에 따라 다를 수 있음
  
  if (data.feed && data.feed.entry) {
    // Atom feed 형식
    return data.feed.entry.map(entry => ({
      nickname: entry.gsx$nickname?.$t || '익명',
      insight: entry.gsx$insight?.$t || '',
      timestamp: entry.gsx$timestamp?.$t || ''
    }));
  } else if (data.values) {
    // values 형식 (첫 행은 헤더)
    const [headers, ...rows] = data.values;
    return rows.map(row => ({
      nickname: row[0] || '익명',
      insight: row[1] || '',
      timestamp: row[2] || ''
    }));
  }
  
  return [];
}

/**
 * 인사이트 렌더링
 * @param {Array} insights - 인사이트 배열
 */
function renderInsights(insights) {
  const insightsList = document.querySelector('#insights-list');
  
  if (!insightsList) return;
  
  // 기존 예시 데이터 제거
  insightsList.innerHTML = '';
  
  // 최신 순으로 정렬 (최대 12개만 표시)
  const recentInsights = insights.slice(-12).reverse();
  
  recentInsights.forEach(insight => {
    const card = document.createElement('div');
    card.className = 'card';
    
    const nickname = document.createElement('small');
    nickname.style.color = 'var(--subtle)';
    nickname.textContent = insight.nickname;
    
    const content = document.createElement('p');
    content.style.marginTop = '0.5rem';
    content.textContent = insight.insight;
    
    card.appendChild(nickname);
    card.appendChild(content);
    
    insightsList.appendChild(card);
  });
  
  // 데이터가 없는 경우
  if (recentInsights.length === 0) {
    renderExampleInsights();
  }
}

/**
 * 예시 인사이트 렌더링 (Google Sheets 연동 전)
 */
function renderExampleInsights() {
  const insightsList = document.querySelector('#insights-list');
  
  if (!insightsList) return;
  
  const exampleInsights = [
    {
      nickname: '준비자_001',
      insight: '비상 가방은 집에만 두지 말고 차량과 직장에도 작은 버전을 준비해두세요. 재난은 어디서든 일어날 수 있습니다.'
    },
    {
      nickname: '생존주의자_K',
      insight: '지식이 가장 중요한 자산입니다. 책으로 된 생존 매뉴얼을 반드시 구비하세요. 전기가 끊기면 디지털 정보는 무용지물입니다.'
    },
    {
      nickname: '프레퍼_서울',
      insight: '이웃과의 관계가 중요합니다. 재난 시 혼자서는 한계가 있어요. 평소에 커뮤니티를 만들어두세요.'
    },
    {
      nickname: '대비형_인간',
      insight: '물 정수 필터는 반드시 두 개 이상 준비하세요. 하나가 고장나면 대안이 없습니다. 백업의 백업을 준비하는 것이 생존입니다.'
    },
    {
      nickname: '현실주의자',
      insight: '재난 대비는 평생 프로젝트입니다. 한 번에 모든 것을 준비하려 하지 말고, 매달 조금씩 준비하세요.'
    },
    {
      nickname: '의료인_P',
      insight: '응급처치 지식은 돈으로 살 수 없는 생존 스킬입니다. CPR과 지혈법은 반드시 배워두세요.'
    }
  ];
  
  // 기존 내용 유지하되, 아래 안내 문구 업데이트
  const noticeText = insightsList.nextElementSibling;
  if (noticeText && noticeText.tagName === 'P') {
    noticeText.textContent = '* 예시 데이터입니다. Google Sheets 연동 후 실시간 업데이트됩니다.';
    noticeText.style.color = 'var(--subtle)';
  }
}

/**
 * 인사이트 새로고침 (수동 호출용)
 */
function refreshInsights() {
  fetchInsights();
}

