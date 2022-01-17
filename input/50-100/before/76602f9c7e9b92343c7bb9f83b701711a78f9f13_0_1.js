function setActiveNav(){
    var path = window.location.pathname.split('/'),
        page = path[path.length-1].replace('.html','');

    $('nav li.active').removeClass('active');
    $('nav li a[href*=' + page + ']').parent().addClass('active');
}