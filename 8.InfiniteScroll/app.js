const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let first = 0;
let second = 5;


showPosts(first, second);


// Event listeners

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  console.log(scrollTop, scrollHeight, clientHeight);
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts)



// Functions

// Fetch posts form API
async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const data = await res.json()
  return data;
}

// Show posts in DOM
async function showPosts(start, finish) {
  console.log(start, finish);
  const data = await getPosts();
  let posts = data.slice(start, finish)

  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post')
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
}

// Show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show')

    setTimeout(() => {
      first +=5;
      second +=5;
      showPosts(first, second);
    }, 300);

  }, 1000);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  })
}

