function(editableNode) {
		var e = (editableNode.jquery) ? editableNode.get(0) : editableNode;

		// Not IE
		if (!jQuery.browser.msie) {
			var s = window.getSelection();
			// Safari
			if (s.setBaseAndExtent /*&& e> 0 */) {
				s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
			}
			// Firefox and Opera
			else {
				// workaround for bug # 42885
				if (window.opera
					&& e.innerHTML.substring(e.innerHTML.length - 4) == '<BR>') {
					e.innerHTML = e.innerHTML + '&#160;';
				}

				var r = document.createRange();
				r.selectNodeContents(e);
				s.removeAllRanges();
				s.addRange(r);
			}
		}
		// Some older browsers
		else if (document.getSelection) {
			var s = document.getSelection();
			var r = document.createRange();
			r.selectNodeContents(e);
			s.removeAllRanges();
			s.addRange(r);
		}
		// IE
		else if (document.selection) {
			var r = document.body.createTextRange();
			r.moveToElementText(e);
			r.select();
		}
	}