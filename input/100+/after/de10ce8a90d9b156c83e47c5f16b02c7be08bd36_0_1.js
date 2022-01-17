function(config) {
    var it, ot, _i, _len, _ref, _results;
    if (onTagSrc[0] === '') {
      _ref = identical(imgTagLink, myTagLink);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        it = _ref[_i];
        if (config.auto_select === 'on') {
          if (!(it in onTagList)) {
            auto += "pixiv.tag.toggle('" + (encodeURI(escapeQuote(it))) + "');";
          }
          autoTag[it] = true;
        } else {
          addScore(suggestedTag, it, 1);
          addScore(suggestedTag, it, 1);
          addReason(reason, it, "" + (chrome.i18n.getMessage('match')) + ": " + it);
        }
      }
      return location.href = "javascript:void(function(){" + auto + "})();";
    } else {
      _results = [];
      for (ot in onTagList) {
        addScore(suggestedTag, ot, 1);
        addScore(suggestedTag, ot, 1);
        _results.push(addReason(reason, ot, "" + (chrome.i18n.getMessage('bookmarked')) + ": " + ot));
      }
      return _results;
    }
  }