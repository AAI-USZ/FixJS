function(dontSetEditor) {
		var winW, winH, headerH, footerH, accountH, tabsBarH, findBarH, cMCSS;

		// Determin width & height available
		window.innerWidth  ? winW = window.innerWidth  : winW = document.body.clientWidth;
		window.innerHeight ? winH = window.innerHeight : winH = document.body.clientHeight;

		// Apply sizes to various elements of the page
		headerH = 40, footerH = 30, accountH = 50, tabsBarH = 21, findBarH = 28;
		this.header.style.width = this.tabsBar.style.width = this.findBar.style.width = winW + "px";
		this.files.style.width = this.accountLogin.style.width = this.editor.style.left = this.filesW + "px";
		this.account.style.height = this.accountH + "px";
		this.fmLock.style.marginLeft = (this.filesW-27) + "px";
		this.filesFrame.style.height = (winH-headerH-accountH-footerH) + "px";

		// If we need to set the editor sizes
		if (!dontSetEditor) {
			this.editor.style.width = ICEcoder.content.style.width = (winW-this.filesW) + "px";
			ICEcoder.content.style.height = (winH-headerH-footerH-tabsBarH-findBarH) + "px";

			// Resize the CodeMirror instances to match the window size
			cMCSS = ICEcoder.content.contentWindow.document.styleSheets[2];
			cMCSS.rules ? strCSS = 'rules' : strCSS = 'cssRules';
			for(var i=0;i<cMCSS[strCSS].length;i++) {
				if(cMCSS[strCSS][i].selectorText==".CodeMirror-scroll") {
					cMCSS[strCSS][i].style['height'] = ICEcoder.content.style.height;
				}
			}

		}
	}