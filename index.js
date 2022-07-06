let postsArray = []
const titleInput = document.getElementById('post-title')
const bodyInput = document.getElementById('post-body')
const form = document.getElementById('new-post')

function renderPosts() {
    let html = ''
    for (const post of postsArray) {
        html += `
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            <hr>
        `
    }
    document.getElementById('blog-list').innerHTML = html
}

fetch('https://apis.scrimba.com/jsonplaceholder/posts').then(res => res.json()).then(data => {
    postsArray = data.slice(0,5)
    renderPosts()
})

form.addEventListener('submit', function(e) {
    e.preventDefault() // to avoid refreshing the page when submiting the form
    const postTitle = titleInput.value
    const postBody = bodyInput.value
    const data = {
        title: postTitle,
        body: postBody
    }
    const options = {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options).then(res => res.json()).then(newPost => {
        postsArray.unshift(newPost)
        renderPosts()
        form.reset()
    })
})