function whenSortStops($taglist){
    //$taglist.each(function(){
        //$(this).addClass('bound-whenSortStops');
    //});
    //COMMON get landmarks to navigate dom =====================
    var $p = $taglist.first().parents('span');
    //get $select, wrappername, $theinput, theinput, $td in info object
    var myinfo = info($p);

    //GENERATING NEW VALUE ======================================
    var vals = new Array();
    $taglist.each(function(){
        var theid = $(this).attr('id');
        vals.push(theid);
    });
    var theval = vals.join(',');

    //COMMON VALUE UPDATING ======================================
    //get url, args, vars, and appname in geturl object
    var r_url = geturl(myinfo.$td);
    //update value in url variables
    var url_vars = update_vars(r_url.vars, theval);
    update_refresher(r_url.url, url_vars, myinfo.wrappername);
    //set hidden input and select widget to the new value
    myinfo.$theinput.val(theval);
    myinfo.$select.val(vals);
    //update back end via ajax
    setval(r_url.appname, myinfo.theinput);
}