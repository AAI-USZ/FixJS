function addPointsOfInterestToMap(id) {
    rand = Math.round(Math.random()*1000);
    url = 'http://www.userpage.fu-berlin.de/andrez/kml/'+id+'.kml'+"?"+rand;
    console.log(url);
    var georssLayer = new google.maps.KmlLayer(url, {preserveViewport: true});
    
    georssLayer.setMap(map);
    
    google.maps.event.addListener(georssLayer, 'click', function(kmlEvent) {
    	var html = kmlEvent.featureData.description;
    	var poi = $(html).find('a').attr('href');
    	var name = kmlEvent.featureData.name;
    	triggerTwittersearch(poi, name);
    });  
}