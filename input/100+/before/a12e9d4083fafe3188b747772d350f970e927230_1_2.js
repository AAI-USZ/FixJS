function fill(name) {
    var list = $("<ul />");
    
    $.each(JSON.parse(localStorage[name]), function(key, val) {
        $.getJSON('/REST/Building/buildingID/' + val +'.json?select=name;buildingID', function(data) {            
            var li = $('<li />').attr('id', data.Building[0].buildingID).html(data.Building[0].name); 
            li.addClass('button');
            list.append(li); 
            
            li.click(function(event) {
                mapDirect = event.target.id;
                
                window.location.href = "#map";
            });
            
            list.append(li);
        });
    });
    
    $('#' + name + '_content').html(list);
}