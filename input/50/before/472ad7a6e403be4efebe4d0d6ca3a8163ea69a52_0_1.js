function(e) {
    var url = $(this).attr('href');
    if(url.match('http')) return;
    e.preventDefault();
    loadURL(url);
}