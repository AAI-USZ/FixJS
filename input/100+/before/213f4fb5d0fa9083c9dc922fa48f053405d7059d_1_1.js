function(){
    if(getParameterByName('page') == 'gallery'){
        $("#main").load("gallery.htm");
    }
    if(getParameterByName('page') == 'masterplan'){
        $("#main").load("masterplan.htm");
    }
    if(getParameterByName('page') == 'plantas'){
        $("#main").load("plantas.htm");
    }
    if(getParameterByName('page') == 'tour'){
        $("#main").load("tour_virtual_jdm/2d.html");
    }
    if(getParameterByName('page') == 'map'){
        $("#main").load("map.htm");
    }
}