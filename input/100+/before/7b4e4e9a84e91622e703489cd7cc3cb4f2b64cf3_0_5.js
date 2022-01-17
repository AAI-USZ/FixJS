function initPage() {
	pr = getPostform($q(aib.qPostForm, doc));
	oeForm = $q('form[action*="paint"], form[name="oeform"]', doc);
	if(!pr.mail) {
		aib.getSage = function(post) {
			return false;
		};
	}
	$each($X('preceding-sibling::node()[preceding-sibling::*[descendant-or-self::*[' + (
		aib.fch ? 'self::div[@class="boardBanner"]' : 'self::div[@class="logo"]'
	) + ' or self::h1]]]', dForm), $del);
	if(aib.abu) {
		$del(dForm.nextElementSibling);
		$del(dForm.nextElementSibling);
	}
	if(TNum) {
		var onvis = function() {
				Favico.focused = true;
				if(Cfg['favIcoBlink'] && Favico.href) {
					clearInterval(Favico.delay);
					$$each($Q('link[rel="shortcut icon"]', doc.head), $del);
					doc.head.appendChild($new('link', {'href': Favico.href, 'rel': 'shortcut icon'}, null));
				}
				if(Cfg['updThread'] === 1) {
					setTimeout(function() {
						doc.title = docTitle;
					}, 200);
				}
			};
		if(!Cfg['rePageTitle']) {
			docTitle = doc.title;
		} else {
			docTitle = '/' + brd + ' - ' + pByNum[TNum].dTitle;
			doc.title = docTitle;
		}
		if(nav.Firefox > 10 || nav.Chrome) {
			doc.addEventListener(nav.visChange, function() {
				if(doc.mozHidden || doc.webkitHidden) {
					Favico.focused = false;
				} else {
					onvis();
				}
			});
			Favico.focused = !doc.mozHidden;
		} else {
			window.onblur = function() {
				Favico.focused = false;
			};
			window.onfocus = onvis;
			Favico.focused = false;
			$event(window, {'mousemove': function mouseMove() {
				Favico.focused = true;
				$revent(window, {'mousemove': mouseMove});
			}});
		}
		initThreadsUpdater();
		if(Cfg['updThread'] === 2 || Cfg['updThread'] === 3) {
			$after($c('DESU_thread', doc), $event($add(
				'<span id="DESU_getNewPosts">[<a href="#">' + Lng.getNewPosts[lCode] + '</a>]</span>'), {
				'click': function(e) {
					$pd(e);
					loadNewPosts(true, function() { infoNewPosts(null, 0); });
				}
			}));
		}
	} else {
		setTimeout(window.scrollTo, 20, 0, 0);
	}
	if(Cfg['updScript']) {
		checkForUpdates(false, function(html) {
			$alert(html, 'UpdAvail', false);
		});
	}
}