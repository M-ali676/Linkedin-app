document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.getElementById('post-btn');
    const postInput = document.getElementById('post-input');
    const newsFeed = document.getElementById('news-feed');
    
    const POSTS_STORAGE_KEY = 'linkedInPosts';
    const DEFAULT_AUTHOR = 'M Ali';

    // Enable/Disable Post Button based on input
    postInput.addEventListener('input', () => {
        postBtn.disabled = postInput.value.trim() === '';
    });

    // 1. Load Posts from Local Storage
    function loadPosts() {
        // Get posts or initialize with a default example post
        let storedPosts = JSON.parse(localStorage.getItem(POSTS_STORAGE_KEY));
        
        if (!storedPosts || storedPosts.length === 0) {
            storedPosts = [{
                id: 0,
                author: 'LinkedIn Clone Team',
                content: 'Welcome to your custom LinkedIn Clone! You can create and save new posts using the box above.',
                timestamp: new Date().toISOString(),
                likes: 5
            }];
            localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(storedPosts));
        }

        newsFeed.innerHTML = ''; // Clear existing posts
        
        // Reverse to show newest posts first
        storedPosts.reverse().forEach(post => {
            const postElement = createPostElement(post);
            newsFeed.appendChild(postElement);
        });
    }

    // 2. Create HTML element for a single post
    function createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="=${post.author[0]}" alt="${post.author}">
                <div class="post-info">
                    <h4>${post.author}</h4>
                    <span>${new Date(post.timestamp).toLocaleString()}</span>
                </div>
            </div>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <button class="post-action-btn like-btn" data-id="${post.id}">
                    <i class="fas fa-thumbs-up"></i> 
                    <span class="like-count">${post.likes || 0}</span> Like
                </button>
                <button class="post-action-btn"><i class="fas fa-comment"></i> Comment</button>
                <button class="post-action-btn"><i class="fas fa-share"></i> Repost</button>
                <button class="post-action-btn"><i class="fas fa-paper-plane"></i> Send</button>
            </div>
        `;
        return postDiv;
    }

    // 3. Handle New Post Creation and Saving to Local Storage
    postBtn.addEventListener('click', () => {
        const content = postInput.value.trim();
        
        if (content) {
            const newPost = {
                id: Date.now(),
                author: DEFAULT_AUTHOR,
                content: content,
                timestamp: new Date().toISOString(),
                likes: 0
            };

            // Retrieve, Push, and Save
            const posts = JSON.parse(localStorage.getItem(POSTS_STORAGE_KEY)) || [];
            posts.push(newPost);
            localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));

            postInput.value = ''; // Clear input
            postBtn.disabled = true; // Disable button
            loadPosts(); // Reload feed
        }
    });
    
    // Initial load when the page is ready
    loadPosts();
});
