// Marketplace 投稿管理（ローカルストレージ利用）
document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('post-form');
  const postsList = document.getElementById('posts');

  // サンプルデータ
  const samplePosts = [
    { title: 'iPhone 13 Pro 256GB', price: 85000, description: '美品・付属品完備。SIMフリー。' },
    { title: 'MacBook Air M1', price: 95000, description: '2021年モデル、バッテリー良好。箱あり。' },
    { title: 'Nintendo Switch', price: 25000, description: '動作確認済み、Joy-Conグリップ付属。' },
    { title: 'AirPods Pro 第2世代', price: 22000, description: 'ケースに小傷あり。動作問題なし。' },
    { title: 'Kindle Paperwhite', price: 8000, description: '広告なしモデル。カバー付き。' },
    { title: 'SONY WH-1000XM4', price: 27000, description: 'ノイズキャンセリング最高峰。' },
    { title: 'ロジクール MX Master 3', price: 7000, description: 'ワイヤレスマウス。美品。' },
    { title: 'Dell 27インチ 4Kモニター', price: 32000, description: 'U2720Q。ドット抜けなし。' },
    { title: 'PS5 本体', price: 65000, description: 'ディスクドライブ搭載モデル。' },
    { title: 'GoPro HERO10', price: 38000, description: '付属品多数。動作良好。' },
    { title: 'BOSE SoundLink Mini II', price: 9000, description: 'Bluetoothスピーカー。' },
    { title: 'Apple Watch SE 40mm', price: 18000, description: 'バンド2本付き。' },
    { title: 'Surface Pro 7', price: 60000, description: 'タイプカバー・ペン付属。' },
    { title: 'Canon EOS Kiss M2', price: 52000, description: '標準レンズキット。' },
    { title: 'ルンバ i7+', price: 48000, description: '自動ゴミ収集機付き。' },
    { title: 'SHARP 加湿空気清浄機', price: 12000, description: '2022年製。美品。' },
    { title: 'Yogibo Max', price: 18000, description: 'カバー洗濯済み。' },
    { title: 'Dyson V8 Slim', price: 25000, description: 'バッテリー良好。付属品あり。' },
    { title: '任天堂 3DS LL', price: 9000, description: 'ソフト3本付き。' },
    { title: '無印良品 ステンレスユニットシェルフ', price: 7000, description: '幅86cm×奥行41cm×高さ83cm。' },
  ];

  // 投稿データの取得
  function getPosts() {
    return JSON.parse(localStorage.getItem('marketplace_posts') || '[]');
  }

  // 投稿データの保存
  function savePosts(posts) {
    localStorage.setItem('marketplace_posts', JSON.stringify(posts));
  }

  // 初回のみサンプルデータ投入
  function insertSampleIfNeeded() {
    if (!localStorage.getItem('marketplace_posts')) {
      savePosts(samplePosts);
    }
  }

  // 投稿一覧の描画
  function renderPosts() {
    const posts = getPosts();
    postsList.innerHTML = '';
    if (posts.length === 0) {
      postsList.innerHTML = '<li style="color:#aaa;text-align:center;">まだ投稿がありません</li>';
      return;
    }
    posts.forEach(post => {
      const li = document.createElement('li');
      li.className = 'post-card';
      li.innerHTML = `
        <div class="post-title">${post.title}</div>
        <div class="post-price">¥${Number(post.price).toLocaleString()}</div>
        <div class="post-description">${post.description}</div>
      `;
      postsList.appendChild(li);
    });
  }

  // 投稿フォーム送信時
  postForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const price = document.getElementById('price').value.trim();
    const description = document.getElementById('description').value.trim();
    if (!title || !price || !description) return;
    const posts = getPosts();
    posts.unshift({ title, price, description });
    savePosts(posts);
    renderPosts();
    postForm.reset();
  });

  insertSampleIfNeeded();
  renderPosts();
}); 