function(url){
    var re = new RegExp('//', 'g');
    return url.replace(re, '/');
}