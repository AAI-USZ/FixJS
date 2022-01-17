function(route){if(!wn.boot){return[window.page_name];}
return $.map(wn.get_route_str(route).split('/'),function(r){return decodeURIComponent(r);});}