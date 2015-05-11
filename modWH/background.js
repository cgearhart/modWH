

/* 
 *	Using declarativeContent doesn't require any explicit permissions. Using the 
 *	tabs permission would allow finer resolution control over which pages the 
 *	extension appears on; e.g., filtering on the page title could be done here
 *	before showing the pageAction instead of testing in the popup window.
 */
chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { hostEquals: "news.ycombinator.com" }
					})
				],
				actions: [ new chrome.declarativeContent.ShowPageAction() ]
			}
		]);
	});
});

