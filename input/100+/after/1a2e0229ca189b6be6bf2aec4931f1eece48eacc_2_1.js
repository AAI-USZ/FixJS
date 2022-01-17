function(){
	var self = this;
	var schema = this.getJSON();
	self._previewPane.empty().html('<img src="images/large-spinner.gif" title="loading..."/>');
	$.post(
	    "command/rdf-extension/preview-rdf?" + $.param({ project: theProject.id }),
        { schema: JSON.stringify(schema), engine: JSON.stringify(ui.browsingEngine.getJSON()) },
        function(data) {
        	self._previewPane.empty();
        	self._previewPane.html(linkify(data.v));
	    },
	    "json"
	);
}