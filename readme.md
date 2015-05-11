# modWH

modWH is a Chrome extension that adds some UI and session persistence into hacker news Who's Hiring pages by injecting a bit of javascript and CSS. When activated, the extension adds a "close" button to each top-level comment in the thread, and suppresses all replies. The extension uses the chrome.storage API to store preferences between sessions -- although the extension is written such that the user must reactivate it each time the page is refreshed.

modWH is released under the MIT license.