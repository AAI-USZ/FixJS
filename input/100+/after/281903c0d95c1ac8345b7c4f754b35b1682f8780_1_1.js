function () {
  var us$ = function (fn) {
      fn();
    }, // defferd for dom-load
    domDfd = $.Deferred(), // deferd
    searchDataDfd, myNameDfd, domReady, //url match tags json
    tags = window.location.href.match(/^http.*\/([^\/]+)\/tags\.json(#.+)?$/), // url match my.name http://b.hatena.ne.jp/my.name
    myName = window.location.href.match(/^http:\/\/b\.hatena\.ne\.jp\/my\.name(\?chawan=.+)?$/);
  _(us$).extend({
    dom: domDfd,
    addStyle: function (css) {
      if (GM_addStyle) {
        GM_addStyle(css);
      } else {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    },
    log: function () {
      return (GM_log || console).apply(null, arguments);
    }
  });
  if (tags) {  //at  tags.json
    User.id = tags[1];
    searchDataDfd = Hatena.searchData();
    (myNameDfd = Hatena.myName()).done(function (json) {
      User.rkm = json.rkm;
      User.rks = json.rks
      User.login = true;
    });
    $(document).ready(function () {//dom ready
      var tagText = $('pre').text();
      $('body').empty();
      domDfd.resolve(searchDataDfd);
      $.when(myNameDfd, searchDataDfd).fail(function () {
        alert('not login');
        User.login = false;
      });
      us$.addStyle(TEXT.CSS);
      User.tags = JSON.parse(tagText);
    });
  } else if (myName && myName[1]) { // at my.name if id is selected
    var chawan = myName[1];
    User.id = chawan.match(/\?chawan=(\w+)/)[1];
    searchDataDfd = Hatena.searchData();
    $(document).ready(function () {//dom ready
      var Text = $('pre').text(), myNameObj = JSON.parse(Text);
      if (myNameObj.login && myNameObj.name === User.id) {
        User.rkm = myNameObj.rkm;
        User.rks = myNameObj.rks
        User.login = true;
        $('body').empty();
        domDfd.resolve(searchDataDfd);
      } else {
        domDfd.reject('not login');
      }
      us$.addStyle(TEXT.CSS);
    });
  } else if (myName) {// if id is not selected

  } else {
    //error
    domDfd.reject('environmental error');
  }
  document.title = '?Chawan';
  window.us$ = us$;
}