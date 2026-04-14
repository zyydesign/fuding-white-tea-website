
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
}

function initTeaCards() {
  const container = document.getElementById('tea-gallery');
  const filterWrap = document.getElementById('tea-filters');
  if (!container || !filterWrap) return;

  const teaData = [
    {
      name: '白毫银针',
      type: '芽头型',
      note: '芽头肥壮、白毫显露，是游客建立“高辨识度”印象最快的一款茶。',
      image: 'assets/media/yinzhen_jar.jpg',
      alt: '白毫银针芽头近景'
    },
    {
      name: '白牡丹',
      type: '花叶型',
      note: '芽叶相连、叶张舒展，适合用来说明白茶在形态上的层次感。',
      image: 'assets/media/white_peony_bowl.jpg',
      alt: '白牡丹干茶置于白碗中'
    },
    {
      name: '紧压白茶',
      type: '转化型',
      note: '压制成饼后造型完整，便于展示白茶在储藏、礼赠与文化表达中的不同形态。',
      image: 'assets/media/tea_cake_wood.jpg',
      alt: '木盘上的紧压白茶饼'
    },
    {
      name: '老白茶饼',
      type: '转化型',
      note: '常用于呈现白茶在时间转化过程中的风味变化，也是认识老白茶的重要切入点。',
      image: 'assets/media/aged_tea_cake.jpg',
      alt: '圆形老白茶饼特写'
    },
    {
      name: '茶青采摘',
      type: '工艺节点',
      note: '鲜叶采摘连接茶山景观与工艺起点，是理解福鼎白茶制作流程的重要环节。',
      image: 'assets/media/tea_basket.jpg',
      alt: '竹篮中的鲜叶特写'
    },
    {
      name: '叶态细节',
      type: '工艺节点',
      note: '叶片形态与色泽差异有助于说明工艺过程与茶型特征之间的联系。',
      image: 'assets/media/leaf_detail.jpg',
      alt: '白茶叶片细节对比'
    }
  ];

  const filters = ['全部', ...new Set(teaData.map(i => i.type))];
  filterWrap.innerHTML = filters.map((f, idx) =>
    `<button class="filter-btn ${idx === 0 ? 'active' : ''}" data-type="${f}">${f}</button>`
  ).join('');

  function render(type = '全部') {
    document.querySelectorAll('#tea-filters .filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });

    const list = type === '全部' ? teaData : teaData.filter(i => i.type === type);
    container.innerHTML = list.map(item => `
      <article class="card tea-card">
        <div class="gallery-shot">
          <img src="${item.image}" alt="${item.alt}">
        </div>
        <span class="tag">${item.type}</span>
        <h3>${item.name}</h3>
        <p>${item.note}</p>
      </article>
    `).join('');
  }

  filterWrap.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    render(btn.dataset.type);
  });

  render();
}

function initQuiz() {
  const box = document.getElementById('quiz-box');
  if (!box) return;

  const questions = [
    {
      q: '福鼎白茶制作技艺中最核心的初制工序是什么？',
      options: ['杀青与揉捻', '萎凋与干燥', '蒸压与渥堆'],
      answer: 1,
      exp: '根据国家级非遗项目资料，福鼎白茶初制原理和工艺规程主要为萎凋和干燥。'
    },
    {
      q: '下列哪一项更能体现福鼎白茶数字展示的综合价值？',
      options: ['只看商品价格', '把茶园体验、制茶工艺和地方景观串联起来', '只展示包装'],
      answer: 1,
      exp: '数字展示强调把茶山景观、制茶工艺、非遗故事与体验内容进行系统整合。'
    },
    {
      q: '福鼎白茶在 2022 年关联进入了哪一项国际名录？',
      options: ['世界自然遗产', '联合国教科文组织人类非物质文化遗产代表作名录', '世界记忆名录'],
      answer: 1,
      exp: '福鼎白茶制作技艺作为“中国传统制茶技艺及其相关习俗”的组成部分入选。'
    }
  ];

  let current = 0;
  let score = 0;
  const qEl = document.getElementById('quiz-question');
  const optEl = document.getElementById('quiz-options');
  const fbEl = document.getElementById('quiz-feedback');
  const progEl = document.getElementById('quiz-progress');
  const nextBtn = document.getElementById('quiz-next');

  function paint() {
    const item = questions[current];
    if (!item) {
      qEl.textContent = `答题完成，得分 ${score} / ${questions.length}`;
      optEl.innerHTML = '<div class="callout">你已经完成福鼎白茶知识问答，可继续浏览其他页面了解工艺流程、代表茶品与茶旅路线。</div>';
      fbEl.className = 'feedback';
      fbEl.textContent = '';
      progEl.textContent = '已完成';
      nextBtn.style.display = 'none';
      return;
    }
    progEl.textContent = `第 ${current + 1} / ${questions.length} 题`;
    qEl.textContent = item.q;
    optEl.innerHTML = item.options.map((op, idx) =>
      `<button type="button" data-idx="${idx}">${String.fromCharCode(65 + idx)}. ${op}</button>`
    ).join('');
    fbEl.className = 'feedback';
    fbEl.textContent = '';
    nextBtn.disabled = true;
  }

  optEl.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const idx = Number(btn.dataset.idx);
    const item = questions[current];
    const good = idx === item.answer;
    if (good) score += 1;
    fbEl.className = `feedback show ${good ? 'good' : 'bad'}`;
    fbEl.textContent = `${good ? '回答正确。' : '这题选错了。'} ${item.exp}`;
    [...optEl.querySelectorAll('button')].forEach(b => b.disabled = true);
    nextBtn.disabled = false;
  });

  nextBtn.addEventListener('click', () => {
    current += 1;
    paint();
  });

  paint();
}

function initPoster() {
  const poster = document.getElementById('tour-poster');
  if (!poster) return;

  const teaSel = document.getElementById('poster-tea');
  const sceneSel = document.getElementById('poster-scene');
  const toneSel = document.getElementById('poster-tone');

  const sceneMap = {
    mountain: {
      image: 'assets/media/tea_mountain_vertical.jpg',
      title: '晨雾里的茶山',
      desc: '把产地风景转译成第一眼就能记住的旅行画面。'
    },
    craft: {
      image: 'assets/media/tea_basket.jpg',
      title: '工艺与鲜叶',
      desc: '用细节和近景去讲一门看得见的非遗手艺。'
    },
    people: {
      image: 'assets/media/tea_portrait.jpg',
      title: '采茶人物',
      desc: '把人物放进画面，网站就会更有温度与代入感。'
    },
    route: {
      image: 'assets/media/tea_aerial.jpg',
      title: '俯瞰茶园',
      desc: '从空中视角建立福鼎白茶的地理记忆与路线想象。'
    }
  };

  const toneMap = {
    morning: 'linear-gradient(180deg, rgba(26, 38, 19, .12), rgba(26, 38, 19, .48))',
    sunset: 'linear-gradient(180deg, rgba(74, 42, 12, .06), rgba(74, 42, 12, .55))',
    mist: 'linear-gradient(180deg, rgba(31, 34, 39, .08), rgba(31, 34, 39, .55))'
  };

  function draw() {
    const tea = teaSel.value;
    const scene = sceneSel.value;
    const tone = toneSel.value;
    const data = sceneMap[scene];

    poster.innerHTML = `
      <img class="poster-photo" src="${data.image}" alt="${data.title}">
      <div class="poster-mask" style="background:${toneMap[tone]}"></div>
      <div class="poster-copy">
        <span class="badge">福鼎白茶主题海报</span>
        <div>
          <h4>${tea}</h4>
          <p>${data.title}</p>
          <div class="caption-row">
            <span>${tea}</span>
            <span>${data.title}</span>
            <span>非遗制作技艺</span>
          </div>
        </div>
        <div>
          <p>${data.desc}</p>
          <p style="margin-top:10px;font-size:13px;color:rgba(255,255,255,.82);">以轻量交互增强非遗内容的浏览体验与分享意愿。</p>
        </div>
      </div>
    `;
  }

  [teaSel, sceneSel, toneSel].forEach(el => el.addEventListener('change', draw));
  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initTeaCards();
  initQuiz();
  initPoster();
});
