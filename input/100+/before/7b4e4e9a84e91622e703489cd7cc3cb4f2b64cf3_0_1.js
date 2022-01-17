function getCfgPosts() {
	return $New('div', {'class': 'DESU_cfgUnvis', 'id': 'DESU_cfgPosts'}, [
		optSel('updThread', false, null),
		$New('label', null, [
			inpTxt('updThrDelay', 4, null),
			$txt(Lng.cfg['updThrDelay'][lCode])
		]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$if(nav.Firefox, lBox('favIcoBlink', true, null)),
			$if(nav.WebKit, lBox('desktNotif', true, function() {
				if(Cfg['desktNotif']) {
					window.webkitNotifications.requestPermission();
				}
			}))
		]),
		optSel('expandPosts', true, null),
		optSel('expandImgs', true, null),
		$if(nav.isBlob, lBox('preLoadImgs', true, null)),
		$if(aib.rJpeg && nav.isBlob, $New('div', {'style': 'padding-left: 25px;'}, [
			lBox('findRarJPEG', true, null),
			lBox('showGIFs', true, null),
			lBox('noImgSpoil', true, null)
		])),
		lBox('postBtnsTxt', true, null),
		lBox('imgSrcBtns', true, null),
		lBox('noSpoilers', true, updateCSS),
		lBox('noPostNames', true, updateCSS),
		lBox('noPostScrl', true, updateCSS),
		$New('div', null, [
			lBox('keybNavig', false, null),
			$new('a', {'text': '?', 'href': '#', 'class': 'DESU_aBtn'}, {'click': function(e) {
				$pd(e);
				$alert(Lng.keyNavHelp[lCode], 'HelpKNav', false);
			}})
		]),
		lBox('correctTime', true, dateTime.toggleSettings),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('timeOffset', 3, null),
				$txt(Lng.cfg['timeOffset'][lCode])
			]),
			$New('div', null, [
				inpTxt('timePattern', 30, null),
				$txt(' '),
				$new('a', {'text': Lng.cfg['timePattern'][lCode], 'href': '#', 'class': 'DESU_aBtn'}, {
					'click': function(e) {
						$pd(e);
						$alert('"s" - second (one digit),\n"i" - minute (one digit),\n"h" - hour (one digit),\n"d" - day (one digit),\n"w" - week (string)\n"n" - month (one digit),\n"m" - month (string),\n"y" - year (one digit),\n"-" - any symbol\n"+" - any symbol except digits\n"?" - previous char may not be\n\nExamples:\n0chan.ru: "w+yyyy+m+dd+hh+ii+ss"\niichan.ru, 2ch.so: "w+dd+m+yyyy+hh+ii+ss"\ndobrochan.ru: "dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?"\n410chan.org: "dd+nn+yyyy++w++hh+ii+ss"\n4chan.org: "nn+dd+yy+w+hh+ii-?s?s?"\n4chon.net: "nn+dd+yy++w++hh+ii+ss"\nkrautchan.net: "yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?"', 'HelpTRep', false);
					}
				})
			])
		])
	]);
}