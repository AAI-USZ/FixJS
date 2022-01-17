function() {
			var self = this;
			
			// the canvas container
			var canvas = this.$el.find("#canvas")[0];
			
			// api options
			var options = {
			    zoom : this.options.zoom || 12,
			    disableDefaultUI: true,
			    mapTypeId : google.maps.MapTypeId.ROADMAP
			};
			
			this.map = new google.maps.Map(canvas, options);
			
			// fix when map was loading in wrong dimensions
			this.$el.bind('shown', function() {
				google.maps.event.trigger(self.map, 'resize');
				self.map.setCenter(self.center);
				
				// remove jQuery event
				self.$el.unbind('shown');
			});
			
			// get the coordinates of the location
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				"address" : this.options.location
				}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						self.center = results[0].geometry.location;
						self.map.setCenter(self.center);
						
						//console.log("turtles/map/workoffice.php?color=" + encodeURIComponent(infoScreen.color));
						
						var marker = new google.maps.Marker({
				            map: self.map,
				            position: results[0].geometry.location,
						    icon: new google.maps.MarkerImage("turtles/map/workoffice.php?color=" + encodeURIComponent(infoScreen.color))
				        });
					}
			});
			
			// add traffic layer
			self.trafficLayer = new google.maps.TrafficLayer();
			self.trafficLayer.setMap(self.map);
		}