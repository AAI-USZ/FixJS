function(){
		var self = this;
		var expression = this.expression = $.trim(this._elmts.expressionPreviewTextarea[0].value);
		var params = {
				project: theProject.id,
				expression: expression,
				isUri:isLiteral?"0":"1",
				columnName: isRowNumberCell?"":this._columnName,
				baseUri:baseUri
		};
		this._prepareUpdate(params);
    
		var cmdUrl = "command/rdf-extension/preview-rdf-expression?" ;
		$.post(
				cmdUrl + $.param(params), 
				{
					rowIndices: JSON.stringify(this._rowIndices) 
				},
				function(data) {
					if (data.code != "error") {
						self._results = data.results;
					} else {
						self._results = null;
					}
					self._renderPreview(expression, isRowNumberCell, data);
				},	
				"json"
		);
	}