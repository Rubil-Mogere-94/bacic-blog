document.addEventListener('DOMContentLoaded', main);

function main() {
    displayPosts();
    addNewPostListener();
    setupEditForm();
}

// Core Deliverable 1: Display all posts
function displayPosts() {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = '';
            
            posts.forEach(post => {
                const postItem = createPostElement(post);
                postList.appendChild(postItem);
            });
            
            //  Display first post details on page load
            if (posts.length > 0) {
                displayPostDetails(posts[0]);
            }
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-item';
    postDiv.dataset.id = post.id;
    
    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    
    const postImage = document.createElement('img');
    postImage.src = post.image || 'https://via.placeholder.com/300x150';
    postImage.alt = post.title;
    
    postDiv.appendChild(postImage);
    postDiv.appendChild(postTitle);
    
    // Core Deliverable 2: Handle post click
    postDiv.addEventListener('click', () => handlePostClick(post));
    
    return postDiv;
}

// Core Deliverable 2: Display post details when clicked
function handlePostClick(post) {
    displayPostDetails(post);
}

function displayPostDetails(post) {
    const postDetail = document.getElementById('post-detail');
    
    postDetail.innerHTML = `
        <h2>${post.title}</h2>
        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
        <p>${post.content}</p>
        <p><strong>Author:</strong> ${post.author}</p>
        <div class="post-actions">
            <button id="edit-post">Edit Post</button>
            <button id="delete-post">Delete Post</button>
        </div>
    `;
    
    //  Set up edit and delete buttons
    document.getElementById('edit-post').addEventListener('click', () => showEditForm(post));
    document.getElementById('delete-post').addEventListener('click', () => deletePost(post.id));
}

// Core Deliverable 3: Add new post
function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    
    form.addEventListener('submit', event => {
        event.preventDefault();
        
        const newPost = {
            title: form.title.value,
            content: form.content.value,
            author: form.author.value,
            image: form.image.value || null
        };
        
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(post => {
            // Add new post to the list
            const postList = document.getElementById('post-list');
            const postItem = createPostElement(post);
            postList.appendChild(postItem);
            
            // Clear the form
            form.reset();
            
            //  Display the new post details
            displayPostDetails(post);
        })
        .catch(error => console.error('Error creating post:', error));
    });
}

// edit post functionality
// Core Deliverable 4: Edit post
// This function sets up the edit form and handles the submission of the edited post.
// It listens for the form submission, sends a PATCH request to update the post,
// and updates the post in the list and details view accordingly.
// It also provides a cancel button to hide the edit form without saving changes.
// The function is called when the edit button is clicked on a post's details view.
// It uses the Fetch API to communicate with the backend server and update the post data.
// The edit form is initially hidden and is displayed when the user clicks the edit button.
function setupEditForm() {
    const editForm = document.getElementById('edit-post-form');
    const cancelButton = document.getElementById('cancel-edit');
    
    editForm.addEventListener('submit', event => {
        event.preventDefault();
        
        const updatedPost = {
            title: editForm['edit-title'].value,
            content: editForm['edit-content'].value,
            author: editForm['edit-author'].value,
            image: editForm['edit-image'].value || null
        };
        
        const postId = editForm['edit-id'].value;
        
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
        .then(response => response.json())
        .then(updatedPost => {
            // Update the post list         
            const postItem = document.querySelector(`.post-item[data-id="${postId}"]`);
            if (postItem) {
                postItem.querySelector('h3').textContent = updatedPost.title;
                const img = postItem.querySelector('img');
                if (updatedPost.image) {
                    img.src = updatedPost.image;
                }
            }
            
            // Update the displayed details
            displayPostDetails(updatedPost);
            
            // Hide the edit form
            editForm.classList.add('hidden');
        })
        .catch(error => console.error('Error updating post:', error));
    });
    
    cancelButton.addEventListener('click', () => {
        editForm.classList.add('hidden');
    });
}

function showEditForm(post) {
    const editForm = document.getElementById('edit-post-form');
    
    editForm['edit-id'].value = post.id;
    editForm['edit-title'].value = post.title;
    editForm['edit-content'].value = post.content;
    editForm['edit-author'].value = post.author;
    editForm['edit-image'].value = post.image || '';
    
    editForm.classList.remove('hidden');
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(() => {
            // Remove from the list
            const postItem = document.querySelector(`.post-item[data-id="${postId}"]`);
            if (postItem) {
                postItem.remove();
            }
            
            // Clear the details view
            const postDetail = document.getElementById('post-detail');
            postDetail.innerHTML = '<p>Select a post to view details</p>';
        })
        .catch(error => console.error('Error deleting post:', error));
    }
}