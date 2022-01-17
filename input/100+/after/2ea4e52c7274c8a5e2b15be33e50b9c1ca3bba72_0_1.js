function() {
		var t = this, el, f = document.forms[0], ed = tinyMCEPopup.editor,
			dom = tinyMCEPopup.dom, src, ta, regexS, regex, tex;

		document.dir = tinyMCEPopup.editor.getParam('directionality','');


		tinyMCEPopup.restoreSelection();
		el = ed.selection.getNode();

		if (el.nodeName != 'IMG')
			return;
 
		url = ed.dom.getAttrib(el, 'src');
		
		if (url != null && url.match(/^http(s)?:\/\/chart\.googleapis\.com/)) {
			ta = t.I('equation');

			// Based on code from  http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
			regexS = "[\\?&]" + 'chl' + "=([^&#]*)";
			regex = new RegExp(regexS);
			tex = regex.exec(url);
			if (tex == null) {
				return;
			}
			else {
				ta.value = decodeURIComponent(tex[1]);
				if (tinyMCE.isIE) {
					ta.focus();
				}
			}
		}


		return;

	}