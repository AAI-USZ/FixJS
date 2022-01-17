function fillLocal(name) {
    var list = $("<ul />");
        
    $.each(JSON.parse(localStorage[name]), function(key, building) {
        var li = $('<li />').attr('id', building.id).html(building.name);
        li.addClass('button');

        li.click(function(event) {
            mapDirect = event.target.id;
            
            window.location.href = "#map";
        });
        
        list.append(li);
    });
    
    $('#' + name + '_content').html(list);
}