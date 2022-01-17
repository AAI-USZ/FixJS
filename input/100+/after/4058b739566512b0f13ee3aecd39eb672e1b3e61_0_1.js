function(){var region={e_bound:-7436602.79,n_bound:5611382.66,s_bound:4925283.89,w_bound:-8256007.73,name:'Oregon Coast'};var map_extent=new OpenLayers.Bounds(-20037508,-20037508,20037508,20037508.34);var region_extent=new OpenLayers.Bounds(region.w_bound,region.s_bound,region.e_bound,region.n_bound);this.defaultCenter=region_extent.getCenterLonLat();var map_options={controls:[],projection:new OpenLayers.Projection("EPSG:3857"),displayProjection:new OpenLayers.Projection("EPSG:4326"),units:"m",numZoomLevels:11,maxResolution:2445.9849046875,maxExtent:map_extent,eventListeners:{"zoomend":this.switchChartLayer.createDelegate(this)}};var defaultStyle=new OpenLayers.Style(OpenLayers.Util.applyDefaults({fillColor:"#ffff00",fillOpacity:0.6,strokeColor:"#ff6600",strokeWidth:2},OpenLayers.Feature.Vector.style["default"]));var selectStyle=new OpenLayers.Style(OpenLayers.Util.applyDefaults({fillColor:'blue',fillOpacity:0.4,strokeColor:'blue',strokeWidth:2},OpenLayers.Feature.Vector.style["select"]));var tempStyle=new OpenLayers.Style(OpenLayers.Util.applyDefaults({fillColor:"#ee9900",fillOpacity:0.4,strokeColor:"#ff6600",strokeWidth:2},OpenLayers.Feature.Vector.style["temporary"]));var myStyle=new OpenLayers.StyleMap({'default':defaultStyle,'select':selectStyle,'temporary':tempStyle});var hybridLayer=new OpenLayers.Layer.Google("Satellite",{type:google.maps.MapTypeId.HYBRID,sphericalMercator:true,isBaseLayer:true,minZoomLevel:6});var roadMapLayer=new OpenLayers.Layer.Google("Road Map",{type:google.maps.MapTypeId.ROADMAP,sphericalMercator:true,isBaseLayer:true,minZoomLevel:6});this.nautLayer=new OpenLayers.Layer.TMS("Nautical Charts",["http://c3429629.r29.cf0.rackcdn.com/stache/NETiles_layer/"],{buffer:1,'isBaseLayer':true,'sphericalMercator':true,getURL:function(bounds){var z=map.getZoom();var url=this.url;var path='blank.png';if(z<=17&&z>=0){var res=map.getResolution();var x=Math.round((bounds.left-this.maxExtent.left)/(res*this.tileSize.w));var y=Math.round((this.maxExtent.top-bounds.top)/(res*this.tileSize.h));var limit=Math.pow(2,z);var path=(z+6)+"/"+x+"/"+y+".png";}
tilepath=url+path;return url+path;}});this.naut2Layer=new OpenLayers.Layer.WMS("Nautical Charts","http://egisws02.nos.noaa.gov/ArcGIS/services/RNC/NOAA_RNC/ImageServer/WMSServer",{layers:'null'});this.vectorLayer=new OpenLayers.Layer.Vector("Vector Layer",{displayInLayerSwitcher:false,styleMap:myStyle});this.vectorLayer.events.on({"sketchstarted":this.vecStarted,"sketchmodified":this.vecModified,"sketchcomplete":this.vecComplete,scope:this});Ext.DomHelper.append(document.body,[{id:'the-map',tag:'div'}]);map=new OpenLayers.Map('the-map',map_options);map.addControl(new OpenLayers.Control.Navigation({handleRightClicks:true}));map.addControl(new OpenLayers.Control.PanZoomBar());map.addControl(new OpenLayers.Control.MousePosition());var layerSwitcher=new OpenLayers.Control.LayerSwitcher();map.addControl(layerSwitcher);layerSwitcher.baseLbl.innerHTML="Maps";map.addControl(new OpenLayers.Control.ScaleLine());layerSwitcher.maximizeControl();map.addControl(new OpenLayers.Control.KeyboardDefaults());this.borderPanControl=new OpenLayers.Control.BorderPan({'blackoutBoxes':[{'top':8,'left':8,'right':215,'bottom':275}],panBorderWidth:60});map.addControl(this.borderPanControl);this.drawLineControl=new OpenLayers.Control.DrawFeature(this.vectorLayer,OpenLayers.Handler.ResumablePath);this.drawLineControl.handler.pause=this.linePaused.createDelegate(this);map.addControl(this.drawLineControl);this.drawPointControl=new OpenLayers.Control.DrawFeature(this.vectorLayer,OpenLayers.Handler.Point);map.addControl(this.drawPointControl);this.modifyControl=new OpenLayers.Control.ModifyFeature(this.vectorLayer);map.addControl(this.modifyControl);this.drawPolyControl=new OpenLayers.Control.DrawFeature(this.vectorLayer,OpenLayers.Handler.Polygon);map.addControl(this.drawPolyControl);Ext.apply(this,{map:map,layers:[this.nautLayer,hybridLayer,roadMapLayer,this.vectorLayer],extent:map_extent,center:region_extent.getCenterLonLat(),zoom:this.defaultZoom,cls:'tip-target'});gwst.widgets.ResDrawMapPanel.superclass.initComponent.call(this);},linePaused:function(){this.getEl().mask();this.lineComps=this.drawLineControl.handler.line.geometry.components;this.tripDistance=this.lineComps[0].distanceTo(this.lineComps[this.lineComps.length-1]);this.milesDistance=this.tripDistance*0.000621371192;this.borderPanControl.stopInterval();this.fireEvent('line-paused',this.milesDistance);},lineResume:function(){this.getEl().unmask();this.borderPanControl.startInterval();},lineFinish:function(){this.getEl().unmask();this.drawLineControl.handler.finishPath();}