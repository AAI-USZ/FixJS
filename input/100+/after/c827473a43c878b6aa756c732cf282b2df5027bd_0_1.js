function findNZBIdMatrix(elem) {
   var url = $(elem).attr('href');
   
   var hostname = window.location.href.substr(0, window.location.href.indexOf('/', 8));
   if (hostname.indexOf('nzbxxx') != -1) {
      url = url.replace('nzb-download.php', 'v1.1/download.php') + '&apikey=' + nzbxxx_apikey + '&username=' + nzbxxx_username;
       
      hostname = "http://api.nzbxxx.com";
   } else {
      // 0.5+ needs nzb-details not nzb-download in url
      url = url.replace('nzb-download', 'nzb-details');
   }
   
   if (url.indexOf(hostname) == -1) {
      url = hostname + url
   }
   return url;
}