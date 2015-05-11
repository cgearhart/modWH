
// replace with chrome.storage.sync to share via Google Drive
var storage = chrome.storage.local;


function bindItem(elemId) {
	// JS closure rules are such that the callback must be produced outside of the
	// enclosing scope to ensure that the value and not the object reference is used
	var item = {};
	item[elemId] = false;
	return function () {
		storage.set(item);
		document.getElementById(elemId).classList.add("closed");
	}
}


(function() {

	const TBODY_SELECTOR = "body>center>table>tbody>tr:nth-child(3)>td>table:last-of-type>tbody";
	const IMG_SELECTOR = "tr>td>table>tbody>tr>td>img";
	const ITEM_SELECTOR = '.comhead a[href^=item]';
	const ID_REGEX = /\d+$/;

	var comment;
	var itemIds = [];
	var nodeIterator = document.createNodeIterator(
		
		document.querySelector(TBODY_SELECTOR),

		NodeFilter.SHOW_ELEMENT,

		{ acceptNode: function(node) {
			if (node.getAttribute('class') === "athing" && !node.hasAttribute("id"))
				return NodeFilter.FILTER_ACCEPT;
		  }
		},
		false
	);


	while ((comment = nodeIterator.nextNode())) {

		var itemLink = comment.querySelector(ITEM_SELECTOR);
		if ( !itemLink ) {
			continue;
		}

		var itemId = itemLink.href.match(ID_REGEX)[0];
		itemIds.push(itemId);
		comment.setAttribute("id", itemId);

		var imgTD = comment.querySelector(IMG_SELECTOR);
		if (imgTD["width"] > 0) {
			comment.classList.add('reply');  // hide and collapse replies
			continue;
		} else if (itemId && imgTD) {
			
			var td = imgTD.parentElement;
			td.setAttribute("class", "btn_cell");  // apply spacing to the table column

			var elem = document.createElement('a');
			elem.setAttribute('href', 'javascript:;')
			elem.innerHTML = "[ X ]";
			elem.addEventListener("click", bindItem(itemId), false);
			td.appendChild(elem);
		}
	}

	// look for items that have been hidden in previous sessions and re-hide them
	storage.get(itemIds, function (items) {
		for (var key in items) {
			document.getElementById(key).classList.add('closed');
		}
	});
})();
