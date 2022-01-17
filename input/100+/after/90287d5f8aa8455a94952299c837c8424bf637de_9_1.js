function(Marionette, _, $,
		TorrentListItemView) {

		var TorrentsList= Marionette.CollectionView.extend({

			tagName: "div",

			itemView: TorrentListItemView,

			beforeRender: function() {
				this.log("before render there are " + this.collection.length + " items");
				$(this.el).html('');
			},

			afterRender: function() {
				$(this.el).addClass("row");
			},

			log : function(msg) {
				if (this.DEBUG)
					console.log("[TORRENT LIST] " + msg);
			}
		});
		TorrentsList.prototype.DEBUG = false;
		return TorrentsList;

	}