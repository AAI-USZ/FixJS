function(){
			var _self = this,
				children = _self.get('children'),
				columns = _self.get('columns'),
				emptyColumn = _self._createEmptyColumn();
			S.each(columns,function(item,index){
				var columnControl = _self._createColumn(item);
				children[index] = columnControl;
				columns[index] = columnControl;
			});
            _self.set('emptyColumn',emptyColumn);
			children.push(emptyColumn);
		}