function scriptCSS() {
	var p, x = '',
		gif = function(id, src) {
			x += id + ' { background: url(data:image/gif;base64,' + src + ') no-repeat center !important; }';
		},
		cont = function(id, src) {
			x += id + ':before { content: ""; padding: 0 16px 0 0; margin: 0 4px; background: url(' + src + ') no-repeat center; }';
		};

	// Settings window
	x += '#DESU_contentCfg > div { float: left; border-radius: 10px 10px 0 0; width: auto; min-width: 0; padding: 0; margin: 5px 20px; overflow: hidden; }\
		#DESU_cfgInfo { padding-left: 10px; }\
		#DESU_cfgInfo > span { display: inline-block; vertical-align: top; }\
		#DESU_cfgHead { padding: 4px; border-radius: 10px 10px 0 0; color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		#DESU_cfgHead:lang(en), #DESU_panel:lang(en) { background: linear-gradient(top, #4b90df, #3d77be 5px, #376cb0 7px, #295591 13px, rgba(0,0,0,0) 13px), linear-gradient(top, rgba(0,0,0,0) 12px, #183d77 13px, #1f4485 18px, #264c90 20px, #325f9e 25px); }\
		#DESU_cfgHead:lang(ru), #DESU_panel:lang(ru) { background: url("data:image/gif;base64,R0lGODlhAQAZAMQAABkqTSRDeRsxWBcoRh48axw4ZChOixs0Xi1WlihMhRkuUQwWJiBBcSpTkS9bmxAfNSdKgDJfoQ0YKRElQQ4bLRAjOgsWIg4fMQsVHgAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAQAZAEAFFWDETJghUAhUAM/iNElAHMpQXZIVAgA7"); }\
		#DESU_cfgHead:lang(de), #DESU_panel:lang(de) { background: #777; }\
		#DESU_cfgHead:lang(fr), #DESU_panel:lang(fr) { background: linear-gradient(top, #7b849b, #616b86 2px, #3a414f 13px, rgba(0,0,0,0) 13px), linear-gradient(top, rgba(0,0,0,0) 12px, #121212 13px, #1f2740 25px); }\
		.DESU_cfgUnvis { display: none; }\
		.DESU_cfgBody { width: 371px; min-height: 345px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif; }\
		.DESU_cfgBody input[type="text"] { width: auto; }\
		.DESU_cfgBody input[value=">"] { width: 20px; }\
		.DESU_blockInp { display: block; }\
		.DESU_cfgBody, #DESU_cfgBtns { border: 1px solid #183d77; border-top: none; }\
		.DESU_cfgBody:lang(de), #DESU_cfgBtns:lang(de) { border-color: #444; }\
		#DESU_cfgBtns { padding: 7px 2px 2px; }\
		#DESU_cfgBar { height: 25px; width: 100%; display: table; background-color: #1f2740; margin: 0; padding: 0; }\
		#DESU_cfgBar:lang(en) { background-color: #325f9e; }\
		#DESU_cfgBar:lang(ru) { background-color: #0c1626; }\
		#DESU_cfgBar:lang(de) { background-color: #777; }\
		#DESU_cfgBar > li { display: table-cell !important; float: none !important; min-width: 0; padding: 0 !important; box-shadow: none !important; border: none !important; border-radius: 4px 4px 0 0; opacity: 1; }\
		.DESU_cfgTab, .DESU_cfgTab_sel { padding: 4px 6px; border: 1px solid #183d77; border-radius: 4px 4px 0 0; font: bold 14px arial; text-align: center; cursor: default; }\
		.DESU_cfgTab:lang(de), .DESU_cfgTab_sel:lang(de) { border-color: #444; }\
		.DESU_cfgTab:lang(fr), .DESU_cfgTab_sel:lang(fr) { border-color: #121421; }\
		.DESU_cfgTab { background-color: rgba(0,0,0,.2); }\
		.DESU_cfgTab:lang(en), .DESU_cfgTab:lang(fr) { background: linear-gradient(top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%); }\
		.DESU_cfgTab:hover { background-color: rgba(99,99,99,.2); }\
		.DESU_cfgTab:hover:lang(en), .DESU_cfgTab:hover:lang(fr)  { background: linear-gradient(bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%); }\
		.DESU_cfgTab_sel { border-bottom: none; }\
		#DESU_spellPanel { float: right; }\
		#DESU_spellPanel > a { padding: 0 7px; text-align: center; }\
		#DESU_cfgWipe { display: table; padding-left: 25px; }\
		#DESU_cfgWipe > div { display: table-row; }\
		#DESU_cfgWipe > div > label { display: table-cell; }';

	// Main panel
	x += '#DESU_btnLogo { margin-right: 3px; }\
		#DESU_panel { height: 25px; z-index: 9999; border-radius: 15px 0 0 0; cursor: default;}\
		#DESU_panelBtns { display: inline-block; padding: 0 2px; margin: 0; height: 25px; border-left: 1px solid #8fbbed; }\
		#DESU_panelBtns:lang(ru), #DESU_panelInfo:lang(ru) { border-color: #79c; }\
		#DESU_panelBtns:lang(de), #DESU_panelInfo:lang(de) { border-color: #ccc; }\
		#DESU_panelBtns:lang(fr), #DESU_panelInfo:lang(fr) { border-color: #616b86; }\
		#DESU_panelBtns > li { margin: 0 1px; padding: 0; }\
		#DESU_panelBtns > li, #DESU_panelBtns > li > a, #DESU_btnLogo { display: inline-block; width: 25px; height: 25px; }\
		#DESU_panelBtns:lang(en) > li, #DESU_panelBtns:lang(fr) > li  { transition: all 0.3s ease; }\
		#DESU_panelBtns:lang(en) > li:hover, #DESU_panelBtns:lang(fr) > li:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }\
		#DESU_panelBtns:lang(ru) > li > a, #DESU_panelBtns:lang(de) > li > a { border-radius: 5px; }\
		#DESU_panelBtns:lang(ru) > li > a:hover { width: 21px; height: 21px; border: 2px solid #9be; }\
		#DESU_panelBtns:lang(de) > li > a:hover { width: 21px; height: 21px; border: 2px solid #444; }\
		#DESU_panelInfo { display: inline-block; vertical-align: top; padding: 0 6px; height: 25px; border-left: 1px solid #8fbbed; color: #fff; font: 18px serif; }';
	p = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkAQA';
	gif('#DESU_btnLogo', p + 'I5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=');
	gif('#DESU_btnSettings', p + 'JAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7');
	gif('#DESU_btnHidden', p + 'I5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=');
	gif('#DESU_btnFavor', p + 'IzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=');
	gif('#DESU_btnRefresh', p + 'JAjI+pe+AfHmRGLkuz3rzN+1HS2JWbhWlpVIXJ+roxSpr2jedOBIu0rKjxhEFgawcCqJBFZlPJIA6d0ZH01MtRCgA7');
	gif('#DESU_btnGoBack', p + 'IrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7');
	gif('#DESU_btnGoNext', p + 'IrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7');
	gif('#DESU_btnGoUp', p + 'IsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==');
	gif('#DESU_btnGoDown', p + 'ItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=');
	gif('#DESU_btnNewThr', p + 'IyjI+pG+APQYMsWsuy3rzeLy2g05XcGJqqgmJiS63yTHtgLaPTY8Np4uO9gj0YbqM7bgoAOw==');
	gif('#DESU_btnExpImg', p + 'I9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	gif('#DESU_btnMaskImg', p + 'JQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	if(aib.nul) {
		gif('#DESU_btnCatalog', p + 'I2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	}
	gif('#DESU_btnAudioOff', p + 'I7jI+pq+DO1psvQHOj3rxTik1dCIzmSZqfmGXIWlkiB6L2jedhPqOfCitVYolgKcUwyoQuSe3WwzV1kQIAOw==');
	gif('#DESU_btnAudioOn', p + 'JHjI+pq+AewJHs2WdoZLz7X11WRkEgNoHqimadOG7uAqOm+Y6atvb+D0TgfjHS6RIp8YQ1pbHRfA4n0eSTI7JqP8Wtahr0FAAAOw==');
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#DESU_btnUpdOn', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	gif('#DESU_btnUpdOff', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	gif('#DESU_btnUpdWarn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	// Post buttons
	x += '.DESU_postPanel, .DESU_postPanel_op, .DESU_postPanel_del { margin-left: 4px; }\
		.DESU_btnHide, .DESU_btnUnhide, .DESU_btnRep, .DESU_btnExpthr, .DESU_btnFav, .DESU_btnFavSel, .DESU_btnSage, .DESU_btnSrc { display: inline-block; margin: 0 4px -2px 0 !important; cursor: pointer; ';
	if(!Cfg['postBtnsTxt']) {
		x += 'padding: 0 14px 14px 0; }';
		p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM';
		gif('.DESU_btnHide', p + '8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
		gif('.DESU_btnUnhide', p + '5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
		gif('.DESU_btnRep', p + '4SLLcS2MNQGsUMQRRwdLbAI5kpn1kKHUWdk3AcDFmOqKcJ5AOq0srX0QWpBAlIo3MNoDInlAZIQEAOw==');
		gif('.DESU_btnExpthr', p + '7SLLcS6MNACKLIQjKgcjCkI2DOAbYuHlnKFHWUl5dnKpfm2vd7iyUXywEk1gmnYrMlEEyUZCSdFoiJAAAOw==');
		gif('.DESU_btnFav', p + '5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
		gif('.DESU_btnFavSel', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
		gif('.DESU_btnSage', 'R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AQAIZVI55duDvFIKy2vluoJfrD4Yi5lWRwmhCAQA7');
		gif('.DESU_btnSrc', p + '9SLLcS0MMQMesUoQg6PKbtFnDaI0a53VAml2ARcVSFC0WY6ecyy+hFajnWDVssyQtB5NhTs1mYAAhWa2EBAA7');
	} else {
		x += 'color: ' + $getStyle($t('a', doc), 'color') + '; font-size:14px; }\
			.DESU_btnHide:after { content: "×"; }\
			.DESU_btnUnhide:after { content: "+"; }\
			.DESU_btnRep:after { content: "R"; }\
			.DESU_btnExpthr:after { content: "E"; }\
			.DESU_btnFav:after { content: "F"; }\
			.DESU_btnFavSel:after { content: "[F]"; }\
			.DESU_btnSage:after { content: "Sage!"; }\
			.DESU_btnSrc:after { content: "[Sauce]"; }';
	}

	// Search images buttons
	cont('.DESU_srcGoogle', '//google.ru/favicon.ico');
	cont('.DESU_srcTineye', '//tineye.com/favicon.ico');
	cont('.DESU_srcIqdb', '//iqdb.org/favicon.ico');
	cont('.DESU_srcSaucenao', '//saucenao.com/favicon.ico');

	// Posts counter
	if(TNum) x += '.DESU_thread { counter-reset: i 1; }\
		.DESU_postPanel:after { counter-increment: i 1; content: counter(i, decimal); vertical-align: 1px; color: #4f7942; font: italic bold 13px serif; cursor: default; }\
		.DESU_postPanel_del:after { content: "' + Lng.deleted[lCode] + '"; color: #727579; font: italic bold 13px serif; cursor: default; }';

	// text format buttons
	x += '#DESU_txtPanel { display: block; height: 23px; font-weight: bold; cursor: pointer; }\
		#DESU_txtPanel > span:empty { display: inline-block; width: 27px; height: 23px }\
		#DESU_txtPanel:lang(en) { display: none; }\
		#DESU_txtPanel:lang(ru) { float: right; }';
	p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
	gif('#DESU_btnBold:empty', p + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
	gif('#DESU_btnItalic:empty', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
	gif('#DESU_btnUnder:empty', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
	gif('#DESU_btnStrike:empty', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
	gif('#DESU_btnSpoil:empty', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
	gif('#DESU_btnCode:empty', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
	gif('#DESU_btnQuote:empty', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');

	// Show/close animation
	if(nav.Anim) {
		x += '@keyframes DESU_aOpen {\
				0% { transform: translateY(-1500px); }\
				40% { transform: translateY(30px); }\
				70% { transform: translateY(-10px); }\
				100% { transform: translateY(0); }\
			}\
			@keyframes DESU_aClose {\
				0% { transform: translateY(0); }\
				20% { transform: translateY(20px); }\
				100% { transform: translateY(-4000px); }\
			}\
			@keyframes DESU_aBlink {\
				0%, 100% { transform: translateX(0); }\
				10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\
				20%, 40%, 60%, 80% { transform: translateX(10px); }\
			}\
			@keyframes DESU_cfgOpen { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@keyframes DESU_cfgClose { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@keyframes DESU_pOpenTL { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pOpenBL { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pOpenTR { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pOpenBR { from { transform: translate(50%,50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pCloseTL { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pCloseBL { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pCloseTR { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@keyframes DESU_pCloseBR { to { transform: translate(50%,50%) scale(0); opacity: 0; } }\
			.DESU_pView { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }\
			.DESU_aOpen { animation: DESU_aOpen .7s ease-out both; }\
			.DESU_aClose { animation: DESU_aClose .7s ease-in both; }\
			.DESU_aBlink { animation: DESU_aBlink .7s ease-in-out both; }\
			.DESU_cfgOpen { animation: DESU_cfgOpen .2s ease-out backwards; }\
			.DESU_cfgClose { animation: DESU_cfgClose .2s ease-in both; }';
	}

	// Embedders
	cont('.DESU_ytLink', '//youtube.com/favicon.ico');
	x += '.DESU_preImg > img, .DESU_fullImg { display: block; margin: ' + (aib.krau ? 0 : '2px 10px') + '; border: none; outline: none; cursor: pointer; }\
		.DESU_fullImg { float: left; }\
		.DESU_mp3, .DESU_ytObj { margin: 5px 20px; cursor: pointer; }';

	// Other
	cont('.DESU_wait', 'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7');
	x += '.DESU_alertBtn { display: inline-block; vertical-align: top; font-size: 150%; color: green; cursor: pointer; }\
		.DESU_alertMsg { display: inline-block; margin-top: .25em; }\
		#DESU_alertBox { position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
		#DESU_alertBox > div { float: right; clear: both; width: auto; min-width: 0pt; padding: 10px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
		.DESU_content textarea { display: block; margin: 2px 0; font: 12px courier new; }\
		.DESU_content { text-align: left; }\
		#DESU_contentFav, #DESU_contentHid { font-size: 16px; padding: 10px; border: 1px solid gray; }\
		.DESU_contData { margin: 2px 0; }\
		.DESU_contData > :first-child { float: none !important; }\
		.DESU_contData > div > a { text-decoration: none; }\
		.DESU_contHead > a { color: inherit; font-weight: bold; }\
		.DESU_favPCount { float: right; margin: 0 5px 0 15px; font: bold 16px serif; }\
		.DESU_favPCount span { color: #4f7942; }\
		#DESU_iframe { display: none; width: 0px; height: 0px; border: none; }\
		.DESU_omitted { color: grey; font-style: italic; }\
		.DESU_postNote { color: inherit; font: italic bold 12px serif; }\
		#DESU_qarea { float: none; clear: left; width: 100%; padding: 3px 0 3px 3px; margin: 2px 0; }\
		.DESU_refHid { text-decoration: line-through !important; }\
		.DESU_refMap { margin: 10px 4px 4px 4px; font-size: 70%; font-style: italic; }\
		.DESU_refMap:before { content: "' + Lng.replies[lCode] + ' "; }\
		.DESU_refMap > a { text-decoration: none; }\
		#DESU_sageBtn { margin-right: 7px; cursor: pointer; }\
		#DESU_select { padding: 0 !important; margin: 0 !important; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey;}\
		#DESU_select a { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; }\
		#DESU_select a:hover { background-color: #222; color: #fff; }\
		.DESU_selected { ' + (nav.Opera ? 'border-left: 4px solid red; border-right: 4px solid red; }' : 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#DESU_txtResizer { display: inline-block !important; float: none !important; padding: 5px; margin: 0 0 -' + (nav.Opera ? 8 : nav.WebKit ? 2 : 3) + 'px -12px; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		.DESU_viewed { color: #888 !important; }\
		.DESU_aBtn { text-decoration: none !important; outline: none; }\
		.DESU_pPost { font-weight: bold; }\
		.DESU_info { padding: 3px 6px !important; }\
		.DESU_pView { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey; }\
		.DESU_cFullImg { position: fixed; z-index: 9999; border: 1px solid black; }\
		.DESU_archive:after { content: ""; padding: 0 16px 3px 0; margin: 0 4px; background: url(data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==) no-repeat center; }\
		small[id^="rfmap"], div[id^="preview"], div[id^="pstprev"] { display: none !important; }\
		textarea { resize: none !important; -moz-tab-size: 4; -o-tab-size: 4; tab-size: 4; }';
	if(aib.kus) {
		x += '#newposts_get, .extrabtns, .ui-resizable-handle { display: none !important; }\
			.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }';
	}
	if(aib.nul) {
		x += '#postform nobr, .replieslist, #captcha_status, .DESU_thread span[style="float: right;"] { display: none !important; }\
			.ui-wrapper { position: static !important; margin: 0 !important; overflow: visible !important; }\
			.ui-resizable { display: inline !important; }\
			.voiceplay { float: none; }';
	} else if(aib.hana) {
		x += '#hideinfotd, .reply_, .delete > img, .popup { display: none; }\
			.delete { background: none; }\
			.delete_checkbox { position: static !important; }';
	} else if(aib.abu) {
		x += '.ABU_refmap, .postpanel, #CommentToolbar, a[onclick^="window.open"],\
			#usrFlds + tbody > tr:first-child, #postform > div:nth-child(2),\
			#DESU_parea > hr, hr[style="clear: left;"] { display: none !important; }\
			#DESU_txtPanel { font-size: 16px !important; }\
			.DESU_aBtn { transition: none; }';
	} else if(aib.tiny) {
		x += 'form, form table { margin: 0; }\
			.post-hover { display: none !important; }';
	} else if(aib._7ch) {
		x += '.reply { background-color: ' + $getStyle(doc.body, 'background-color') + '; }';
	} else if(aib.gazo) {
		x += '.DESU_content, .DESU_cfgBody { font-family: arial; }\
			.ftbl { width: auto; margin: 0; }\
			.reply { background: #f0e0d6; }';
	} else if(aib.krau) {
		x += 'img[id^="translate_button"], img[src$="button-expand.gif"], img[src$="button-close.gif"]' + (liteMode ? ', div[id^="disclaimer"]' : '') + ' { display: none !important; }\
			div[id^="Wz"] { z-index: 10000 !important; }\
			div[id^="DESU_hidThr_"] { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; }';
	} else if(aib._420) {
		x += '.opqrbtn, .qrbtn, .ignorebtn, .hidethread, noscript { display: none; }\
			div[id^="DESU_hidThr_"] { margin: 1em 0; }';
	} else if(aib.brit) {
		x += '.DESU_postPanel, .DESU_postPanel_op { float: left; margin-top: 0.45em; }\
			a + .threadlinktext { position: relative; top: 17px; }\
			.postthreadlinks, .pagethreadlinks, .pwpostblock { display: none; }\
			.DESU_btnSrc { padding: 0px 10px 10px 0px !important; background-size: cover !important; }';
	} else if(aib.ylil) {
		x += '.threadbuttons, .expandall, .tooltip { display: none !important; }';
	} else if(aib.fch) {
		x += '.DESU_spoiler { color: #000; background-color: #000; }';
	}

	if(nav.Firefox && nav.Firefox < 4) {
		x = x.replace(/(border-radius|box-shadow|background-size)/g, '-moz-$1');
	}

	$append(doc.head, [
		$new('style', {
			'id': 'DESU_css',
			'type': 'text/css',
			'text': x.replace(/(linear-gradient|transition|keyframes|transform|animation)/g, nav.cssFix + '$1')
		}, null),
		$new('style', {'id': 'DESU_dynCss', 'type': 'text/css'}, null)
	]);
	x = gif = cont = null;
	updateCSS();
	if(nav.WebKit) {		$disp(dForm);
	}
}
