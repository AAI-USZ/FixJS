function(evt) {
    var target = evt.target;
    var id = target.id.replace('filter', '');
    
    $.getJSON('/REST/Building/categoryID/' + id + '.json?select=buildingID;longitude;latitude', function(data) {
        $.each(data.Building, function(key, value) {
            if($(target).is(':checked')) {
                markerArray[value.buildingID].display(true);
            }
            else {
                markerArray[value.buildingID].display(false);
            }       
        }); 
    });
}