function($, Backbone, _, StockListItem) {
	return Backbone.Collection.extend({
		model : StockListItem,
		url : 'sherpa?endpoint=StockService&action=quotes&callback=?',
		initialize : function() {
			$.mobile.showPageLoadingMsg();
			console.log('findScripts url:' + this.url);
			var data = this.localGet();
			if (data == null) {
				this.loadStocks();
			} else {
				console.log('local data present..');
				this.reset(data);
			}
		},
		loadStocks : function() {
			var self = this;
			$.getJSON(this.url, {
				}).success(function(data, textStatus, xhr) {
					console.log('script list get json success');
					console.log(JSON.stringify(data.scripts));
					self.reset(data);
					self.localSave(data);
				}).error(function(data, textStatus, xhr) {
					console.log('error');
					console.log("data - " + JSON.stringify(data));
					console.log("textStatus - " + textStatus);
					console.log("xhr - " + JSON.stringify(xhr));
				}).complete(function() {
					console.log('json request complete');
					$.mobile.hidePageLoadingMsg();
				});
		},
		localSave : function(data) {
			var d = JSON.stringify(data);
			localStorage.setItem('STOCKS', d);
		},
		localGet : function() {			
			var d = localStorage.getItem('STOCKS');
		    data = JSON.parse(d);
		    return data;
	   },
	   localRemove : function(model){
		   this.remove(model);
		   this.localSave(this.models);
	   }
	   
				
	});
}