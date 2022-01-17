function(keyName) {
    var isIE7, ret, userKeyName, localStorage, key, del, storageSafari3;

    // namespace keyname
    keyName = this._normalizeKeyName(keyName);
    userKeyName = this._userKeyName(keyName);

    // look into recently written values
    if (this._written) { ret = this._written[userKeyName]; }

    // attempt to read from localStorage
    isIE7 = SC.browser.isIE &&
        SC.browser.compare(SC.browser.engineVersion, '7') === 0;

    if(isIE7) {
      localStorage=document.body;
      try{
        localStorage.load("SC.UserDefaults");
      }catch(e){
        SC.Logger.error("Couldn't load userDefaults in IE7: "+e.description);
      }
    }else if(this.HTML5DB_noLocalStorage){
      storageSafari3 = this._safari3DB;
    }else{
      localStorage = window.localStorage ;
      if (!localStorage && window.globalStorage) {
        localStorage = window.globalStorage[window.location.hostname];
      }
    }
    if (localStorage || storageSafari3) {
      key=["SC.UserDefaults",userKeyName].join('-at-');
      if(isIE7) {
        ret=localStorage.getAttribute(key.replace(/\W/gi, ''));
      } else if(storageSafari3) {
        ret = this.dataHash[key];
      } else {
        ret = localStorage[key];
      }
      if (!SC.none(ret)) {
        try { ret = SC.json.decode(ret); }
        catch(ex) {}
      }
    }

    // if not found in localStorage, try to notify delegate
    del = this.delegate ;
    if (del && del.userDefaultsNeedsDefault) {
      ret = del.userDefaultsNeedsDefault(this, keyName, userKeyName);
    }

    // if not found in localStorage or delegate, try to find in defaults
    if ((ret===undefined) && this._defaults) {
      ret = this._defaults[userKeyName] || this._defaults[keyName];
    }

    return ret ;
  }