function(e) {
    var url = $(this).attr('href');
    if(!url || url == '#' || url.match('http')) return;
    e.preventDefault();
    loadURL(url);
}