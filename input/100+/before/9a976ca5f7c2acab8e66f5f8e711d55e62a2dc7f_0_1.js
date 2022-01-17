function($) {

	var collection = Backbone.Collection.extend({
		initialize : function(models, options) {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "refresh");

			thatmivb = this;

			// bind refresh
			this.bind("born", this.refresh);
			this.bind("refresh", this.refresh);

			// default error value
			options.error = false;

			// automatic collection refresh each minute, this will
			// trigger the reset event
			refreshInterval = window.setInterval(this.refresh, 60000);
		},
		refresh : function() {
			var self = this;
			self.fetch({
				error : function() {
					// will allow the view to detect errors
					self.options.error = true;

					// if there are no previous items to show, display error
					// message
					if (self.length == 0)
						self.trigger("reset");
				}
			});
		},
		url : function() {
			var today = new Date();
			var month = today.getMonth() + 1;
			var day = today.getDate();
			var year = today.getFullYear();
			var minutes = today.getMinutes();
			var hours = today.getHours();

			if (minutes < 10)
				minutes = "0" + minutes;

			if (hours < 10)
				hours = "0" + hours;

			if (month < 10)
				month = "0" + month;

			if (day < 10)
				day = "0" + day;

			var query = encodeURIComponent(this.options.location) + "/" + year + "/" + month + "/" + day + "/" + hours + "/" + minutes;

			if (isNaN(this.options.location)) {
				this.options.station = this.capitalizeWords(this.options.location);
			} else {
				$.getJSON("http://data.irail.be/MIVBSTIB/Stations.json?id=" + encodeURIComponent(this.options.location), this.parseStationName);
			}

			// remote source url - todo: add departures or arrivals
			return "http://data.irail.be/MIVBSTIB/Departures/" + query + ".json?offset=0&rowcount=15";
		},
		parse : function(json) {
			// parse ajax results
			var liveboard = json.Departures;

			for (var i in liveboard) {
				liveboard[i].delay = liveboard[i].delay ? this.formatTime(liveboard[i].time + liveboard[i].delay) : false;
				liveboard[i].time = this.formatTime(liveboard[i].time);

				if (!liveboard[i].long_name)
					liveboard[i].long_name = "-";
				else
					liveboard[i].long_name = this.parseTripName(liveboard[i].long_name)
			}

			return liveboard;
		},
		formatTime : function(timestamp) {
			var time = new Date(timestamp * 1000);
			var hours = time.getHours();
			var minutes = time.getMinutes();
			return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
		},
		parseStationName : function(data) {
			thatmivb.options.station = thatmivb
					.capitalizeWords(data.Stations[0].name);
		},
		capitalizeWords : function wordToUpper(strSentence) {
			return strSentence.toLowerCase().replace(/\b[a-z]/g, convertToUpper);

			function convertToUpper() {
				return arguments[0].toUpperCase();
			}
		},
		parseTripName : function(strTripName) {
			strTripName = this.capitalizeWords(strTripName);

			if (strTripName.split("-").length == 2) {
				strTripName = strTripName.split("-")[1];
			}

			return strTripName
		}
	});

	var view = Backbone.View.extend({
		initialize : function() {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "render");
			// bind render to collection reset

			this.collection.bind("reset", this.render);

			// pre-fetch template file and render when ready
			var self = this;
			if (this.template == null) {
				$.get("turtles/mivbstib/list.html", function(template) {
					self.template = template;
					self.render();
				});
			}
		},
		render : function() {
			// only render when template file is loaded
			if (this.template) {
				var data = {
					direction : this.options.direction || "departures",
					station : this.options.station,
					entries : this.collection.toJSON(),
					error : this.options.error, // have there been any errors?
					i18n : this.options.i18n
				};

				// add html to container
				this.$el.html($.tmpl(this.template, data));

				// notify listeners render completed and pass element
				this.trigger("rendered", this.$el);
			}
		}
	});

	// register turtle
	Turtles.register("mivbstib", {
		collection : collection,
		view : view
	});

}