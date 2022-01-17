function() {
  var redirects = {};
  var threads = 0;

  // リダイレクトを記録しておく
  chrome.webRequest.onBeforeRedirect.addListener(function(detail) {
    redirects[detail.url] = detail.redirectUrl;
  }, {
    urls: [
      "http://*/*",
      "https://*/*",
    ],
  }, []);

  // 暇そうなときにキャッシュ削除
  setInterval(function() {
    if (threads == 0) {
      redirects = {};
    }
  }, 60 * 1000);

  return function getFinalUrl(url) {
    var self = this;
    var ret = new Deferred();

    // キャッシュにあればすぐに返す
    if (redirects[url]) {
      setTimeout(function() {
        ret.callback(redirects[url]);
      }, 0, {});
      return ret;
    }

    // URLにリクエスト送って調べる
    threads++;
    request(url, {
      method: 'HEAD'
    }).addBoth(function() {
      threads--;
      if (redirects[url]) {
        ret.callback(redirects[url]);
      } else {
        ret.callback(url);
      }
    });
    return ret;
  };
}