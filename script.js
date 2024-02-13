// Function to simulate typing effect
function typeText(element, text, index) {
    if (index < text.length) {
        // Get the current text content
        var currentText = element.innerHTML;
        // Add the next letter to the current text content
        element.innerHTML = currentText + text.charAt(index);
        // Increment the index for the next letter
        index++;
        // Call the function recursively after a delay
        setTimeout(function() {
            typeText(element, text, index);
        }, 50); // Adjust the typing speed by changing the delay (milliseconds)
    }
}

// Function to check if an element is in the viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the card body elements
    var cardBodies = document.querySelectorAll('.card-body p, .card-body ul li');

    // Object to keep track of typing state for each card
    var typingStates = {};

    // Function to handle the scrolling event
    function handleScroll() {
        // Loop through each card body element
        cardBodies.forEach(function(cardBody) {
            // Check if the card body is in the viewport
            if (isInViewport(cardBody)) {
                // Get the card ID
                var cardId = cardBody.closest('.card').id;
                // Check if typing is already in progress for this card
                if (!typingStates[cardId]) {
                    // Get the text content of the paragraph or list items
                    var text = cardBody.innerHTML;
                    // Clear the paragraph or list item content
                    cardBody.innerHTML = '';
                    // Start typing effect for this paragraph or list items
                    typeText(cardBody, text, 0);
                    // Update typing state for this card
                    typingStates[cardId] = true;
                }
            }
        });
    }

    // Add a scroll event listener to the window
    window.addEventListener('scroll', handleScroll);

    // Call the handleScroll function initially to check for elements in the viewport
    handleScroll();
});
