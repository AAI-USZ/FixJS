function (body, contentType) {
  var replace = false;
  body = body.replace(/(\[\s*['"]_setAccount['"]\s*,\s*['"])(.+?)(['"]\s*\])/, function(full, pre, id, suff){
      replace = true;
      return pre + 'UA-22925186-1' + suff;
  }).replace(/(\[\s*['"]_setDomainName['"]\s*,\s*['"])(.+?)(['"]\s*\])/, '$1nowall.be$3');
  if(!replace && contentType == 'text/html') {
    body = body.replace(/<\/head>/, 
      "<script>var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-22925186-1']); _gaq.push(['_trackPageview']); (function() { if(window.self!=window.top) return; var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })(); </script></head>");
  }

  return body
}