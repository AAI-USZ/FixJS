function(e){

    if(lastquery !== getQuery())
        hideZeroClick();

    if(options.dev)
        console.log(e.keyCode);

    var fn = 'qsearch()';
    if(e.keyCode == 40 || e.keyCode == 38)
        fn = 'qsearch(true)';

    clearTimeout(lasttime);
    lasttime = setTimeout(fn, 700);

    // instant search suggestions box onclick
    document.getElementsByClassName("gssb_c")[0].onclick = function(){
        if(options.dev)
            console.log("clicked")

        hideZeroClick();
        qsearch(true);
    };
}