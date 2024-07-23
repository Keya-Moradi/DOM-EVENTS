// Select elements from the DOM
const likeButtonElement = document.querySelector('#like-button');
const dislikeButtonElement = document.querySelector('#dislike-button');
const commentButtonElement = document.querySelector('#comment-button');
const inputElement = document.querySelector('input');
const commentListElement = document.querySelector('ul');

// Initialize counts for likes and dislikes
const counts = {
    likes: 0,
    dislikes: 0
};

// Track the state of the user's actions
let userLiked = false;
let userDisliked = false;

// Function to handle like and dislike button clicks
const handleReaction = (event) => {
    const type = event.target.dataset.type; // Get the type of reaction (likes or dislikes)

    if (type === 'likes') {
        if (userLiked) {
            // If the user already liked, remove the like
            counts.likes--;
            likeButtonElement.textContent = `Like this post!`;
            userLiked = false;
        } else {
            // If the user disliked, remove the dislike first
            if (userDisliked) {
                counts.dislikes--;
                dislikeButtonElement.textContent = `Dislike this post!`;
                userDisliked = false;
            }
            // Add the like
            counts.likes++;
            likeButtonElement.textContent = `${counts.likes} beautiful peeps liked this post!`;
            userLiked = true;
        }
    } else if (type === 'dislikes') {
        if (userDisliked) {
            // If the user already disliked, remove the dislike
            counts.dislikes--;
            dislikeButtonElement.textContent = `Dislike this post!`;
            userDisliked = false;
        } else {
            // If the user liked, remove the like first
            if (userLiked) {
                counts.likes--;
                likeButtonElement.textContent = `Like this post!`;
                userLiked = false;
            }
            // Add the dislike
            counts.dislikes++;
            dislikeButtonElement.textContent = `${counts.dislikes} grumpy peeps disliked this post!`;
            userDisliked = true;
        }
    }
};

// Function to handle adding comments
const handleComments = () => {
    const commentText = inputElement.value; // Get the input value
    if (commentText !== '') { // Check if the input is not empty
        const commentElement = createCommentElement(commentText); // Create a new comment element
        commentListElement.appendChild(commentElement); // Add the comment to the comment list
        inputElement.value = ''; // Clear the input
    }
};

// Function to create a comment element with a delete button
const createCommentElement = (text) => {
    const commentElement = document.createElement('li'); // Create a new list item
    commentElement.textContent = text; // Set the comment text

    const deleteButton = document.createElement('button'); // Create a delete button
    deleteButton.textContent = 'Delete'; // Set the button text
    deleteButton.addEventListener('click', () => { // Add event listener to the delete button
        commentListElement.removeChild(commentElement); // Remove the comment when delete button is clicked
    });

    commentElement.appendChild(deleteButton); // Append the delete button to the comment element
    return commentElement; // Return the comment element
};

// Assign data-type attributes to the like and dislike buttons
likeButtonElement.dataset.type = 'likes';
dislikeButtonElement.dataset.type = 'dislikes';

// Add event listeners to the like and dislike buttons
likeButtonElement.addEventListener('click', handleReaction);
dislikeButtonElement.addEventListener('click', handleReaction);

// Add event listener to the comment button
commentButtonElement.addEventListener('click', handleComments);
