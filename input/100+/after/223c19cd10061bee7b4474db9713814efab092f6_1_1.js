function(){



    var lods = [

      	{"level" : 0, "resolution" : 39135.7584820001, "scale" : 147914381.897889},

        {"level" : 1, "resolution" : 19567.8792409999, "scale" : 73957190.948944},

      	{"level" : 2, "resolution" : 9783.93962049996, "scale" : 36978595.474472},

  		{"level" : 3, "resolution" : 4891.96981024998, "scale" : 18489297.737236},

        {"level" : 4, "resolution" : 2445.98490512499, "scale" : 9244648.868618},

        {"level" : 5, "resolution" : 1222.99245256249, "scale" : 4622324.434309}

    ];



	var initExtent = new esri.geometry.Extent({"xmin":-15440190.518952178,"ymin":-4384014.805557845,"xmax":16259773.85146766,"ymax":10174487.34974608,"spatialReference":{"wkid":102100}});



	_map = new esri.Map("map",{

		extent:initExtent,

		wrapAround180:false,

        lods:lods

	});



	var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer");

	_map.addLayer(basemap);



	_points = new esri.layers.GraphicsLayer();

	_map.addLayer(_points);



	addPoints();



    _currentSpecies = [];

	dojo.forEach(_points.graphics,function(g){

		if(g.attributes.RLcategory !== "VU"){

			g.hide();

		}

        else{

            _currentSpecies.push(g.attributes);

        }

	});



	dojo.connect(_map, 'onLoad', function(theMap) {

		//resize the map when the browser resizes

        $("#zoomToggle").show();

		dojo.connect(dijit.byId('map'), 'resize', _map,_map.resize);

	});



	dojo.connect(_points,"onMouseOver",function(event){

		_map.setCursor("pointer");

		event.graphic.setSymbol(event.graphic.symbol.setHeight(30).setWidth(37).setOffset(10,14));

        $("#hoverInfo").html("").append("<table><tr><td id='speciesName'>" + event.graphic.attributes.Common_name + "</td><td id='arrowCon' rowspan='2'><div id='popupArrow'></div></tr><tr><td id='thumbnailCon'><img id='speciesThmb' src='images/thumbs/" + event.graphic.attributes.Thumb_URL + "' alt='" + event.graphic.attributes.Common_name + "'</td></tr></table>").data("attr",event.graphic.attributes);

        $("#hoverInfo").mouseover(function(){

            openPopout(event.graphic.attributes,true);

        });

        positionHoverInfo(event.graphic.geometry);

        $(".speciesItem").each(function(){

            if($(this).data("attributes") === event.graphic.attributes){

                $(this).addClass("selectedItem");

                $(this).children(".arrow").show();

            }

            else{

                $(this).removeClass("selectedItem");

                $(this).children(".arrow").hide();

            }

        });

	});



	dojo.connect(_points,"onMouseOut",function(event){

		_map.setCursor("default");

		event.graphic.setSymbol(event.graphic.symbol.setHeight(25).setWidth(31).setOffset(8,12));

        hidePopup();

	});



	dojo.connect(_points,"onClick",function(event){

        openPopout(event.graphic.attributes,true);

	});



    dojo.connect(_map,"onPan",function(event){

        hidePopup();

    });



    $("#zoomIn").click(function(){

        _map.setLevel(_map.getLevel()+1);

    });

    $("#zoomOut").click(function(){

        _map.setLevel(_map.getLevel()-1);

    });

    $("#zoomExtent").click(function(){

        _map.setExtent(initExtent);

    });

}