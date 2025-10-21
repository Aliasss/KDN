// KPN 생존 시뮬레이션 로직

let currentScenario = null;
let currentStep = 0;
let survivalRate = 100;
let choicesMade = [];
let userType = {
  cautious: 0,
  reckless: 0,
  social: 0,
  prepared: 0,
  defensive: 0,
  aggressive: 0,
  escape: 0,
  leader: 0,
  loner: 0
};

// 페이지 로드 시 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
  // 시나리오 선택 이벤트
  const scenarioCards = document.querySelectorAll('.scenario-card');
  scenarioCards.forEach(card => {
    card.addEventListener('click', function() {
      const scenarioId = this.dataset.scenario;
      startSimulation(scenarioId);
    });
  });

  // 재시도 버튼
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', function() {
      document.getElementById('sim-result').classList.remove('active');
      document.getElementById('sim-intro').classList.add('active');
      // 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// 시뮬레이션 시작
function startSimulation(scenarioId) {
  if (!SCENARIOS[scenarioId]) {
    console.error('Invalid scenario:', scenarioId);
    return;
  }

  currentScenario = SCENARIOS[scenarioId];
  currentStep = 0;
  survivalRate = 100;
  choicesMade = [];
  
  // 유형 카운터 초기화
  userType = {
    cautious: 0,
    reckless: 0,
    social: 0,
    prepared: 0,
    defensive: 0,
    aggressive: 0,
    escape: 0,
    leader: 0,
    loner: 0
  };
  
  // 화면 전환
  document.getElementById('sim-intro').classList.remove('active');
  document.getElementById('sim-game').classList.add('active');
  
  // 상단으로 스크롤
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // 첫 단계 로드
  loadStep(0);
}

// 단계 로드
function loadStep(stepIndex) {
  if (!currentScenario || !currentScenario.story[stepIndex]) {
    console.error('Invalid step:', stepIndex);
    return;
  }

  const step = currentScenario.story[stepIndex];
  currentStep = stepIndex + 1;
  
  // 진행률 업데이트
  const progress = (currentStep / currentScenario.totalSteps) * 100;
  document.querySelector('.progress-fill').style.width = progress + '%';
  document.getElementById('current-step').textContent = currentStep;
  document.getElementById('total-steps').textContent = currentScenario.totalSteps;
  
  // 생존율 업데이트
  updateSurvivalGauge();
  
  // 스토리 텍스트
  document.getElementById('story-text').textContent = step.text;
  
  // 선택지 생성
  const choicesContainer = document.getElementById('choices');
  choicesContainer.innerHTML = '';
  
  step.choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text;
    btn.onclick = () => makeChoice(choice, stepIndex);
    choicesContainer.appendChild(btn);
  });
}

// 생존율 게이지 업데이트
function updateSurvivalGauge() {
  document.getElementById('survival-percent').textContent = survivalRate;
  document.getElementById('survival-fill').style.width = survivalRate + '%';
  
  // 색상 변경 (낮을수록 빨강)
  const fill = document.getElementById('survival-fill');
  if (survivalRate < 30) {
    fill.style.background = '#ff6b6b';
  } else if (survivalRate < 60) {
    fill.style.background = 'linear-gradient(90deg, #ff6b6b, #feca57)';
  } else {
    fill.style.background = 'linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #1dd1a1)';
  }
}

// 선택하기
function makeChoice(choice, stepIndex) {
  // 생존율 조정
  survivalRate = Math.max(0, Math.min(100, survivalRate + choice.survival));
  
  // 유형 카운트
  if (choice.type) {
    userType[choice.type] = (userType[choice.type] || 0) + 1;
  }
  
  // 선택 기록
  choicesMade.push({
    step: stepIndex + 1,
    choice: choice.text,
    survival: choice.survival,
    type: choice.type
  });
  
  // 다음 단계로 이동
  const nextIndex = choice.next;
  
  // 마지막 단계인지 확인
  if (nextIndex >= currentScenario.story.length - 1 && currentStep >= currentScenario.totalSteps - 1) {
    // 최종 결과 표시
    setTimeout(() => showResult(), 800);
  } else {
    // 다음 단계 로드
    setTimeout(() => {
      loadStep(nextIndex);
      // 스토리 박스로 스크롤
      document.querySelector('.story-box').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  }
}

// 결과 화면 표시
function showResult() {
  document.getElementById('sim-game').classList.remove('active');
  document.getElementById('sim-result').classList.add('active');
  
  // 상단으로 스크롤
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // 생존율 표시
  document.getElementById('final-survival').textContent = survivalRate;
  
  // 서클 애니메이션
  setTimeout(() => {
    const circumference = 565;
    const offset = circumference - (survivalRate / 100) * circumference;
    document.getElementById('survival-circle').style.strokeDashoffset = offset;
  }, 300);
  
  // 유형 분석
  const dominantType = getDominantType();
  const typeInfo = getTypeInfo(dominantType);
  
  document.getElementById('type-badge').textContent = typeInfo.name;
  document.getElementById('type-desc').textContent = typeInfo.desc;
  
  // 결과 타이틀
  let title = '';
  if (survivalRate >= 80) {
    title = '🎉 생존 성공!';
  } else if (survivalRate >= 50) {
    title = '⚠️ 위험한 생존';
  } else if (survivalRate >= 20) {
    title = '💀 생존 실패';
  } else {
    title = '☠️ 치명적 실패';
  }
  document.getElementById('result-title').textContent = title;
  
  // 의사결정 분석
  displayAnalysis();
  
  // 결과 저장
  saveResult();
}

// 가장 많이 선택한 유형 찾기
function getDominantType() {
  let maxCount = 0;
  let dominantType = 'cautious';
  
  for (const [type, count] of Object.entries(userType)) {
    if (count > maxCount) {
      maxCount = count;
      dominantType = type;
    }
  }
  
  return dominantType;
}

// 유형 정보 가져오기
function getTypeInfo(type) {
  const lang = localStorage.getItem('lang') || 'ko';
  
  const types = {
    ko: {
      cautious: { name: '신중한 전략가', desc: '위험을 최소화하는 안전한 선택을 선호합니다. 계획적이고 조심스러운 당신은 생존에 유리합니다.' },
      reckless: { name: '대담한 모험가', desc: '위험을 감수하며 빠른 결정을 내립니다. 때로는 위험하지만 기회를 잡는 능력이 있습니다.' },
      social: { name: '커뮤니티 리더', desc: '협력과 연대로 함께 살아남는 길을 선택합니다. 당신의 공동체 의식은 강력한 무기입니다.' },
      prepared: { name: '완벽한 프레퍼', desc: '사전 준비와 계획으로 위기를 극복합니다. 지식과 준비는 당신의 가장 큰 자산입니다.' },
      defensive: { name: '방어의 달인', desc: '안전을 최우선으로 하며 보수적으로 행동합니다. 안정적이지만 때로는 기회를 놓칠 수 있습니다.' },
      aggressive: { name: '적극적 생존자', desc: '필요한 것을 얻기 위해 적극적으로 행동합니다. 추진력이 강하지만 위험도 높습니다.' },
      escape: { name: '탈출 전문가', desc: '위험한 상황을 피하고 새로운 곳을 찾습니다. 유연하지만 뿌리내리기 어려울 수 있습니다.' },
      leader: { name: '타고난 리더', desc: '위기 상황에서 다른 사람들을 이끕니다. 책임감과 희생정신이 뛰어납니다.' },
      loner: { name: '고독한 생존자', desc: '혼자서도 강하게 살아남는 독립적인 성향입니다. 자립적이지만 고립될 위험이 있습니다.' }
    },
    en: {
      cautious: { name: 'Cautious Strategist', desc: 'You prefer safe choices that minimize risks. Your planning and caution give you a survival advantage.' },
      reckless: { name: 'Bold Adventurer', desc: 'You take risks and make quick decisions. Sometimes dangerous, but you can seize opportunities.' },
      social: { name: 'Community Leader', desc: 'You choose cooperation and solidarity for collective survival. Your community spirit is a powerful weapon.' },
      prepared: { name: 'Perfect Prepper', desc: 'You overcome crises through preparation and planning. Knowledge and readiness are your greatest assets.' },
      defensive: { name: 'Master of Defense', desc: 'You prioritize safety and act conservatively. Stable, but may miss opportunities.' },
      aggressive: { name: 'Aggressive Survivor', desc: 'You act proactively to get what you need. Strong drive but high risk.' },
      escape: { name: 'Escape Specialist', desc: 'You avoid danger and seek new places. Flexible but may struggle to settle down.' },
      leader: { name: 'Natural Leader', desc: 'You lead others in crisis situations. Excellent responsibility and self-sacrifice.' },
      loner: { name: 'Lone Survivor', desc: 'You survive strongly alone with independent tendencies. Self-reliant but risk isolation.' }
    }
  };
  
  return types[lang][type] || types[lang].cautious;
}

// 의사결정 분석 표시
function displayAnalysis() {
  const analysisContent = document.getElementById('analysis-content');
  analysisContent.innerHTML = '';
  
  // 중요한 선택들만 표시 (생존율 변화가 큰 것)
  const significantChoices = choicesMade.filter(c => Math.abs(c.survival) >= 10);
  
  if (significantChoices.length === 0) {
    analysisContent.innerHTML = '<p style="color: var(--subtle);">안정적인 선택을 유지했습니다.</p>';
    return;
  }
  
  significantChoices.forEach(choice => {
    const item = document.createElement('div');
    item.className = 'analysis-item';
    
    const impact = choice.survival > 0 ? '긍정적 영향' : '부정적 영향';
    const impactColor = choice.survival > 0 ? '#1dd1a1' : '#ff6b6b';
    
    item.innerHTML = `
      <div class="analysis-step">Step ${choice.step}</div>
      <div class="analysis-choice">${choice.choice}</div>
      <div class="analysis-impact" style="color: ${impactColor};">
        ${impact}: ${choice.survival > 0 ? '+' : ''}${choice.survival}%
      </div>
    `;
    
    analysisContent.appendChild(item);
  });
}

// 결과 저장
async function saveResult() {
  const nickname = localStorage.getItem('nickname') || '익명';
  const dominantType = getDominantType();
  
  const resultData = {
    timestamp: new Date().toISOString(),
    nickname: nickname,
    scenario: currentScenario.id,
    survivalRate: survivalRate,
    type: dominantType,
    choiceCount: choicesMade.length
  };
  
  // localStorage에 개인 기록 저장
  try {
    const history = JSON.parse(localStorage.getItem('sim_history') || '[]');
    history.push(resultData);
    // 최근 10개만 유지
    if (history.length > 10) {
      history.shift();
    }
    localStorage.setItem('sim_history', JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
  
  // Google Sheets 저장 (선택사항 - 통계용)
  // 추후 구현 가능
  /*
  try {
    const formData = new FormData();
    formData.append('type', 'simulation');
    formData.append('nickname', nickname);
    formData.append('scenario', currentScenario.id);
    formData.append('survivalRate', survivalRate);
    formData.append('userType', dominantType);
    
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData
    });
  } catch (e) {
    console.error('Failed to save to Google Sheets:', e);
  }
  */
}

