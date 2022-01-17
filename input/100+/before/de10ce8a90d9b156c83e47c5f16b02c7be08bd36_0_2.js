function() {
  var LCS, addCounter, addLearnedTags, addOtherBookmarkedTags, addReason, addScore, auto, autoTag, exactMatch, getConfigAsync, getImageTag, getMyBookmarkedTag, getMyTagLink, getOthersBookmarkedTagList, getParam, getSuggestAsync, identical, imgTagLink, imgTagList, include, mt, myTagLink, onTagList, onTagSrc, outerTagList, partialMatch, reason, showResult, strcmp, suggestedTag, tagLCS, _ref, _ref2;

  getParam = function(config) {
    /*
        {
            limit,#サジェストするタグの最大数
            #類似文字列判定用パラメータ
            minTag,#処理対象にする画像と他の人のタグの長さの下限
            minOuter,#対象とする他の人がブックマークしているタグの頻度の下限
            maxIncludeTagRate,#短い側のタグが含まれている長い側のタグの文字数が短い側の何倍かの上限
            #LCS用パラメータ
            minLCS,#最長共通部分文字列(LCS)の下限
            minLCSRateLong,#長い側のタグに占める共通部分文字列の割合の下限
            minLCSRateShort,#短い側のタグに占める共通部分文字列の割合の下限
            maxLCSTagRateLong,#LCSが含まれている長い側のタグの文字数がLCSの何倍かの上限
            maxLCSTagRateShort,#LCSが含まれている短い側のタグの文字数がLCSの何倍かの上限
        }
    */    if (config.suggest === 'strict') {
      return {
        limit: 7,
        minTag: 1,
        minOuter: 2,
        maxIncludeTagRate: 8,
        minLCS: 3,
        minLCSRateLong: 0.7,
        minLCSRateShort: 0.7,
        maxLCSTagRateLong: 6,
        maxLCSTagRateShort: 2
      };
    } else {
      return {
        limit: 10,
        minTag: 1,
        minOuter: 1,
        maxIncludeTagRate: 12,
        minLCS: 3,
        minLCSRateLong: 0.7,
        minLCSRateShort: 0.7,
        maxLCSTagRateLong: 6,
        maxLCSTagRateShort: 2
      };
    }
  };

  addScore = function(hash, key, weight) {
    if (key === 'pixivTouch' || key === 'pixivMobile') return;
    if (key in hash) {
      return hash[key] += weight;
    } else {
      return hash[key] = 1;
    }
  };

  LCS = function(a, b) {
    var i, j, match, sizea, sizeb, table;
    sizea = a.length + 1;
    sizeb = b.length + 1;
    table = new Array(sizea);
    for (i = 0; 0 <= sizea ? i < sizea : i > sizea; 0 <= sizea ? i++ : i--) {
      table[i] = new Array(sizeb);
    }
    for (i = 0; 0 <= sizea ? i < sizea : i > sizea; 0 <= sizea ? i++ : i--) {
      for (j = 0; 0 <= sizeb ? j < sizeb : j > sizeb; 0 <= sizeb ? j++ : j--) {
        table[i][j] = 0;
      }
    }
    for (i = 1; 1 <= sizea ? i < sizea : i > sizea; 1 <= sizea ? i++ : i--) {
      for (j = 1; 1 <= sizeb ? j < sizeb : j > sizeb; 1 <= sizeb ? j++ : j--) {
        match = a[i - 1] === b[j - 1] ? 1 : 0;
        table[i][j] = Math.max(table[i - 1][j - 1] + match, table[i - 1][j], table[i][j - 1]);
      }
    }
    return table[a.length][b.length];
  };

  strcmp = function(a, b) {
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
    return 0;
  };

  getMyTagLink = function() {
    var i, myTagLink, myTagSrc, tagName, _i, _len;
    myTagLink = {};
    myTagSrc = $('.tagCloud:eq(0) a');
    if (myTagSrc.length < 1) return;
    for (_i = 0, _len = myTagSrc.length; _i < _len; _i++) {
      i = myTagSrc[_i];
      tagName = i.childNodes[0].textContent;
      myTagLink[tagName] = i;
    }
    return myTagLink;
  };

  getImageTag = function() {
    var i, imgTagLink, imgTagList, imgTagSrc, imgTagTable, _i, _len;
    imgTagList = {};
    imgTagLink = {};
    imgTagTable = $('.bookmark_recommend_tag');
    if (imgTagTable.length !== 1) {
      imgTagSrc = imgTagTable.eq(0).find('a');
      for (_i = 0, _len = imgTagSrc.length; _i < _len; _i++) {
        i = imgTagSrc[_i];
        imgTagList[i.text] = true;
        imgTagLink[i.text] = i;
      }
    }
    return {
      imgTagList: imgTagList,
      imgTagLink: imgTagLink
    };
  };

  getMyBookmarkedTag = function() {
    var i, onTagList, onTagSrc, _i, _len;
    onTagSrc = $('#input_tag').val().trim().split(/\s+|　+/);
    onTagList = {};
    for (_i = 0, _len = onTagSrc.length; _i < _len; _i++) {
      i = onTagSrc[_i];
      if (i !== '') onTagList[i] = true;
    }
    return {
      onTagSrc: onTagSrc,
      onTagList: onTagList
    };
  };

  getOthersBookmarkedTagList = function() {
    var html, i, ot, outerTagList, outerTagSrc, url, xhr, _i, _len;
    if (document.URL.match('illust')) {
      url = "http://www.pixiv.net/bookmark_detail.php?illust_id=" + (document.URL.match('illust_id=([0-9]+)')[1]);
    } else {
      url = "http://www.pixiv.net/novel/bookmark_detail.php?id=" + (document.URL.match('id=([0-9]+)')[1]);
    }
    xhr = $.ajax({
      url: url,
      async: false
    });
    html = $(xhr.responseText);
    outerTagSrc = html.find('.link_purple.linkStyle a');
    outerTagList = {};
    for (_i = 0, _len = outerTagSrc.length; _i < _len; _i++) {
      i = outerTagSrc[_i];
      ot = i.text;
      if (ot !== 'B' && ot !== 'pixivTouch' && ot !== 'pixivMobile') {
        addScore(outerTagList, ot, 1);
      }
    }
    return outerTagList;
  };

  include = function(a, b) {
    var match;
    if (a.length < b.length) {
      match = b.match(new RegExp(a.replace(/\W/g, '\\$&'), 'i'));
    } else {
      match = a.match(new RegExp(b.replace(/\W/g, '\\$&'), 'i'));
    }
    if (match != null) {
      return true;
    } else {
      return false;
    }
  };

  identical = function(imgTagLink, myTagLink) {
    var it, mt, ret;
    ret = [];
    for (it in imgTagLink) {
      for (mt in myTagLink) {
        if (it === mt) ret.push(it);
      }
    }
    console.log('Matched Tag', ret);
    return ret;
  };

  getConfigAsync = function() {
    var dfd;
    dfd = $.Deferred();
    chrome.extension.sendRequest({
      type: 'get'
    }, function(response) {
      return dfd.resolve(response);
    });
    return dfd.promise();
  };

  getSuggestAsync = function(config, keylist) {
    var dfd;
    if (config.learning === 'enable') {
      dfd = $.Deferred();
      chrome.extension.sendRequest({
        type: 'suggest',
        source: keylist
      }, function(response) {
        return dfd.resolve(response);
      });
      return dfd.promise();
    } else {
      return [];
    }
  };

  addCounter = function(keylist) {
    var counter;
    counter = function() {
      var bookmarked, onTagSrc;
      onTagSrc = getMyBookmarkedTag().onTagSrc;
      bookmarked = onTagSrc;
      return chrome.extension.sendRequest({
        type: 'train',
        source: keylist,
        target: bookmarked
      }, function(response) {});
    };
    $('.btn_type03').click(counter);
    return $('.btn_type01').click(counter);
  };

  partialMatch = function(param) {
    var it, lcs, maxlen, minlen, mt, _results;
    _results = [];
    for (mt in myTagLink) {
      if (mt in autoTag) continue;
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (it in imgTagList) {
          minlen = Math.min(mt.length, it.length);
          maxlen = Math.max(mt.length, it.length);
          if (it.length < param.minTag) continue;
          if (include(it, mt) && param.maxIncludeTagRate * minlen >= maxlen) {
            addScore(suggestedTag, mt, 2);
            addReason(reason, mt, "" + (chrome.i18n.getMessage('include')) + ": " + it);
            _results2.push(console.log('Partially Matched Tag', it, mt));
          } else {
            lcs = LCS(mt, it);
            if (lcs >= param.minLCS && lcs >= param.minLCSRateShort * minlen && lcs >= param.minLCSRateLong * maxlen) {
              addScore(suggestedTag, mt, 1);
              addReason(reason, mt, "類似: " + it);
              _results2.push(console.log('Lexically Similar Tag', it, mt));
            } else if (lcs > 0 && param.maxLCSTagRateShort * lcs >= minlen && param.maxLCSTagRateLong * lcs >= maxlen) {
              _results2.push(addScore(tagLCS, mt, lcs));
            } else {
              _results2.push(void 0);
            }
          }
        }
        return _results2;
      })());
    }
    return _results;
  };

  exactMatch = function(config) {
    var it, ot, _i, _len, _ref, _results;
    if (onTagSrc[0] === '') {
      _ref = identical(imgTagLink, myTagLink);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        it = _ref[_i];
        if (config.auto_select === 'on') {
          if (!(it in onTagList)) {
            auto += "pixiv.tag.toggle('" + (encodeURI(it)) + "');";
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
        _results.push(addReason(reason, ot, "ブックマーク済み: " + ot));
      }
      return _results;
    }
  };

  addOtherBookmarkedTags = function(param) {
    var ot, _results;
    _results = [];
    for (ot in outerTagList) {
      if (outerTagList[ot] >= param.minOuter) {
        _results.push(imgTagList[ot] = true);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  addLearnedTags = function(tags) {
    var it, lcs, s, z, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = tags.length; _i < _len; _i++) {
      s = tags[_i];
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (z in myTagLink) {
          if (s[0].match(new RegExp("^" + z + "$", 'i')) && !(z in autoTag)) {
            addScore(suggestedTag, z, 1);
            addScore(suggestedTag, z, 1);
            addReason(reason, z, "" + (chrome.i18n.getMessage('learn')) + ": " + s[2]);
            lcs = 0;
            for (it in imgTagList) {
              lcs = Math.max(LCS(z, it), lcs);
            }
            _results2.push(addScore(tagLCS, z, lcs));
          } else {
            _results2.push(void 0);
          }
        }
        return _results2;
      })());
    }
    return _results;
  };

  showResult = function(resultTag, config, param) {
    var a, addToggle, div, i, imgTagTable, li, rt, suggest, text, _i, _len;
    resultTag.sort(function(a, b) {
      if (a.count !== b.count) {
        return b.count - a.count;
      } else if (tagLCS[a.key] !== tagLCS[b.key]) {
        return tagLCS[b.key] - tagLCS[a.key];
      } else {
        return strcmp(a, b);
      }
    });
    div = $('<div>');
    div.attr('class', 'bookmark_recommend_tag');
    suggest = $('<ul>');
    suggest.attr('class', 'tagCloud');
    text = $('<span>');
    text.text(chrome.i18n.getMessage('suggest'));
    div.append(text);
    div.append($('<br>'));
    for (_i = 0, _len = resultTag.length; _i < _len; _i++) {
      i = resultTag[_i];
      if (param.limit <= 0) break;
      param.limit--;
      rt = i.key;
      li = $('<li>');
      a = $('<a>');
      a.addClass('tag');
      li.attr('class', 'level' + Math.max(7 - i.count, 1));
      a.attr('href', 'javascript:void(0);');
      if (rt in onTagList) a.toggleClass('on');
      if (rt in reason) a.attr('title', reason[rt].join());
      a.text(rt);
      li.append(a);
      suggest.append(li);
      addToggle = function(trigger, target, tag) {
        if (tag == null) tag = '';
        return trigger.click(function() {
          target.toggleClass('on');
          if (tag !== '') {
            return location.href = "javascript:void(function(){pixiv.tag.toggle('" + (encodeURI(tag)) + "')})();";
          }
        });
      };
      addToggle(a, a, rt);
      addToggle($(myTagLink[i.key]), a);
      if (rt in imgTagLink) addToggle($(imgTagLink[i.key]), a);
    }
    div.append(suggest);
    imgTagTable = $('.bookmark_recommend_tag').eq(0);
    if (config.position === 'under') {
      return imgTagTable.after(div);
    } else {
      return imgTagTable.before(div);
    }
  };

  addReason = function(hash, key, string) {
    if (key in hash) {
      return hash[key].push(string);
    } else {
      return hash[key] = [string];
    }
  };

  suggestedTag = {};

  auto = '';

  autoTag = {};

  reason = {};

  myTagLink = getMyTagLink();

  _ref = getImageTag(), imgTagList = _ref.imgTagList, imgTagLink = _ref.imgTagLink;

  _ref2 = getMyBookmarkedTag(), onTagSrc = _ref2.onTagSrc, onTagList = _ref2.onTagList;

  outerTagList = getOthersBookmarkedTagList();

  tagLCS = {};

  for (mt in myTagLink) {
    addScore(tagLCS, mt, 1);
  }

  console.log('Image Tag', imgTagList);

  console.log('Bookmarked Tag', onTagList);

  console.log('Other Users\' Tag', outerTagList);

  getConfigAsync().done(function(config) {
    var key, keylist, param;
    param = getParam(config);
    addOtherBookmarkedTags(param);
    exactMatch(config);
    partialMatch(param);
    keylist = (function() {
      var _results;
      _results = [];
      for (key in imgTagList) {
        _results.push(key);
      }
      return _results;
    })();
    if (config.learning === 'enable') addCounter(keylist);
    return $.when(getSuggestAsync(config, keylist)).done(function(response) {
      var resultTag, t;
      console.log('Learned Tag', response);
      addLearnedTags(response);
      resultTag = (function() {
        var _results;
        _results = [];
        for (t in suggestedTag) {
          _results.push({
            key: t,
            count: suggestedTag[t]
          });
        }
        return _results;
      })();
      if (resultTag.length >= 1) return showResult(resultTag, config, param);
    });
  });

}