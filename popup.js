console.log('Popup Script loaded');
document.getElementById('uploadButton').addEventListener('click', () => {
    console.log('Sending message to content script');
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newImageUrl = e.target.result;

            // Send message to content script to change profile picture
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'changeProfilePicture',
                    newImageUrl: newImageUrl
                }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error:', chrome.runtime.lastError);
                    } else {
                        console.log('Response:', response);
                    }
                });
            });
        };
        reader.readAsDataURL(file);
    }
});
