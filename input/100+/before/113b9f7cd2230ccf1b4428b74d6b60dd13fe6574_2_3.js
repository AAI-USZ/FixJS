function getGroupName(txt) {
      var ret = txt.charAt(0).toUpperCase();

      ret = ret.replace(/[ÁÀ]/ig,"A");
      ret = ret.replace(/[ÉÈ]/ig,"E");
      ret = ret.replace(/[ÍÌ]/ig,"I");
      ret = ret.replace(/[ÓÒ]/ig,"O");
      ret = ret.replace(/[ÚÙ]/ig,"U");

      var code = ret.charCodeAt(0);
      if (code < 65 || code > 90) {
        ret = 'und';
      }

      return ret;
    }