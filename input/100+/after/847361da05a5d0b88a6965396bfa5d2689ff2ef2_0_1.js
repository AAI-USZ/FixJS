function() {
	var keyboard = {};
	var th = '-ๅ/_ภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ%+๑๒๓๔ู฿๕๖๗๘๙๐"ฎฑธํ๊ณฯญฐ,ฅฤฆฏโฌ็๋ษศซ.()ฉฮฺ์?ฒฬฦ';
	var en = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
	var swap = function(txt, from, to) {
		var chr, pos, newTxt = '';
		for (var i in txt) {
			chr = txt.charAt(i);
			pos = from.indexOf(chr);
			if (pos !== -1) {
				newTxt += to.charAt(pos);
			} else {
				newTxt += chr;
			}
		}
		return newTxt;
	}
	keyboard.toThai = function(txt) {
		return swap(txt, en, th);
	};
	keyboard.toEng = function(txt) {
		return swap(txt, th, en);
	};
	return keyboard;
}