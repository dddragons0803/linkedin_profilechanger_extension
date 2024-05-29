// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("LinkedIn Profile Picture Changer extension installed.");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('linkedin.com/feed')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }, () => {
            if (chrome.runtime.lastError) {
                console.error('Script injection failed: ', chrome.runtime.lastError);
            } else {
                console.log('Content script injected.');
            }
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background script received message:', message);
    if (message.action === 'changeProfilePicture') {
        // Handle the profile picture change action if needed
        console.log('Changing profile picture to:', message.newImageUrl);
        sendResponse({status: 'done'});
    }
});

