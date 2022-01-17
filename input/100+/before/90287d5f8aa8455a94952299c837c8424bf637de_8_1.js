function(Marionette, Mustache,template) {


		var TorrentListViewItem = Marionette.ItemView.extend({

			tagName: "li",

			initialize: function() {
				_.bindAll(this, "render", "remove", "log");
			},

			render: function() {
				var output = Mustache.render(template);
				$(this.el).html(output);
			},

			remove: function() {
				this.log("removing myself");
			},


			log: function(msg) {
				if (this.DEBUG)
					console.log("[TORRENT LIST VIEW ITEM] " + msg);
			}
		});
		TorrentListViewItem.prototype.DEBUG = false;
		return TorrentListViewItem;
	}