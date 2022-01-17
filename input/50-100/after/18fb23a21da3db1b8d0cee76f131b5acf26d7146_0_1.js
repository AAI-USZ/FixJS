function(full, script) {
      var flashvars = exports.stripFlashvars(script);
      if(!flashvars) return full;
      // var info = exports.getVideoInfo(body)
      console.log(flashvars);
      flashvars.flvurl = flashvars.url_encoded_fmt_stream_map.url;
      // flashvars.flvurl = 'https://ssl.nowall.be' + utils.encodeSymboUrl(flashvars.flvurl);
      flashvars.vid = vid;
      // small tb
      // flashvars.thumbnail = 'https://i3.ytimg.com/vi/' + vid + '/default.jpg';
      // middle tb
      flashvars.thumbnail = 'https://i3.ytimg.com/vi/' + vid + '/mqdefault.jpg';
      // large tb
      // flashvars.thumbnail = 'https://i3.ytimg.com/vi/' + vid + '/hqdefault.jpg';
      return template.render(player, flashvars);
  }