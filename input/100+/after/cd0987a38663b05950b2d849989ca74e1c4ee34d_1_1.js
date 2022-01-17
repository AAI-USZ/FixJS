function getSearchUrlBase(tree, noredirect) {
  // Figure out the right path separator to use with virtroot
  sep = virtroot[virtroot.length - 1] === '/' ? '' : '/';
  var url = virtroot + 'cgi-bin/search.cgi?tree=' + tree;
  var date = new Date ();

  url += "&request_time=" + date.getTime ();

  if (noredirect == true) {
    url += "&noredirect=1"
  }

  return url;
}