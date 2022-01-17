function(layer, html, footer, featureServer, typeName, idAttribute, clusterLabel, clusterDelimiter, clusterHTML, clusterAmount, navigation, clusterAmount) {
		/*
		var layers = [];
		for(key in this.map.layers) {
			if(this.map.layers[key] instanceof OpenLayers.Layer.WFSFilter)
				layers.push(this.map.layers[key]);
		}
		selectControl = new OpenLayers.Control.SelectFeature(layers, {*/
		selectControl = new OpenLayers.Control.SelectFeature([layer], {
			hover : false,
			toggle : true,
			highlightOnly: false,
			tooltipDiv : null,
			multiple : false,
			callbacks : {
				over : function(feature) {
					var regex = new RegExp(/\$\{([^}]+)\}/);
					var match = null;
					
					this.tooltipDiv = document.createElement('div');
					style = document.createAttribute('style');
					style.nodeValue = 'z-index: 3000;position:absolute;left:'+(mouseX+10)+'px;top:'+(mouseY+10)+'px;background-color:#FFFFCC;border:1px solid #BBBBBB;padding:1px;';
					this.tooltipDiv.setAttributeNode(style);
					if(feature.attributes.name.length > 0) {
						this.tooltipDiv.innerHTML = (feature.attributes.name == "None") ? "<p>No Name</p>" :	"<p>"+feature.attributes.name+"</p>";
					} else {
						this.tooltipDiv.innerHTML = "<p>" + eval(regex.exec(clusterAmount)[1]) + " features in this cluster</p>";
					}
					document.body.appendChild(this.tooltipDiv);
				},
				out : function(feature) {
					if(this.tooltipDiv != null) {
						document.body.removeChild(this.tooltipDiv);
						this.tooltipDiv = null;
					}
				},
				click : function(feature) {
					if(this.tooltipDiv != null) {
						document.body.removeChild(this.tooltipDiv);
						this.tooltipDiv = null;
					}
					this.clickFeature(feature);
				}
			},
			onSelect: function(feature) {
				var regex = new RegExp(/\$\{([^}]+)\}/);
				var match = null;
				var output = html;
				var popup = null;
				var ids = [];
				
				try {
					ids = eval(regex.exec(clusterLabel)[1]).split(clusterDelimiter);
					ids.splice(0,1);
				} catch(err) {
				}
								
				if(ids.length > 0) {
					//feature is a cluster -> load addtional info
					var counter = 0;
					output = '<div class="ff_load_indicator">Loading...</div>';
					
					var filterencoding = "<Filter><Or>";
					for(index in ids) {
						counter++;
						filterencoding += "<PropertyIsEqualTo><PropertyName>" + idAttribute + "</PropertyName><Literal>" + ids[index] + "</Literal></PropertyIsEqualTo>";
						if(counter >= clusterAmount)
							break;
					}
					filterencoding += "</Or></Filter>";
					var request = OpenLayers.Request.GET({
						url : featureServer,
						async : true,
					    params: {
							service : "WFS",
							typename : typeName,
							request : "GetFeature",
							filter : filterencoding
						},
					    callback : function(request) {
					    	var oldFeature = feature;
							var features = new OpenLayers.Format.GML().read(request.responseText);
							output = "";
							if(features.length == 0) {
								output = '<div class="ff_warning">Coud not find any feature.</div>';
								return;
							}
							
							for(var i = 0; i < features.length; i++) {
								feature = features[i];
								if(typeof(clusterHTML) == "function") {
									output += clusterHTML(feature);
								} else {
									var featureHTML = clusterHTML;
									while((match = regex.exec(featureHTML)) != null) {
										featureHTML = featureHTML.replace(match[0], eval(match[1]));
									}
									output += featureHTML
								}
							}
							if(ids.length > clusterAmount) {
								output += "<p>...</p>";
							}
							
							if(typeof(navigation) == "function") {
								output += navigation(oldFeature);
							} else {
								output += navigation;
								while((match = regex.exec(output)) != null) {
									output = output.replace(match[0], eval(match[1]));
								}
							}
							
							output = "<div>" + output + "</div>";
							
							feature = oldFeature;
							
							if(feature.popup != null)
								feature.popup.setContentHTML(output);
						},
						failure : function(request) {
							if(request.status == 414) {
								// Request-URI Too Large
								output = '<div class="ff_info">Too many results, please zoom in.</div>';
							} else {
								// other error
								output = '<div class="ff_error">An unknonw error occured. Please try again later.</div>';
							}
							if(feature.popup != null)
								feature.popup.setContentHTML(output);
						}
					});
				} else {
					if(typeof(html) == "function") {
						output = html(feature);
					} else {
						while((match = regex.exec(output)) != null) {
							output = output.replace(match[0], eval(match[1]));
						}
					}
					
					if(typeof(footer) == "function") {
						output += footer(feature);
					} else {
						output += footer;
						while((match = regex.exec(output)) != null) {
							output = output.replace(match[0], eval(match[1]));
						}
					}
					output = "<div>" + output + "</div>";
				}
				
			    popup = new OpenLayers.Popup.FramedCloud("chicken", 
			                             feature.geometry.getBounds().getCenterLonLat(),
			                             null,
			                             output,
			                             null, true, function(event) {
			        selectControl.onUnselect(feature);
			    });
			    feature.popup = popup;
			    popup.feature = feature;
			    this.map.addPopup(popup);
			},
			onUnselect: function(feature) {
				if(feature.popup != null) {
					this.map.removePopup(feature.popup);
					feature.popup.destroy();
					feature.popup = null;
				}
			}
		}		this.map.addControl(selectControl);
		selectControl.activate();
	},
