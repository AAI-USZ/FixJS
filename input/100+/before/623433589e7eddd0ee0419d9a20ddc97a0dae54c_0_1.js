function(){
    var k;
    k = new Keyboard();
    k.dict = k.ipa_full;
    k.organize();
    document.body.appendChild(k.html);
    $(k.html).hide();
    k.setBoxListener();
    k.setButtonListeners();
    k.setHotKeys();
    return k;
  }