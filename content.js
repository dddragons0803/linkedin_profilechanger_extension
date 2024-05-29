console.log("Content script running");

// Update this selector to match the actual class used on LinkedIn for profile pictures

// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeProfilePicture') {
        console.log('Changing profile picture to:', request.newImageUrl);
        const profilePics = document.querySelectorAll('.EntityPhoto-circle-3');
        profilePics.forEach(pic => {
            pic.src = request.newImageUrl;
        });
        sendResponse({status: 'Profile picture changed on page'});
    }
});
