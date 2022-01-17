function opencomposewindow(url) {
    // Window gets centered (more or less)
    var W = 1100;
    var H = 600;
    if(screen.left)
      var sl = screen.left;
    else
      var sl = 0;
    if(screen.top)
      var st = screen.top;
    else
      var st = 0;    
    var L = ( screen.width - W ) / 2 + sl;
    var T = ( screen.height - H ) / 2 + st - 50;
    T = (T<st?st:T);
    L = (L<sl?sl:L);
    var childwin = window.open(url,'','width='+W+',height='+H+',top='+T+',left='+L);
    // fix Chrome issue with moveTo method
    if (! $.browser.webkit) {
        childwin.moveTo(L,T);
    }
    childwin.focus();
    // Give the child window a name so we can close it later
    childwin.name = 'rc_compose_child';
    return childwin;
}