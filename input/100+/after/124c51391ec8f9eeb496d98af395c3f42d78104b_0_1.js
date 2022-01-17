function(body, player, vid) {
  return exports.replaceScript(body, function(full, script) {
      var flashvars = exports.stripFlashvars(script);
      if(!flashvars) return full;
      console.log(flashvars);
      var flvurl = flashvars.url_encoded_fmt_stream_map.url;
      flashvars.flvurl = 'https://ssl.nowall.be' + utils.encodeSymboUrl(flvurl);
      flashvars.vid = vid;
      flashvars.thumbnail = 'https://i3.ytimg.com/vi/' + vid + '/default.jpg';
      return template.render(player, flashvars);
  });
}