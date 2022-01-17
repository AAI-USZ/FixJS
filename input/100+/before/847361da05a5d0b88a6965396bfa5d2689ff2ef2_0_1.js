function() {
  var keyboard = {};
  var thChr = '-ๅ/_ภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ%+๑๒๓๔ู฿๕๖๗๘๙๐"ฎฑธํ๊ณฯญฐ,ฅฤฆฏโฌ็๋ษศซ.()ฉฮฺ์?ฒฬฦ';
  var enChr = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
  keyboard.toThai = function(txt) {
    var newTxt = '';
    for (var i in txt) {
      newTxt += thChr.charAt(enChr.indexOf(txt.charAt(i)));
    }
    return newTxt;
  };
  keyboard.toEng = function(txt) {
    var newTxt = '';
    for (var i in txt) {
      newTxt += enChr.charAt(thChr.indexOf(txt.charAt(i)));
    }
    return newTxt;
  };
  return keyboard;
}