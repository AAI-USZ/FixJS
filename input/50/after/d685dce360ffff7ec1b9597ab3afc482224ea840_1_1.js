function(url) {
    if(url.indexOf('px!=' < 0) && url.match(/\/search?.*q=.*/)) {
      // 'https://ssl.nowall.be/search?hl=zh-CN&site=&source=hp&q=test&btnK=Google+%E6%90%9C%E7%B4%A2&px!=https:www.google.com'
      // fix google search
      url = url + '&px!=https:www.google.com'
    } else {
      // slideshare fix
      // https://ssl.nowall.be/roh-pdf-120712033122-phpapp02?px!=images.slidesharecdn.com.js?1342082037
      url = url.replace(/(.*)\?px!=([^\?&]+)\.(js|css|xml|json)[\?|&]?(.*)/i, '$1.$3?px!=$2&$4')
    }
    return url;
}