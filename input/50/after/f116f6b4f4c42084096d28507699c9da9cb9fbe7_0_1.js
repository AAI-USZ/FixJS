function(url, filename) {
    url = url.replace("vip.xunlei.com/download", "vip.xunlei.com/"+encodeURIComponent(filename));
    url = url.replace(/&n=\w+/, "&n=0");
    return url;
  }