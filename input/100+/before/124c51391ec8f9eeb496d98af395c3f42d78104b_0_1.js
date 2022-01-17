function(body, player) {
  return exports.replaceScript(body, function(full, script) {
      var flashvars = exports.stripFlashvars(script);
      if(!flashvars) return full;
      console.log(flashvars);
      var flvurl = flashvars.url_encoded_fmt_stream_map.url;
      flashvars.flvurl = 'https://ssl.nowall.be' + utils.encodeSymboUrl(flvurl);
      return template.render(player, flashvars);
  });
}