function(e) {
		e.preventDefault();
		var ele = e.target;
		if (ele) {
			var permalink = ele.parentNode.parentNode.firstChild.firstChild;
			if (permalink) {
				// check if we've already viewed the source.. if so just reveal it instead of loading...
				var prevSib = ele.parentNode.parentNode.previousSibling;
				if (typeof(prevSib.querySelector) == 'undefined') prevSib = prevSib.previousSibling;
				var sourceDiv = prevSib.querySelector('.viewSource');
				if (sourceDiv) {
					sourceDiv.style.display = 'block';
				} else {
					var jsonURL = permalink.getAttribute('href');
					var sourceLink = 'comment';
					if (hasClass(permalink, 'comments')) {
						sourceLink = 'selftext';
					}
					if (jsonURL.indexOf('?context') != -1) {
						jsonURL = jsonURL.replace('?context=3','.json?');
					} else {
						jsonURL += '/.json';
					}
					modules['commentPreview'].viewSourceEle = ele;
					modules['commentPreview'].viewSourceLink = sourceLink;
					jsonURL = RESUtils.insertParam(jsonURL,'app','res');
					GM_xmlhttpRequest({
						method:	"GET",
						url:	jsonURL,
						onload:	function(response) {
							var thisResponse = JSON.parse(response.responseText);
							var userTextForm = document.createElement('div');
							addClass(userTextForm,'usertext-edit');
							addClass(userTextForm,'viewSource');
							if (modules['commentPreview'].viewSourceLink == 'comment') {
								var sourceText = thisResponse[1].data.children[0].data.body;
								userTextForm.innerHTML = '<div><textarea rows="1" cols="1" name="text">' + sourceText + '</textarea></div><div class="bottom-area"><div class="usertext-buttons"><button type="button" class="cancel">hide</button></div></div>';
							} else {
								var sourceText = thisResponse[0].data.children[0].data.selftext;
								userTextForm.innerHTML = '<div><textarea rows="1" cols="1" name="text">' + sourceText + '</textarea></div><div class="bottom-area"><div class="usertext-buttons"><button type="button" class="cancel">hide</button></div></div>';
							}
							var cancelButton = userTextForm.querySelector('.cancel');
							cancelButton.addEventListener('click', modules['commentPreview'].hideSource, false);
							var prevSib = modules['commentPreview'].viewSourceEle.parentNode.parentNode.previousSibling;
							if (typeof(prevSib.querySelector) == 'undefined') prevSib = prevSib.previousSibling;
							prevSib.appendChild(userTextForm);
						}
					});
				}
				
			}
		}
	}