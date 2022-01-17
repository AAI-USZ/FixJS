function(name,config,modelFn,migrations) {
	
    var type = (config.adapter ? config.adapter.type : null) || 'sql';
    if (type === 'sql' && !SQLSyncInit) {
 		SQLSyncInit = true;
    	SQLSync.init(); 
    }
	
	var Model = Backbone.Model.extend( {
		
		defaults: config.defaults,
		
		validate: function(attrs) {
			if (typeof __validate !== 'undefined') {
				if (_.isFunction(__validate)) {
					for (var k in attrs) {
						var t = __validate(k, attrs[k]);
						if (!t) {
							return "validation failed for: "+k;
						}
					}
				}
			}
		}
	});
	
	if (migrations && migrations.length > 0) {
		if (type == 'sql') { 
			SQLSync.migrate(migrations);
		}
	}

	Model.prototype.config = config;

	modelFn(Model);
	
	return Model;
}