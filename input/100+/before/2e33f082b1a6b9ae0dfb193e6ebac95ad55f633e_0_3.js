function fillCategory(name) {
    $('#' + name + '_content').empty();
        
    if(localStorage[name] != null) {
        var list = $("<ul />");
   
        $.each(JSON.parse(localStorage[name]), function(key, building) {
            if(building!=null){
                var li = $('<li />').attr('id', building.id).html(building.name);
                li.addClass('button');
        
                li.click(function(event) {
                    if(name == 'favorites') {
                        mapDirect = event.target.id;
                    
                        window.location.href = "#map";    
                    }
                    else {
                        playMovie(building);
                    }
                });
                
                list.append(li);
            }
        });
        
        $('#' + name + '_content').html(list);
    }
}