function(offset) {
    var files = $(this)[0].files,
        url = false;
    if (z.capabilities.fileAPI && files.length) {
        offset = offset || 0;
        var f = files[offset];
        if (typeof window.URL == 'object') {
            url = window.URL.createObjectURL(f);
        } else if (typeof window.webkitURL == 'object') {
            url = window.webkitURL.createObjectURL(f);
        } else if(typeof f.getAsDataURL == 'function') {
            url = f.getAsDataURL();
        }
    }
    return url;
}