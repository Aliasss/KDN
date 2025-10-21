// KPN 생존 시뮬레이션 시나리오 데이터 (v1.4 - 난이도 상향)

const SCENARIOS = {
  zombie: {
    id: 'zombie',
    title: '좀비 아포칼립스',
    icon: '🧟‍♂️',
    totalSteps: 15,
    story: [
      // Step 1
      {
        step: 1,
        text: '평범한 아침, 뉴스에서 갑자기 긴급 속보가 나옵니다. "원인 불명의 폭력 사태가 전국적으로 확산 중... 시민 여러분은 외출을 자제하고..." 창밖을 보니 거리가 혼란스럽습니다.',
        choices: [
          { text: '즉시 집 문을 잠그고 식량/물을 확인한다', survival: 8, next: 1, type: 'cautious' },
          { text: '밖으로 나가서 직접 상황을 확인한다', survival: -20, next: 1, type: 'reckless' },
          { text: '가족/친구들에게 즉시 연락한다', survival: 3, next: 1, type: 'social' },
          { text: '비상 가방을 챙기고 대피 경로를 확인한다', survival: 12, next: 1, type: 'prepared' },
          { text: 'SNS로 상황을 파악한 후 판단한다', survival: -5, next: 1, type: 'passive' },
          { text: '창문/출입구를 즉시 차단하고 은신한다', survival: 10, next: 1, type: 'defensive' }
        ]
      },
      // Step 2
      {
        step: 2,
        text: '몇 시간 후, 거리에는 이상한 움직임을 보이는 사람들이 가득합니다. 물린 사람들이 공격적으로 변하고 있습니다. 식수와 식량은 3일치 정도 있습니다.',
        choices: [
          { text: '집에 남아서 버틴다 (고립 전략)', survival: 3, next: 2, type: 'defensive' },
          { text: '지금 즉시 마트로 가서 물자를 확보한다', survival: -18, next: 2, type: 'aggressive' },
          { text: '이웃과 연합하여 방어선을 구축한다', survival: 12, next: 2, type: 'social' },
          { text: '도시를 벗어나 시골로 즉시 탈출한다', survival: -8, next: 2, type: 'escape' },
          { text: '야간에 조용히 물자를 확보하기로 계획한다', survival: 10, next: 2, type: 'prepared' }
        ]
      },
      // Step 3
      {
        step: 3,
        text: '첫날 밤, 건물 밖에서 신음 소리와 비명 소리가 들립니다. 전기는 아직 들어오지만 언제 끊길지 모릅니다. 물은 아직 나오고 있습니다.',
        choices: [
          { text: '욕조와 모든 용기에 물을 받아둔다', survival: 12, next: 3, type: 'prepared' },
          { text: '창문을 철저히 차단하고 조용히 지낸다', survival: 8, next: 3, type: 'cautious' },
          { text: '이웃 집으로 가서 함께 대피할 것을 제안한다', survival: 5, next: 3, type: 'social' },
          { text: '무기가 될 만한 것들을 모은다', survival: 7, next: 3, type: 'defensive' },
          { text: '불을 모두 끄고 숨는다', survival: 6, next: 3, type: 'cautious' },
          { text: '밖의 상황을 정찰한다', survival: -12, next: 3, type: 'reckless' }
        ]
      },
      // Step 4
      {
        step: 4,
        text: '3일째, 식량이 바닥나기 시작합니다. 건물 1층에서 좀비들의 움직임이 포착됩니다. 라디오에서는 "안전지대로 이동하라"는 방송이 들립니다.',
        choices: [
          { text: '지금 즉시 안전지대로 이동을 시도한다', survival: -15, next: 4, type: 'escape' },
          { text: '조용히 숨어서 더 버틴다', survival: -12, next: 4, type: 'defensive' },
          { text: '밤에 몰래 마트로 식량을 구하러 간다', survival: 4, next: 4, type: 'aggressive' },
          { text: '다른 생존자들과 협력하여 건물을 요새화한다', survival: 10, next: 4, type: 'social' },
          { text: '충분히 계획을 세운 후 안전지대로 이동한다', survival: 8, next: 4, type: 'prepared' }
        ]
      },
      // Step 5
      {
        step: 5,
        text: '일주일이 지났습니다. 생존자 그룹이 형성되었고, 식량과 물 배급이 시작되었습니다. 하지만 누군가 물자를 독점하려는 움직임이 보입니다.',
        choices: [
          { text: '공정한 배급을 주장하며 리더십을 발휘한다', survival: 8, next: 5, type: 'leader' },
          { text: '조용히 자신의 몫만 챙긴다', survival: 2, next: 5, type: 'loner' },
          { text: '약자들을 보호하고 공동체를 강화한다', survival: 11, next: 5, type: 'social' },
          { text: '독자적으로 행동하며 물자를 따로 비축한다', survival: 0, next: 5, type: 'prepared' },
          { text: '물자를 빼돌리는 사람을 감시한다', survival: 5, next: 5, type: 'cautious' },
          { text: '갈등을 중재하고 규칙을 만든다', survival: 12, next: 5, type: 'leader' }
        ]
      },
      // Step 6
      {
        step: 6,
        text: '2주째, 좀비 떼가 건물을 포위했습니다. 누군가 큰 소음을 냈고 이들을 끌어들인 것 같습니다. 옥상으로 대피해야 할지 결정해야 합니다.',
        choices: [
          { text: '전원 옥상으로 즉시 대피한다', survival: 6, next: 6, type: 'cautious' },
          { text: '몇 명이 남아서 방어선을 유지한다', survival: -5, next: 6, type: 'defensive' },
          { text: '다른 건물로 위험을 무릅쓰고 이동한다', survival: -18, next: 6, type: 'escape' },
          { text: '미리 계획한 탈출 경로로 침착하게 이동한다', survival: 10, next: 6, type: 'prepared' },
          { text: '조용히 숨어서 좀비들이 지나가길 기다린다', survival: 4, next: 6, type: 'cautious' }
        ]
      },
      // Step 7
      {
        step: 7,
        text: '한 달째, 군대의 구조 헬기가 왔지만 탑승 인원이 제한적입니다. 당신은 태울 수 있지만 동료들은 남아야 합니다.',
        choices: [
          { text: '혼자 탑승한다', survival: -20, next: 7, type: 'loner' },
          { text: '가장 약한 사람들을 먼저 태운다', survival: 12, next: 7, type: 'social' },
          { text: '헬기를 거부하고 모두 함께 남는다', survival: 6, next: 7, type: 'leader' },
          { text: '헬기가 다시 올 때까지 방어 준비를 한다', survival: 3, next: 7, type: 'defensive' },
          { text: '추첨으로 공정하게 결정한다', survival: 9, next: 7, type: 'leader' }
        ]
      },
      // Step 8
      {
        step: 8,
        text: '6주째, 식량이 완전히 떨어졌습니다. 인근 군부대에 보급품이 있다는 소문이 돌지만, 그곳은 좀비들로 가득합니다.',
        choices: [
          { text: '소규모 팀으로 야간에 침투한다', survival: 7, next: 8, type: 'aggressive' },
          { text: '주변에서 식량을 찾는다 (쓰레기, 식물 등)', survival: -3, next: 8, type: 'prepared' },
          { text: '다른 생존자 그룹과 교역을 시도한다', survival: 10, next: 8, type: 'social' },
          { text: '굶으면서 구조를 기다린다', survival: -25, next: 8, type: 'passive' },
          { text: '미끼를 이용해 좀비를 유인한 후 물자를 확보한다', survival: 11, next: 8, type: 'prepared' }
        ]
      },
      // Step 9
      {
        step: 9,
        text: '2개월째, 물자를 확보했지만 그룹 내 갈등이 심화됩니다. 일부는 떠나고 싶어 하고, 일부는 이곳을 지키려 합니다.',
        choices: [
          { text: '민주적 투표로 결정한다', survival: 10, next: 9, type: 'leader' },
          { text: '자신의 신념대로 행동한다', survival: -5, next: 9, type: 'loner' },
          { text: '중재하며 타협점을 찾는다', survival: 12, next: 9, type: 'social' },
          { text: '가장 안전한 선택을 주장한다', survival: 6, next: 9, type: 'cautious' },
          { text: '데이터를 수집해 합리적 판단을 제시한다', survival: 11, next: 9, type: 'prepared' }
        ]
      },
      // Step 10
      {
        step: 10,
        text: '3개월째, 겨울이 다가옵니다. 난방 없이 버티기 어렵습니다. 근처 창고에 발전기와 연료가 있다는 정보를 얻었습니다.',
        choices: [
          { text: '위험을 무릅쓰고 즉시 발전기를 가져온다', survival: -10, next: 10, type: 'aggressive' },
          { text: '옷을 껴입고 불 없이 버틴다', survival: -15, next: 10, type: 'defensive' },
          { text: '모두가 함께 모여 체온을 나눈다', survival: 9, next: 10, type: 'social' },
          { text: '대체 난방 방법을 연구한다 (태양열, 운동 등)', survival: 12, next: 10, type: 'prepared' },
          { text: '계획을 세워 안전하게 발전기를 확보한다', survival: 11, next: 10, type: 'cautious' },
          { text: '연료를 절약하며 최소한만 사용한다', survival: 7, next: 10, type: 'prepared' }
        ]
      },
      // Step 11
      {
        step: 11,
        text: '4개월째, 다른 생존자 그룹이 당신의 거점을 발견했습니다. 그들은 무장하고 있으며 협력을 제안하지만, 믿을 수 있을지 불확실합니다.',
        choices: [
          { text: '협력을 받아들이고 통합한다', survival: 8, next: 11, type: 'social' },
          { text: '거절하고 독자 노선을 유지한다', survival: -8, next: 11, type: 'loner' },
          { text: '조심스럽게 교류하며 관찰한다', survival: 10, next: 11, type: 'cautious' },
          { text: '미리 탈출 계획을 세워둔다', survival: 4, next: 11, type: 'prepared' },
          { text: '조건부 협력을 제안한다 (시험 기간 설정)', survival: 11, next: 11, type: 'leader' }
        ]
      },
      // Step 12
      {
        step: 12,
        text: '5개월째, 좀비들의 움직임이 둔해지고 있습니다. 추위 때문인 것 같습니다. 이때 밖으로 나가 물자를 모을 기회입니다.',
        choices: [
          { text: '대규모 수색대를 편성한다', survival: 10, next: 12, type: 'aggressive' },
          { text: '소수 정예로 조용히 움직인다', survival: 11, next: 12, type: 'cautious' },
          { text: '안전을 위해 기다린다', survival: -10, next: 12, type: 'defensive' },
          { text: '체계적 계획을 세워 순차적으로 수색한다', survival: 13, next: 12, type: 'prepared' },
          { text: '여러 팀으로 나눠 동시에 움직인다', survival: 9, next: 12, type: 'leader' }
        ]
      },
      // Step 13
      {
        step: 13,
        text: '6개월째, 라디오에서 정부 방송이 들립니다. "안전지대가 확보되었습니다. 집결지로 이동하세요." 하지만 그곳까지 100km가 넘습니다.',
        choices: [
          { text: '즉시 출발한다', survival: -12, next: 13, type: 'escape' },
          { text: '충분히 준비한 후 출발한다', survival: 12, next: 13, type: 'prepared' },
          { text: '모두가 함께 이동할 수 있을 때까지 기다린다', survival: 7, next: 13, type: 'social' },
          { text: '이곳에 남기로 결정한다', survival: -8, next: 13, type: 'loner' },
          { text: '경로를 정찰한 후 결정한다', survival: 10, next: 13, type: 'cautious' }
        ]
      },
      // Step 14
      {
        step: 14,
        text: '이동 중, 다리가 끊어진 강을 건너야 합니다. 배가 있지만 모두를 한 번에 태울 수 없습니다. 좀비들이 뒤쫓아오고 있습니다.',
        choices: [
          { text: '약한 사람들을 먼저 건넌다', survival: 9, next: 14, type: 'social' },
          { text: '전투 가능한 사람들을 먼저 건넌다', survival: 4, next: 14, type: 'defensive' },
          { text: '자신이 마지막에 건넌다', survival: 11, next: 14, type: 'leader' },
          { text: '빠른 사람부터 먼저 건넌다', survival: -15, next: 14, type: 'loner' },
          { text: '일부가 좀비를 막고 나머지가 건넌다', survival: 8, next: 14, type: 'prepared' }
        ]
      },
      // Step 15 (Final)
      {
        step: 15,
        text: '드디어 안전지대가 보입니다. 하지만 마지막 관문에 좀비 무리가 있습니다. 이것이 마지막 선택입니다.',
        choices: [
          { text: '모두가 함께 돌파한다', survival: 10, next: 15, type: 'leader' },
          { text: '미끼를 이용해 우회한다', survival: 12, next: 15, type: 'prepared' },
          { text: '야간에 조용히 통과한다', survival: 9, next: 15, type: 'cautious' },
          { text: '일부가 희생하여 나머지를 살린다', survival: -10, next: 15, type: 'social' },
          { text: '무력으로 돌파한다', survival: -8, next: 15, type: 'aggressive' }
        ]
      }
    ]
  },

  nuclear: {
    id: 'nuclear',
    title: '핵전쟁/방사능',
    icon: '☢️',
    totalSteps: 12,
    story: [
      // Step 1
      {
        step: 1,
        text: '긴급 경보음이 울립니다. "핵 미사일 발사 감지. 즉시 대피하세요." 예상 도착 시간 15분. 당신은 지금 회사에 있습니다.',
        choices: [
          { text: '즉시 지하실/지하철로 대피한다', survival: 10, next: 1, type: 'prepared' },
          { text: '집으로 가족을 데리러 간다', survival: -25, next: 1, type: 'social' },
          { text: '가장 가까운 건물 지하로 들어간다', survival: 8, next: 1, type: 'cautious' },
          { text: '차로 도시를 빠져나간다', survival: -30, next: 1, type: 'escape' },
          { text: '회사 지하 주차장으로 대피한다', survival: 7, next: 1, type: 'defensive' }
        ]
      },
      // Step 2
      {
        step: 2,
        text: '폭발음과 함께 엄청난 섬광이 보입니다. 건물이 흔들리고 먼지가 날립니다. 당신은 지하에 있어 직접 피해는 없었습니다.',
        choices: [
          { text: '지하에 계속 머문다', survival: 10, next: 2, type: 'defensive' },
          { text: '밖의 상황을 확인하러 나간다', survival: -28, next: 2, type: 'reckless' },
          { text: '다른 생존자들을 찾는다', survival: 7, next: 2, type: 'social' },
          { text: '물과 식량을 즉시 확보한다', survival: 9, next: 2, type: 'prepared' },
          { text: '창문/출입구를 밀폐한다', survival: 8, next: 2, type: 'cautious' },
          { text: '방사능 측정 방법을 찾는다', survival: 6, next: 2, type: 'prepared' }
        ]
      },
      // Step 3
      {
        step: 3,
        text: '폭발 후 2시간, 낙진이 시작될 것입니다. 라디오에서는 "최소 48시간 실내에 머물라"고 방송합니다. 주변에 비상용품이 거의 없습니다.',
        choices: [
          { text: '있는 것으로 버틴다', survival: 4, next: 3, type: 'defensive' },
          { text: '빠르게 밖으로 나가 물자를 모은다 (30분 작전)', survival: -8, next: 3, type: 'aggressive' },
          { text: '다른 생존자들과 물자를 공유한다', survival: 8, next: 3, type: 'social' },
          { text: '물 정수와 식량 배분 계획을 세운다', survival: 10, next: 3, type: 'prepared' },
          { text: '방사능 차단을 위해 공간을 밀폐한다', survival: 9, next: 3, type: 'cautious' }
        ]
      },
      // Step 4
      {
        step: 4,
        text: '24시간째, 누군가 심하게 다쳤고 의료 도움이 필요합니다. 하지만 밖은 여전히 방사능에 오염되어 있습니다.',
        choices: [
          { text: '위험을 무릅쓰고 병원/약국을 찾는다', survival: -18, next: 4, type: 'social' },
          { text: '할 수 있는 응급처치만 한다', survival: 5, next: 4, type: 'cautious' },
          { text: '다른 생존자 중 의료 지식이 있는 사람을 찾는다', survival: 8, next: 4, type: 'prepared' },
          { text: '희생을 최소화하기 위해 격리한다', survival: -10, next: 4, type: 'defensive' },
          { text: '간이 방호복을 만들어 빠르게 다녀온다', survival: 3, next: 4, type: 'prepared' }
        ]
      },
      // Step 5
      {
        step: 5,
        text: '48시간째, 밖으로 나가도 되지만 여전히 방사능 수치가 높습니다. 식량과 물이 거의 떨어졌습니다.',
        choices: [
          { text: '비닐/테이프로 방호복을 만들어 입고 나간다', survival: 8, next: 5, type: 'prepared' },
          { text: '빠르게 다녀온다 (노출 최소화)', survival: 2, next: 5, type: 'aggressive' },
          { text: '좀 더 기다린다', survival: -20, next: 5, type: 'cautious' },
          { text: '그룹으로 나가 효율적으로 수집한다', survival: 9, next: 5, type: 'social' },
          { text: '가장 가까운 곳만 빠르게 확보한다', survival: 5, next: 5, type: 'cautious' },
          { text: '방사능이 낮은 시간대를 계산해 이동한다', survival: 10, next: 5, type: 'prepared' }
        ]
      },
      // Step 6
      {
        step: 6,
        text: '3일째, 정부 방송에서 안전지대 위치를 알려줍니다. 하지만 50km 떨어져 있고, 방사능 지역을 통과해야 합니다.',
        choices: [
          { text: '즉시 출발한다', survival: -15, next: 6, type: 'escape' },
          { text: '일주일 후 방사능이 줄면 출발한다', survival: 6, next: 6, type: 'cautious' },
          { text: '충분히 준비한 후 출발한다 (물자, 경로)', survival: 10, next: 6, type: 'prepared' },
          { text: '이곳에 남아 구조를 기다린다', survival: -12, next: 6, type: 'defensive' },
          { text: '정찰을 보내 경로를 확인한 후 결정한다', survival: 8, next: 6, type: 'leader' }
        ]
      },
      // Step 7
      {
        step: 7,
        text: '일주일째, 구토와 탈모 증상이 나타나는 사람들이 있습니다. 방사능 피폭 증상입니다. 의약품이 필요합니다.',
        choices: [
          { text: '병원을 찾아간다', survival: -12, next: 7, type: 'aggressive' },
          { text: '증상을 완화할 수 있는 민간요법을 시도한다', survival: 4, next: 7, type: 'prepared' },
          { text: '환자들을 격리하고 나머지를 보호한다', survival: -8, next: 7, type: 'defensive' },
          { text: '모두를 돌보며 희망을 잃지 않는다', survival: 7, next: 7, type: 'social' },
          { text: '요오드 등 방사능 대응 물질을 찾는다', survival: 8, next: 7, type: 'prepared' }
        ]
      },
      // Step 8
      {
        step: 8,
        text: '2주째, 식수가 오염되었을 가능성이 높습니다. 빗물을 모아야 하는데, 초기 빗물은 방사능에 오염되어 있을 것입니다.',
        choices: [
          { text: '첫 비는 버리고 이후 빗물을 모은다', survival: 10, next: 8, type: 'prepared' },
          { text: '일단 마셔본다 (선택의 여지가 없음)', survival: -22, next: 8, type: 'reckless' },
          { text: '물을 끓여서 사용한다', survival: 5, next: 8, type: 'cautious' },
          { text: '정수 필터를 만든다 (모래, 숯 등)', survival: 8, next: 8, type: 'prepared' },
          { text: '다른 수원을 찾는다 (지하수, 우물)', survival: 6, next: 8, type: 'aggressive' }
        ]
      },
      // Step 9
      {
        step: 9,
        text: '3주째, 다른 생존자 그룹이 당신의 물자를 빼앗으려 합니다. 그들도 절박해 보입니다.',
        choices: [
          { text: '나눠준다', survival: 9, next: 9, type: 'social' },
          { text: '거부하고 방어한다', survival: -5, next: 9, type: 'defensive' },
          { text: '협상하여 교환한다', survival: 10, next: 9, type: 'prepared' },
          { text: '이곳을 포기하고 이동한다', survival: -12, next: 9, type: 'escape' },
          { text: '조건부로 협력을 제안한다', survival: 11, next: 9, type: 'leader' }
        ]
      },
      // Step 10
      {
        step: 10,
        text: '한 달째, 안전지대로 이동을 결정했습니다. 방사능 측정기가 없어 어느 경로가 안전한지 모릅니다.',
        choices: [
          { text: '최단 거리로 간다', survival: -18, next: 10, type: 'aggressive' },
          { text: '우회로를 택한다 (시간은 오래 걸리지만)', survival: 7, next: 10, type: 'cautious' },
          { text: '다른 생존자들의 정보를 모은 후 결정한다', survival: 10, next: 10, type: 'social' },
          { text: '지도와 바람 방향을 분석하여 경로를 정한다', survival: 11, next: 10, type: 'prepared' },
          { text: '여러 경로를 시험해본다', survival: -10, next: 10, type: 'reckless' }
        ]
      },
      // Step 11
      {
        step: 11,
        text: '이동 중, 높은 방사능 지역을 만났습니다. 우회하면 3일이 더 걸리고 식량이 부족합니다. 통과하면 빠르지만 위험합니다.',
        choices: [
          { text: '빠르게 통과한다', survival: -22, next: 11, type: 'aggressive' },
          { text: '우회한다', survival: 5, next: 11, type: 'cautious' },
          { text: '잠시 머물며 주변에서 식량을 구한다', survival: 3, next: 11, type: 'prepared' },
          { text: '그룹이 나뉘어 두 경로로 시도한다', survival: -8, next: 11, type: 'leader' },
          { text: '식량을 절약하며 우회한다', survival: 7, next: 11, type: 'cautious' }
        ]
      },
      // Step 12 (Final)
      {
        step: 12,
        text: '마침내 안전지대가 보입니다. 검문소에서 방사능 검사를 합니다. 일부는 수치가 높아 격리될 수 있습니다.',
        choices: [
          { text: '솔직하게 모든 정보를 제공한다', survival: 10, next: 12, type: 'leader' },
          { text: '함께 온 모든 사람이 들어갈 수 있게 요청한다', survival: 8, next: 12, type: 'social' },
          { text: '일단 들어가고 본다', survival: 5, next: 12, type: 'cautious' },
          { text: '격리될 사람들을 위해 교섭한다', survival: 12, next: 12, type: 'leader' },
          { text: '방사능 제거 방법을 제안한다', survival: 9, next: 12, type: 'prepared' }
        ]
      }
    ]
  },

  blackout: {
    id: 'blackout',
    title: '장기 정전 (블랙아웃)',
    icon: '🔌',
    totalSteps: 10,
    story: [
      // Step 1
      {
        step: 1,
        text: '갑자기 모든 전기가 끊겼습니다. 휴대폰도, 차도, 모든 전자기기가 작동하지 않습니다. EMP 공격 또는 대규모 시스템 붕괴로 보입니다.',
        choices: [
          { text: '냉장고/냉동고 음식을 빠르게 정리한다', survival: 12, next: 1, type: 'prepared' },
          { text: '밖으로 나가 상황을 파악한다', survival: 5, next: 1, type: 'social' },
          { text: '집에 있는 물자를 확인한다', survival: 10, next: 1, type: 'cautious' },
          { text: '이웃들과 모여 대책을 논의한다', survival: 14, next: 1, type: 'social' },
          { text: 'SNS를 확인한다 (작동 안 됨)', survival: -8, next: 1, type: 'passive' }
        ]
      },
      // Step 2
      {
        step: 2,
        text: '첫날 밤, 도시가 완전히 어둡습니다. 일부 지역에서 약탈이 시작되었다는 소문이 들립니다. 수도는 아직 나옵니다.',
        choices: [
          { text: '모든 용기에 물을 받아둔다', survival: 15, next: 2, type: 'prepared' },
          { text: '문을 잠그고 조용히 지낸다', survival: 8, next: 2, type: 'defensive' },
          { text: '이웃과 교대로 경비를 선다', survival: 12, next: 2, type: 'social' },
          { text: '필요한 것을 미리 확보하러 간다', survival: 3, next: 2, type: 'aggressive' },
          { text: '비상용 조명을 준비한다', survival: 10, next: 2, type: 'prepared' },
          { text: '상황을 관망한다', survival: -5, next: 2, type: 'passive' }
        ]
      },
      // Step 3
      {
        step: 3,
        text: '3일째, 마트에 물자가 떨어지고 있습니다. 수도가 끊기기 시작했습니다. ATM도 작동하지 않아 현금이 의미 없어졌습니다.',
        choices: [
          { text: '물물교환 네트워크를 만든다', survival: 13, next: 3, type: 'social' },
          { text: '자신의 물자를 아껴 쓴다', survival: 7, next: 3, type: 'cautious' },
          { text: '대체 수원을 찾는다 (빗물, 하천 등)', survival: 11, next: 3, type: 'prepared' },
          { text: '그룹을 만들어 자원을 공동 관리한다', survival: 15, next: 3, type: 'leader' },
          { text: '마트에서 필요한 것을 가져온다', survival: -10, next: 3, type: 'aggressive' }
        ]
      },
      // Step 4
      {
        step: 4,
        text: '일주일째, 정부나 전력 복구 소식이 없습니다. 식량이 떨어지고 치안이 붕괴되고 있습니다.',
        choices: [
          { text: '도시를 떠나 시골로 간다', survival: 5, next: 4, type: 'escape' },
          { text: '커뮤니티를 강화하고 자급자족 시스템을 만든다', survival: 15, next: 4, type: 'social' },
          { text: '혼자서 조용히 버틴다', survival: -8, next: 4, type: 'loner' },
          { text: '물자를 찾아 위험 지역을 탐색한다', survival: -12, next: 4, type: 'aggressive' },
          { text: '텃밭을 만들고 물자를 비축한다', survival: 13, next: 4, type: 'prepared' }
        ]
      },
      // Step 5
      {
        step: 5,
        text: '2주째, 겨울이 다가옵니다. 난방 없이는 버티기 어렵습니다. 나무를 구할 수 있지만 연기로 위치가 노출될 수 있습니다.',
        choices: [
          { text: '불을 피우고 창문을 가린다', survival: 11, next: 5, type: 'cautious' },
          { text: '여러 집이 모여 체온을 나눈다', survival: 14, next: 5, type: 'social' },
          { text: '두꺼운 옷으로 버틴다', survival: 2, next: 5, type: 'defensive' },
          { text: '태양열을 활용한 난방 시스템을 만든다', survival: 15, next: 5, type: 'prepared' },
          { text: '운동으로 체온을 유지한다', survival: 8, next: 5, type: 'prepared' }
        ]
      },
      // Step 6
      {
        step: 6,
        text: '3주째, 의약품이 떨어졌습니다. 누군가 감염으로 위독한 상태입니다. 병원은 이미 약탈당했습니다.',
        choices: [
          { text: '다른 생존자 그룹과 교섭한다', survival: 12, next: 6, type: 'social' },
          { text: '자연 치료법을 시도한다 (허브, 소독 등)', survival: 9, next: 6, type: 'prepared' },
          { text: '위험을 무릅쓰고 약국을 수색한다', survival: -5, next: 6, type: 'aggressive' },
          { text: '할 수 있는 것이 없음을 받아들인다', survival: -15, next: 6, type: 'defensive' },
          { text: '커뮤니티 내 의료 지식을 공유한다', survival: 11, next: 6, type: 'social' },
          { text: '예방에 집중한다 (위생, 영양)', survival: 13, next: 6, type: 'prepared' }
        ]
      },
      // Step 7
      {
        step: 7,
        text: '한 달째, 식량 생산을 시작해야 합니다. 하지만 겨울이고, 씨앗과 도구가 부족합니다.',
        choices: [
          { text: '실내에서 스프라우트를 기른다', survival: 13, next: 7, type: 'prepared' },
          { text: '봄까지 기다린다', survival: -10, next: 7, type: 'cautious' },
          { text: '커뮤니티 텃밭을 계획한다', survival: 15, next: 7, type: 'social' },
          { text: '야생 식물을 채집한다', survival: 10, next: 7, type: 'prepared' },
          { text: '물고기나 작은 동물을 사냥한다', survival: 11, next: 7, type: 'aggressive' }
        ]
      },
      // Step 8
      {
        step: 8,
        text: '6주째, 다른 지역에서 온 난민들이 당신의 지역으로 몰려옵니다. 그들도 굶주리고 절박합니다.',
        choices: [
          { text: '받아들이고 함께 나눈다', survival: 8, next: 8, type: 'social' },
          { text: '거부하고 경계를 강화한다', survival: -8, next: 8, type: 'defensive' },
          { text: '일부만 받아들이고 기여를 요구한다', survival: 12, next: 8, type: 'leader' },
          { text: '모두를 위한 장기 계획을 세운다', survival: 15, next: 8, type: 'prepared' },
          { text: '기술이나 물자가 있는 사람만 받는다', survival: 10, next: 8, type: 'cautious' }
        ]
      },
      // Step 9
      {
        step: 9,
        text: '2개월째, 소규모 발전기를 찾았습니다. 하지만 연료가 제한적입니다. 무엇에 사용할지 결정해야 합니다.',
        choices: [
          { text: '의료 장비에 사용한다', survival: 13, next: 9, type: 'social' },
          { text: '통신 장비로 외부와 연락을 시도한다', survival: 14, next: 9, type: 'prepared' },
          { text: '식량 보관 (냉장)에 사용한다', survival: 10, next: 9, type: 'cautious' },
          { text: '아껴두었다가 진짜 비상시에 사용한다', survival: 8, next: 9, type: 'defensive' },
          { text: '물 정화에 사용한다', survival: 12, next: 9, type: 'prepared' }
        ]
      },
      // Step 10 (Final)
      {
        step: 10,
        text: '3개월째, 일부 지역에 전력이 복구되기 시작했다는 소문이 들립니다. 하지만 당신의 커뮤니티는 이미 자급자족 시스템을 구축했습니다.',
        choices: [
          { text: '전력 복구 지역으로 이동한다', survival: 8, next: 10, type: 'escape' },
          { text: '현재 시스템을 유지하며 자립한다', survival: 13, next: 10, type: 'leader' },
          { text: '복구 팀과 협력하여 지역을 재건한다', survival: 15, next: 10, type: 'social' },
          { text: '천천히 문명으로 복귀할 준비를 한다', survival: 12, next: 10, type: 'prepared' },
          { text: '상황을 관망한다', survival: 6, next: 10, type: 'cautious' }
        ]
      }
    ]
  }
};
