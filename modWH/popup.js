
// replace with chrome.storage.sync to share via Google Drive
var storage = chrome.storage.local;


function showMessage(text) {
	document.getElementById('content').style.display="none";
	var msg = document.getElementById('messageText');
	msg.innerHTML = text;
	msg.parentElement.removeAttribute("style");
}


function bindPageId(pageKey) {
	var x = {};
	x[pageKey] = false
	return function () {
		storage.set(x);
		activate();
	}
}


function activate() {
	chrome.tabs.insertCSS(null, {file: "modWH.css"});
	chrome.tabs.executeScript(null, {file: "modWH.js"});
}


function clear(pageId) {
	// Get a list of all the items on the current page that may have been added
	// to the storage area

	storage.remove(pageId);

	var comments = [];
	var things = document.querySelectorAll('tr[class=athing]');
	for (var i = 1; i < things.length; i++) {
		comments[i] = things[i].id;
	}

	// bulk removal is preferred over individual calls
	storage.remove(comments, function () {
		showMessage("Please refresh the page for changes to take effect.");
	});
}


function clearAll() {
	// empty all contents of the chrome storage area
	storage.clear( function () {
		showMessage("Please refresh the page for changes to take effect.");
	});
}


function init(tabs) {

	const ID_REGEX = /\d+$/;

	var tab = tabs[0];
	if (!tab.title.startsWith("Ask HN: Who is hiring?")) {
		showMessage("This doesn't appear to be a Who's Hiring page.");
		return;
	}

	var pageId = tab.url.match(ID_REGEX)[0];
	
	storage.get(pageId, function (items) {

		document.getElementById("activate_btn").addEventListener("click", 
				bindPageId(pageId)	, false);

		document.getElementById("clear_btn").addEventListener("click", 
			function () {
				clear(pageId)
			}, false);

		document.getElementById("clearall_btn").addEventListener("click", 
			clearAll, false);

	});
}

// Query allows access to the calling tab object
chrome.tabs.query({ active: true, currentWindow: true }, init);
