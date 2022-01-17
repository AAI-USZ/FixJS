function stripTag(el) {
			if (HTMLArea.isIEBeforeIE9) {
				el.outerHTML = HTMLArea.util.htmlEncode(el.innerText);
			} else {
				var txt = document.createTextNode(HTMLArea.DOM.getInnerText(el));
				el.parentNode.insertBefore(txt,el);
				el.parentNode.removeChild(el);
			}
		}