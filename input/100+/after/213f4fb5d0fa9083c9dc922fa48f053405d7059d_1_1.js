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
    
    
    
    if(getParameterByName('page') == 'mp1'){
        $("#main").load("mpall/mp1.htm");
    }
    if(getParameterByName('page') == 'mp2'){
        $("#main").load("mpall/mp2.htm");
    }
    if(getParameterByName('page') == 'mp3'){
        $("#main").load("mpall/mp3.htm");
    }
    if(getParameterByName('page') == 'mp4'){
        $("#main").load("mpall/mp4.htm");
    }
    if(getParameterByName('page') == 'mp5'){
        $("#main").load("mpall/mp5.htm");
    }
    if(getParameterByName('page') == 'mp6'){
        $("#main").load("mpall/mp6.htm");
    }
    if(getParameterByName('page') == 'mp7'){
        $("#main").load("mpall/mp7.htm");
    }
}