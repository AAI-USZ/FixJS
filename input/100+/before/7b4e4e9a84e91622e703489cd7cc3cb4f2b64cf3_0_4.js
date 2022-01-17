function getNavigator() {
	var ua = window.navigator.userAgent;
	nav.Firefox = +(ua.match(/mozilla.*? rv:(\d+)/i) || [,0])[1];
	nav.Opera = +(ua.match(/opera(?:.*version)?[ \/]([\d.]+)/i) || [,0])[1];
	nav.WebKit = +(ua.match(/WebKit\/(\d+)/i) || [,0])[1];
	nav.Safari = nav.WebKit && !/chrome/i.test(ua);
	nav.isGM = nav.Firefox && typeof GM_setValue === 'function';
	nav.isScript = nav.Opera && !!scriptStorage;
	nav.isLocal = window.localStorage && typeof localStorage === 'object';
	nav.isSession = window.sessionStorage && (sessionStorage.test = 1) === 1;
	nav.isCookie = !nav.isGM && !nav.isScript && !nav.isLocal;
	nav.isGlobal = nav.isGM || nav.isScript;
	nav.cssFix =
		nav.WebKit ? '-webkit-' :
		nav.Opera ? '-o-' :
		nav.Firefox < 16 ? '-moz-' : '';
	if(nav.Firefox > 4 || nav.WebKit || nav.Opera >= 12) {
		nav.Anim = true;
		nav.animName =
			nav.WebKit ? 'webkitAnimationName' :
			nav.Opera ? 'OAnimationName' :
			nav.Firefox < 16 ? 'MozAnimationName' :
			'animationName';
		nav.animEnd =
			nav.WebKit ? 'webkitAnimationEnd' :
			nav.Opera ? 'oAnimationEnd' :
			'animationend';
		nav.animEvent = function(el, Fn) {
			el.addEventListener(nav.animEnd, function aEvent() {
				this.removeEventListener(nav.animEnd, aEvent, false);
				Fn(this);
				Fn = null;
			}, false);
		}
	}
	nav.visChange = nav.Chrome ? 'webkitvisibilitychange' : 'mozvisibilitychange';
	try {
		try {
			new Blob([new Uint8Array(0)]);
			nav.toBlob = function(arr) {
				return new Blob(arr);
			};
		} catch(e) {
			if(!window.MozBlobBuilder && !window.WebKitBlobBuilder) {
				throw null;
			}
			nav.toBlob = function(arr) {
				var i, j, len, len_, out, el,
					bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
				for(i = 0, len = arr.length; i < len; i++) {
					el = arr[i]
					if(el instanceof Uint8Array) {
						if(el.length !== el.buffer.byteLength) {
							out = new Uint8Array(len_ = el.length);
							for(j = 0; j < len_; j++) {
								out[j] = el[j];
							}
							bb.append(out.buffer);
						} else {
							bb.append(el.buffer);
						}
					} else {
						bb.append(el);
					}
				}
				return bb.getBlob();
			};
		}
		nav.isBlob = true;
	} catch(e) { nav.isBlob = false; }
	nav.isH5Rep = nav.isBlob && !aib.nul && !aib.tiny;
	nav.insAfter = nav.Firefox && nav.Firefox < 8 ?
		function(el, html) {
			$after(el, $add(html));
		} :
		function(el, html) {
			el.insertAdjacentHTML('afterend', html);
		};
	nav.insBefore = nav.Firefox && nav.Firefox < 8 ?
		function(el, html) {
			$before(el, $add(html));
		} :
		function(el, html) {
			el.insertAdjacentHTML('beforebegin', html);
		};
	nav.forEach = nav.Opera || (nav.Firefox && nav.Firefox < 4) ?
		function(obj, Fn) {
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) {
					Fn.call(obj, i);
				}
			}
		} :
		function(obj, Fn) {
			Object.keys(obj).forEach(Fn, obj);
		};
	nav.fixLink = nav.Safari ?
		function(url) {
			return url[1] === '/' ? 'http:' + url :
				url[0] === '/' ? 'http://' + aib.host + url :
				url;
		} :
		function(url) {
			return url;
		};
	if(nav.WebKit) {
		window.URL = window.webkitURL;
	}
	nav.postMsg = nav.WebKit || nav.Opera ? addContentScript : eval;
}