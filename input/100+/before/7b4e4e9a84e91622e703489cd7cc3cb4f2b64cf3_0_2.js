function prepareCFeatures() {
	addContentScript(
		'function DESU_removeSel() {\
			var el = document.getElementById("DESU_select");\
			if(el) {\
				el.parentNode.removeChild(el);\
			}\
		}\
		function DESU_delSelection(e) {\
			if(e.relatedTarget && !document.evaluate("ancestor-or-self::div[@id=\'DESU_select\']", e.relatedTarget, null, 3, null).booleanValue) {\
				DESU_removeSel();\
			}\
		}\
		function DESU_btnOut(e) {\
			clearTimeout(e.target.DESU_overDelay);\
			DESU_delSelection(e);\
		}\
		function DESU_btnOver(el, data) {\
			el.DESU_overDelay = setTimeout(function(msg) {\
				window.postMessage(msg, "*");\
			}, ' + Cfg['linksOver'] + ', data);\
		}\
		function DESU_hideOver(el) {\
			DESU_btnOver(el, "A" + el.parentNode.getAttribute("info"));\
		}\
		function DESU_imgSOver(el) {\
			DESU_btnOver(el, "L" + el.getAttribute("desu-id"));\
		}\
		function DESU_expandOver(el) {\
			DESU_btnOver(el, "B" + el.parentNode.getAttribute("info"));\
		}\
		function DESU_hideClick(el) {\
			window.postMessage("D" + el.parentNode.getAttribute("info"), "*");\
		}\
		function DESU_qReplyClick(el) {\
			window.postMessage("F" + el.parentNode.getAttribute("info"), "*");\
		}\
		function DESU_qReplyOver(el) {\
			window.postMessage("C" + el.parentNode.getAttribute("info"), "*");\
		}\
		function DESU_expandClick(el) {\
			window.postMessage("E" + el.parentNode.getAttribute("info"), "*");\
		}\
		function DESU_favorClick(el) {\
			window.postMessage("G" + el.parentNode.getAttribute("info"), "*");\
		}\
		function DESU_sageClick(el) {\
			window.postMessage("H" + el.parentNode.getAttribute("info"), "*");\
		}\
		function DESU_cImgSearch(e, name) {\
			e.preventDefault();\
			window.postMessage("_" + name + ";" + e.target.getAttribute("desu-url"), "*");\
			DESU_removeSel();\
		}'
	);

	window.addEventListener('message', function(e) {
		var id = e.data[0],
			data = e.data.substring(1);
		if(id === "A") {
			selectPostHider(pByNum[+data]);
		} else if(id === "B") {
			selectExpandThread(pByNum[+data]);
		} else if(id === "C") {
			quotetxt = $txtSelect();
		} else if(id === "D") {
			togglePostVisib(pByNum[+data]);
		} else if(id === "E") {
			loadThread(pByNum[+data], 1, null);
		} else if(id === "F") {
			showQuickReply(pByNum[+data]);
		} else if(id === "G") {
			toggleFavorites(
				pByNum[+data],
				$c('DESU_btnFav', pByNum[+data]) || $c('DESU_btnFavSel', pByNum[+data])
			);
		} else if(id === "H") {
			addSpell('#sage');
		} else if(id === 'I') {
			data = data.split('|');
			id = doc.getElementsByName(data[0])[0];
			$del(id.nextSibling);
			$c('DESU_content', doc).style.overflowY = 'scroll';
			id.style.height = (+data[1] + Math.sqrt(0.6 * data[1]) + 55) + 'px';
		} else if(id === 'J') {
			data = data.split('$#$');
			checkUpload(data[0], data[1]);
			$id('DESU_iframe').src = 'about:blank';
		} else if(id === 'L') {
			selectImgSearch($q('.DESU_btnSrc[desu-id="' + data + '"]', dForm));
		}
	}, false);

	if(!nav.isBlob) {
		return;
	}
	addContentScript('(function() {\
		"use strict";\
		window.addEventListener("message", function(e) {\
			var id = e.data[0],\
				data = e.data.substring(1);\
			if(id === "K") {\
				var mReqs = data === "all" ? 4 : 1, i = mReqs, rjw' +
				(Cfg['findRarJPEG'] ? '= []; while(i--) rjw.push(new Worker("' +
					window.URL.createObjectURL(nav.toBlob(['self.onmessage = ' + String(parsePostImg)]))
				+ '"));' : ';') +
				'preloadImages(data, mReqs, rjw);\
				return;\
			}\
		});\
		var $x = function(path, root) {\
				return document.evaluate(path, root, null, 8, null).singleNodeValue;\
			},\
			toBlob = ' + String(nav.toBlob) + ',\
			getPostImages = (function() { return ' + String(getPostImages) + '; })(),\
			getPicWrap = ' + String(aib.getPicWrap) + ';\
		function preloadImages(pNum, mReqs, rjw) {\
			var len, el, cReq = 0, i = 0, arr = [],\
				bwrk = mReqs === 4 ? [0, 0, 0, 0] : [0],\
				loadFunc = function(idx) {\
					if(idx >= arr.length) {\
						if(cReq === 0) {\
							mReqs = cReq = i = arr = loadFunc = null;\
						}\
						return;\
					}\
					var xhr, eImg = ' + !!Cfg['noImgSpoil'] + ',\
						a = arr[idx],\
						url = a.href;\
					if(/\.gif$/i.test(url)) {\
						eImg = ' + !!Cfg['showGIFs'] + ';\
					} else if(!/\.(?:jpe?g|png)$/i.test(url)) {\
						loadFunc(i++);\
						return;\
					}\
					if(cReq === mReqs) {\
						setTimeout(loadFunc, 500, idx);\
						return;\
					}\
					cReq++;\
					xhr = new XMLHttpRequest();\
					xhr.open("GET", url, true);\
					xhr.responseType = "arraybuffer";\
					xhr.onload = function() {\
						if(this.status == 200) {\
							var href = a.href = window.' + (nav.WebKit ? 'webkit' : '') +
								'URL.createObjectURL(toBlob([this.response]));\
							if(eImg) {\
								a.getElementsByTagName("img")[0].src = href;\
							}' + (Cfg['findRarJPEG'] ? 'parseRJ(a);' : '') +
							'cReq--; loadFunc(i++); a = eImg = null;\
						}\
					};\
					xhr.send(null);\
				}' + (Cfg['findRarJPEG'] ? ',\
				parseRJ = function(link) {\
					var wI = bwrk.indexOf(0), w;\
					if(wI === -1) {\
						setTimeout(parseRJ, 500, link);\
						return;\
					}\
					w = rjw[wI];\
					bwrk[wI] = 1;\
					w.onmessage = function(e) {\
						if(e.data) {\
							getPicWrap(link).querySelector(\'' + aib.qImages + '\').className += " DESU_archive";\
						}\
						bwrk[wI] = 0;\
						link = wI = null;\
					};\
					w.onerror = function(e) {\
						console.error("RARJPEG ERROR, line: " + e.lineno + " - " + e.message);\
						bwrk[wI] = 0;\
						link = wI = null;\
					};\
					w.postMessage(link.href);\
				};' : ';') +
			'el = getPostImages(pNum === "all" ? document : document.querySelector("[desu-post=\'" + pNum + "\']"));\
			for(i = 0, len = el.length; i < len; i++) {\
				arr.push($x("ancestor::a[1]", el[i]));\
			}\
			for(i = 0; i < mReqs; i++) {\
				loadFunc(i);\
			}\
		}})()'
	);
}