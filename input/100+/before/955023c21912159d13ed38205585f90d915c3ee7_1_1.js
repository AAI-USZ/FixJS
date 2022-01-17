function() {
	
	/**
	 * UI autocomplete handling
	 * Needed for examples dropdown
	 */
	$.widget( "custom.catcomplete", $.ui.autocomplete, {
		_renderMenu: function(ul, items) {
			var self = this;
			ul.append("<li class='ui-autocomplete-category'>Locations</li>");
			$.each( items, function( index, item ) {
				self._renderItem( ul, item );
			});
		},
		
		_renderItem: function(ul, item) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a><img src=\"" + basePath + "/img/zoom_in.png\" />&nbsp;" + item.value + "</a>" )
				.appendTo( ul );
		}
	});
	
	$('#sLocation').autocomplete({
		position : {my: "left top", at: "left bottom", collision: "none" },
		minLength : 2,
		source :  function(request, response) {
			//http://open.mapquestapi.com/nominatim/v1/search?format=json&callback=renderBasicSearchNarrative&q=zurich
			//http://nominatim.openstreetmap.org/search
			var result = [];
			$.ajax({
				url : 'http://open.mapquestapi.com/nominatim/v1/search',
				dataType : 'json',
				jsonp : "json_callback",
				data : {
					format : 'json',
					limit : 10,
					q : request.term,
					//json_callback : "nominatim_callback"
				},
				success : function(data) {
					$.merge(result, $.map(data, function(item) {
						for(var index in item) {
							return {
								label : item["display_name"],
								key : item["place_id"],
								value : item["display_name"],
								boundingbox : item["boundingbox"],
								lat : item["lat"],
								lon : item["lon"],
							}
						}
					}));
					response(result);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					//alert(textStatus);
				} 
			});
		},
		select: function(event, ui){
			maphandler.map.setCenter(new OpenLayers.LonLat(parseFloat(ui.item.lon), parseFloat(ui.item.lat)).transform(new OpenLayers.Projection("EPSG:4326"), maphandler.map.getProjectionObject()), 14);
		},
	});

	
	/**
	 * Global UI handling
	 */
	$('#error_msg').hide(0);
	$(window).resize(function() {
		$('#osm_map').height($(window).height()-$('#header').height()-106);
		
		var pos = $('#osm_map').offset();
		$("#black_background").css({ "left": pos.left-15 + "px", "top":pos.top-10 + "px", "width":$('#osm_map').width() + 5 + "px", "height":$('#osm_map').height() + 5 + "px" });
		$("#sidebar_close").css({ "left": pos.left-13 + "px", "top":pos.top-8 + "px"});
		$('#sidebar').height($('#osm_map').height());
		$("#sLocation").width($("#sidebar").width() - 40);
	});
	$('#osm_map').height($(window).height()-$('#header').height()-106);
	$('#sidebar').height($('#osm_map').height());
	
	var pos = $('#osm_map').offset();
	$("#sidebar_close").css({ "left": pos.left-13 + "px", "top":pos.top-8 + "px"});
	$("#sLocation").width($("#sidebar").width() - 40);

	if(dbOnline) { $('button').button(); } else { $('button').button('disable'); }

	$("#sidebar_close").bind('click', function() {
		$(".ui-resizable-e").dblclick();
	});
	
	$("#sidebar").resizable({
		autoHide : true,
		ghost : true,
		handles : 'e',
		//helper: 'ui-state-highlight'
		minWidth: 100,
		maxWidth: $('#content').width(),
		stop: function (event, ui) {
			var pos = $('#osm_map').offset();
			$("#sidebar_close").css({ "left": pos.left-13 + "px", "top":pos.top-8 + "px"});
		}
	});
	
	$(".ui-resizable-e").dblclick(function() {
		$("#sidebar_close").hide();

		$('#sidebar').hide('slow', function() {
			$('#content').append('<a id="sidebarOpen"><div class="sidebarIcon" style="position:relative;top:23px;left:1px;z-index:2000;"><img src="'+
					basePath+'/img/arrow_right.png'
					+'" style="position:absolute;top:2px;left:7px;"></div></a>')
			$('section.right').css({'padding-left':'0px'});

			$("#sidebarOpen").bind('click', function() {
				$('#sidebarOpen').remove();
				$('#sidebar').show();
				$('section.right').css({'padding-left':'10px'});

				var pos = $('#osm_map').offset();
				$("#sidebar_close").css({ "left": pos.left-13 + "px", "top":pos.top-8 + "px"});
				$("#sidebar_close").show();
			});

		});
	});
	
	
	/**
	 * Button handling
	 */
	$('#preview').bind('click', function() {
		maphandler.removeLayer('Preview');
		$('#error_msg').hide(0);
		
		if($('#bbox').is(':checked')) {
			$('#bbox').val(
					maphandler.map.getExtent().transform(
							new OpenLayers.Projection("EPSG:900913"),
							new OpenLayers.Projection("EPSG:4326")
					).toBBOX()
			);
		} else {
			$('#bbox').val('');
		}
		
		layer = maphandler.processQuery('Preview',
			editor.getFormatedValue(),
			$('#bbox').val(),
			function(errors) {
				row = '';
				for(var code in errors) {
					row += '<tr><td>' + code + ':</td><td>' + errors[code] + '</td></tr>';
				}
				
				
				if(row.length > 0) {
					output = '<div class="ui-widget">';
					output += '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">';
					output += '<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>'
					output += '<label class="errormsg">An error occured:</label><br/>'
					output += '<table><tbody>' + row + '</tbody></table>';
					output += '</p>';
					output += '</div>';
					output += '</div>';
					
					$('#error_msg').html(output);
					$('#error_msg').show(0);
				}
			},
			function() {
				output = '<div class="ui-widget">';
				output += '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">';
				output += '<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>'
				output += 'Could not find any feature.'
				output += '</p>';
				output += '</div>';
				output += '</div>';

				$('#error_msg').html(output);
				$('#error_msg').show(0);
			}, function() {
				//$('#loading').show(0);
				$("body").css("cursor", "progress");
				var pos = $('#osm_map').offset();
				$("#black_background").css({ "left": pos.left-15 + "px", "top":pos.top-10 + "px", "width":$('#osm_map').width() + 5 + "px", "height":$('#osm_map').height() + 5 + "px" }).show();
			}, function() {
				//$('#loading').hide(0);
				$("body").css("cursor", "auto")
				$("#black_background").hide();
			}
		);
		
		maphandler.addLayer('Preview', layer);
		
		maphandler.map.getControlsByClass('OpenLayers.Control.Permalink')[0].element.href = Navigation.prototype.updateParameter(maphandler.map.getControlsByClass('OpenLayers.Control.Permalink')[0].element.href, "filter", editor.getFormatedValue());
	});
	
	$('#clear').bind('click', function() {
		editor.setValue("");
		maphandler.removeAllLayers();
		$('#error_msg').hide(0);
		$("#black_background").hide();
	});
	
	
	$('#dl_form').submit(function() {
		$('#error_msg').hide(0);
		if($('#bbox').is(':checked')) {
			$('#bbox').val(
					maphandler.map.getExtent().transform(
							new OpenLayers.Projection("EPSG:900913"),
							new OpenLayers.Projection("EPSG:4326")
					).toBBOX()
			);
		} else {
			$('#bbox').val('');
		}
		return true;
	});
	
	$('#bGeoLocate').bind('click', function() {
		var geolocation = new GeoLocation({
			onSuccess : function() {
				maphandler.map.setCenter(new OpenLayers.LonLat(parseFloat(this.longitude), parseFloat(this.latitude)).transform(new OpenLayers.Projection("EPSG:4326"), maphandler.map.getProjectionObject()), 14);
			},
			onNotSupported : function() {
				$('#bGeoLocate').hide(0);
			},
			onUnkownError : function() {
				$('#bGeoLocate').hide(0);
			}
		});
		geolocation.locate();
	});
	$('#bGeoLocate').hover(
			function() {
				var tooltipDiv = document.createElement('div');
				
				var style = document.createAttribute('style');
				style.nodeValue = 'z-index: 100000;position:absolute;left:'+(mouseX+10)+'px;top:'+(mouseY+10)+'px;background-color:#FFFFCC;border:1px solid #BBBBBB;padding:1px;';
				tooltipDiv.setAttributeNode(style);
				
				var id = document.createAttribute('id');
				id.nodeValue = "bGeoLocateTooltip";
				tooltipDiv.setAttributeNode(id);
				
				tooltipDiv.innerHTML = "<p>Use current location</p>";
				
				document.body.appendChild(tooltipDiv);
			},
			function() {
				var tooltipDiv = document.getElementById("bGeoLocateTooltip");
				document.body.removeChild(tooltipDiv);
			}
		);
	
	

	/**
	 * Map and Layer creation
	 */
	maphandler = new MapHander();
	maphandler.createMap();
	maphandler.addMapnik("OpenStreetMap");
	
	if(lon && lat && zoom) {
		var center = new OpenLayers.LonLat(parseFloat(lon), parseFloat(lat)).transform(maphandler.map.displayProjection, maphandler.map.getProjectionObject())
	    maphandler.map.setCenter(center, zoom);
	} else {
		maphandler.map.zoomToMaxExtent();
	}

	
	/**
	 * FeatureFilter Editor handling
	 */
	editor = CodeMirror.fromTextArea(document.getElementById("filter"), {
			mode: {name: "xml", htmlMode: true},
			onChange: function () {
				if(editor == null) {
					$("input[type='radio']").attr("disabled", "disabled");
					$("#bDownload").attr("disabled", "true");
				} else {
					if(editor.getValue().length == 0) {
						$("input[type='radio']").attr("disabled", "disabled");
						$("#bDownload").attr("disabled", "true");
					} else {
						$("input[type='radio']").removeAttr("disabled");
						$("#bDownload").removeAttr("disabled");
					}
				}
			}
	});
	editor = Class.Util.extend(editor, Editor.prototype);
	
	if(editor.getValue().length == 0) {
		$("input[type='radio']").attr("disabled", "disabled");
		$("#bDownload").attr("disabled", "true");
	} else {
		$("input[type='radio']").removeAttr("disabled");
		$("#bDownload").removeAttr("disabled");
	}
	
	editor.setValue(beautifyXml(editor.getFormatedValue()));
	
	
	
	/**
	 * Navigation handling
	 */
	Navigation.prototype.register('filter', editor, 'getFormatedValue');
	Navigation.prototype.registerCallback('zoom', function() {
		return maphandler.map.zoom;
	});
	Navigation.prototype.registerCallback('lat', function() {
		var clone = maphandler.map.center.clone().transform(maphandler.map.projection, maphandler.map.displayProjection);
		return clone.lat;
	});
	Navigation.prototype.registerCallback('lon', function() {
		var clone = maphandler.map.center.clone().transform(maphandler.map.projection, maphandler.map.displayProjection);
		return clone.lon;
	});

}