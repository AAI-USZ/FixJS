function tabHandler(ed, e) {
				var x, i, f, el, v;

				function find(d) {
					el = DOM.select(':input:enabled,*[tabindex]:not(iframe)');

					function canSelectRecursive(e) {
						return e.nodeName==="BODY" || (e.type != 'hidden' &&
							!(e.style.display == "none") &&
							!(e.style.visibility == "hidden") && canSelectRecursive(e.parentNode));
					}
					function canSelectInOldIe(el) {
						return el.attributes["tabIndex"].specified || el.nodeName == "INPUT" || el.nodeName == "TEXTAREA";
					}
					function isOldIe() {
						return tinymce.isIE6 || tinymce.isIE7;
					}
					function canSelect(el) {
						return ((!isOldIe() || canSelectInOldIe(el))) && el.getAttribute("tabindex") != '-1' && canSelectRecursive(el);
					}

					each(el, function(e, i) {
						if (e.id == ed.id) {
							x = i;
							return false;
						}
					});
					if (d > 0) {
						for (i = x + 1; i < el.length; i++) {
							if (canSelect(el[i]))
								return el[i];
						}
					} else {
						for (i = x - 1; i >= 0; i--) {
							if (canSelect(el[i]))
								return el[i];
						}
					}

					return null;
				}

				if (e.keyCode === 9) {
					v = explode(ed.getParam('tab_focus', ed.getParam('tabfocus_elements', ':prev,:next')));

					if (v.length == 1) {
						v[1] = v[0];
						v[0] = ':prev';
					}

					// Find element to focus
					if (e.shiftKey) {
						if (v[0] == ':prev')
							el = find(-1);
						else
							el = DOM.get(v[0]);
					} else {
						if (v[1] == ':next')
							el = find(1);
						else
							el = DOM.get(v[1]);
					}

					if (el) {
						if (el.id && (ed = tinymce.get(el.id || el.name)))
							ed.focus();
						else
							window.setTimeout(function() {
								if (!tinymce.isWebKit)
									window.focus();
								el.focus();
							}, 10);

						return Event.cancel(e);
					}
				}
			}