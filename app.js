// Marketplace Post Management (using localStorage)
document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('post-form');
  const postsList = document.getElementById('posts');

  // Sample data (English)
  const samplePosts = [
    { title: 'iPhone 13 Pro 256GB', price: 85000, description: 'Excellent condition, all accessories included. SIM-free.' },
    { title: 'MacBook Air M1', price: 95000, description: '2021 model, battery in good health. Box included.' },
    { title: 'Nintendo Switch', price: 25000, description: 'Fully functional, includes Joy-Con grip.' },
    { title: 'AirPods Pro 2nd Gen', price: 22000, description: 'Minor scratches on case. Works perfectly.' },
    { title: 'Kindle Paperwhite', price: 8000, description: 'Ad-free model. Comes with cover.' },
    { title: 'SONY WH-1000XM4', price: 27000, description: 'Top-class noise cancelling headphones.' },
    { title: 'Logitech MX Master 3', price: 7000, description: 'Wireless mouse. Excellent condition.' },
    { title: 'Dell 27" 4K Monitor', price: 32000, description: 'U2720Q. No dead pixels.' },
    { title: 'PS5 Console', price: 65000, description: 'Disc drive model.' },
    { title: 'GoPro HERO10', price: 38000, description: 'Many accessories included. Works great.' },
    { title: 'BOSE SoundLink Mini II', price: 9000, description: 'Bluetooth speaker.' },
    { title: 'Apple Watch SE 40mm', price: 18000, description: 'Includes 2 bands.' },
    { title: 'Surface Pro 7', price: 60000, description: 'Includes type cover and pen.' },
    { title: 'Canon EOS Kiss M2', price: 52000, description: 'Standard lens kit.' },
    { title: 'Roomba i7+', price: 48000, description: 'With automatic dirt disposal.' },
    { title: 'SHARP Humidifier Air Purifier', price: 12000, description: '2022 model. Excellent condition.' },
    { title: 'Yogibo Max', price: 18000, description: 'Cover washed.' },
    { title: 'Dyson V8 Slim', price: 25000, description: 'Battery in good health. Includes accessories.' },
    { title: 'Nintendo 3DS LL', price: 9000, description: 'Includes 3 games.' },
    { title: 'MUJI Stainless Unit Shelf', price: 7000, description: 'W86cm x D41cm x H83cm.' },
  ];

  // Get posts
  function getPosts() {
    return JSON.parse(localStorage.getItem('marketplace_posts') || '[]');
  }

  // Save posts
  function savePosts(posts) {
    localStorage.setItem('marketplace_posts', JSON.stringify(posts));
  }

  // Insert sample data if needed
  function insertSampleIfNeeded() {
    if (!localStorage.getItem('marketplace_posts')) {
      savePosts(samplePosts);
    }
  }

  // Render posts
  function renderPosts() {
    const posts = getPosts();
    postsList.innerHTML = '';
    if (posts.length === 0) {
      postsList.innerHTML = '<li style="color:#aaa;text-align:center;">No posts yet</li>';
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

  // On form submit
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