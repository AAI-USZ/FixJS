function(Y) {
	var YLang = Y.Lang,
		YArray = Y.Array,
		YObject = Y.Object;
		
	Y.Task = Y.Base.create('task', Y.TreeModel, [], {
		idAttribute: '_id',
		
		initializer: function(config){
			if (config && config.clientId){
				this._set('clientId', config.clientId);	
			} else {
				var generatedId = this.constructor.NAME + '_' +  (++Y.Task.lastCount);
				this._set('clientId', generatedId);
			}
		},
		
		_stringToDate: function(val){
			if (YLang.isDate(val)) {
				return val;
			} else {
				var d = Y.DataType.Date.parse(val);
				return d;
			}
		},
		
		toJSON: function () {
			var attrs = this.getAttrs();
			
			delete attrs.destroyed;
			delete attrs.initialized;
			
			if (this.idAttribute !== 'id') {
            	delete attrs.id;
        	}
			return attrs;
		},
	}, {
		ATTRS: {
			name: {

			},
		
			startDate: {
				setter: '_stringToDate'
			},
		
			endDate: {
				setter: '_stringToDate'
			},
		
			isFixedDuration: {
				value: false
			},
		
			work: {
				value: 0,
				setter: function(val){
					if (YLang.isNumber(val)){
						return val;
					}
					
					if (YLang.isString(val)){
						var num = parseInt(val);
						if (YLang.isNumber(num)){
							return num;
						} else {
							return 0;
						}
					}
				}
			},
			
			duration: {
			},
			
			clientId: {
				valueFn: undefined
			},
			
			predecessors: {
				setter: function(val) {
					var list = this.lists[0],
						self = this,
						selfIndex = list.indexOf(self);
					
					if(YLang.isString(val)){
						val = val.trim();
						
						if (val.length > 0){
							var tokens = val.split(';'),
								pred = {};

							YArray.each(tokens, function(token){
								token = token.trim();
								
								var itemIndex = parseInt(token),
									item = list.item(itemIndex-1),
									type, taskId;
								
								if ((itemIndex-1) === selfIndex) {
									//Adding same item as it's predecessor is wrong, so do nothing for such index
									return;
								}
								
								if (item){
									var itemIndexStr = itemIndex + '';
									
									if (itemIndexStr === token){
										type = 'FS';
									} else {
										type =  token.substring(itemIndexStr.length);
									}
									
									taskId = item.get('clientId');
									
									if (!YObject.hasKey(pred, type)){
										pred[type] = {};
									}
									
									if (taskId) {
										pred[type][taskId] = taskId;
									}
								}
							});
							return pred;	
						
						} else {
							return {};
						}
							
					} else if (YLang.isObject(val)){
						return val;
					}
				}
			},
			
			successors: {
			},
			
			resources: {
				
			},
			
			position: {
				value: -1
			},
			
			'_id': {
			}
		}	
	});
}