function(){trace("Google Maps API Library Loaded")})}},create:function(a){function b(a){if(a in VMM.ExternalAPI.googlemaps.map_providers){c=VMM.ExternalAPI.googlemaps.map_attribution[VMM.ExternalAPI.googlemaps.map_providers[a].attribution];return VMM.ExternalAPI.googlemaps.map_providers[a]}if(VMM.ExternalAPI.googlemaps.defaultType(a)){trace("GOOGLE MAP DEFAULT TYPE");return google.maps.MapTypeId[a.toUpperCase()]}trace("Not a maptype: "+a)}var c="",d,e;google.maps.VeriteMapType=function(a){if(VMM.ExternalAPI.googlemaps.defaultType(a))return google.maps.MapTypeId[a.toUpperCase()];
var c=b(a);return google.maps.ImageMapType.call(this,{getTileUrl:function(a,b){return[c.url.replace("{S}",VMM.ExternalAPI.googlemaps.map_subdomains[(b+a.x+a.y)%VMM.ExternalAPI.googlemaps.map_subdomains.length]).replace("{Z}",b).replace("{X}",a.x).replace("{Y}",a.y).replace("{z}",b).replace("{x}",a.x).replace("{y}",a.y)]},tileSize:new google.maps.Size(256,256),name:a,minZoom:c.minZoom,maxZoom:c.maxZoom})};google.maps.VeriteMapType.prototype=new google.maps.ImageMapType("_");d=type.of(VMM.master_config.Timeline.maptype)==
"string"?VMM.ExternalAPI.googlemaps.defaultType(VMM.master_config.Timeline.maptype)?google.maps.MapTypeId[VMM.master_config.Timeline.maptype.toUpperCase()]:VMM.master_config.Timeline.maptype:"toner";var f=new google.maps.LatLng(41.875696,-87.624207),j,g=11,h=false,n=false;if(type.of(VMM.Util.getUrlVars(a.url).ll)=="string"){h=true;j=VMM.Util.getUrlVars(a.url).ll.split(",");f=new google.maps.LatLng(parseFloat(j[0]),parseFloat(j[1]))}else if(type.of(VMM.Util.getUrlVars(a.url).sll)=="string"){j=VMM.Util.getUrlVars(a.url).sll.split(",");
f=new google.maps.LatLng(parseFloat(j[0]),parseFloat(j[1]))}if(type.of(VMM.Util.getUrlVars(a.url).z)=="string"){n=true;g=parseFloat(VMM.Util.getUrlVars(a.url).z)}j={zoom:g,disableDefaultUI:true,mapTypeControl:false,zoomControl:true,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL,position:google.maps.ControlPosition.TOP_RIGHT},center:f,mapTypeId:d,mapTypeControlOptions:{mapTypeIds:[d]}};var p=a.id.toString()+"_gmap";VMM.attachElement("#"+a.id,"<div class='google-map' id='"+p+"' style='width=100%;height=100%;'></div>");
e=new google.maps.Map(document.getElementById(p),j);if(!VMM.ExternalAPI.googlemaps.defaultType(VMM.master_config.Timeline.maptype)){e.mapTypes.set(d,new google.maps.VeriteMapType(d));VMM.appendElement("#"+p,"<div class='map-attribution'><div class='attribution-text'>"+c+"</div></div>")}(function(){var b=a.url+"&output=kml",b=b.replace("&output=embed",""),c=new google.maps.KmlLayer(b,{preserveViewport:true}),d=new google.maps.InfoWindow;c.setMap(e);google.maps.event.addListenerOnce(c,"defaultviewport_changed",
function(){e.fitBounds(c.getDefaultViewport());h&&e.panTo(f);n&&e.setZoom(g)});google.maps.event.addListener(c,"click",function(a){d.setContent(a.featureData.description);d.open(e)}