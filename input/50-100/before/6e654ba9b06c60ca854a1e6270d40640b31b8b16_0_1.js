function(url, serverPort) {
    if(url.indexOf('px!=' < 0) && url.match(/\/search?.*q=.*/)) {
      // 'https://ssl.nowall.be/search?hl=zh-CN&site=&source=hp&q=test&btnK=Google+%E6%90%9C%E7%B4%A2&px!=https:www.google.com'
      // fix google search
      url = url + '&px!=https:www.google.com'
    } else {
      // slideshare fix
      // https://ssl.nowall.be/roh-pdf-120712033122-phpapp02?px!=images.slidesharecdn.com.js?1342082037
      // url = url.replace(/(.*)\?px!=([^\?&]+)\.(js|css|xml|json)[\?|&]?(.*)/i, '$1.$3?px!=$2&$4')
      // facebook links
      // https://ssl.nowall.be/?px!=https:s-static.ak.facebook.comconnect/xd_arbiter.php?version=9#channel=f2c0522a4&origin=https%3A%2F%2Fssl.nowall.be&channel_path=%2F%3Fpx!%3Dpublic.slidesharecdn.comchannel.html%26fb_xd_fragment%23xd_sig%3Df12ae24d98%26
      url = url.replace(/(.*)\?px!=(.*?\.(?:com|net|org))(.*)\?(.*)/, '$1$3?$4&px!=$2')

      // linkedin link
      // https://ssl.nowall.be/finscn/https://ssl.nowall.be/in.js?px!=platform.linkedin.com
      // google api link
      // https://ssl.nowall.be/finscn/https://ssl.nowall.be/js/plusone.js?px!=apis.google.com
      url = url.replace(/(?:\/[^\?&]*)?\/https:\/\/(?:.*?)(\/.*)/, '$1')
    }
    return url;
}