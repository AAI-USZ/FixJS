function(method, model, opts) {
	// Ti.API.info("sync called with method="+method+", model="+JSON.stringify(model)+", opts="+JSON.stringify(opts));
	// Ti.API.info("config => "+JSON.stringify(model.config));
	
	var m = (model.config || {});
	var type = (m.adapter ? m.adapter.type : null) || 'sql';
	
	switch (type) {
		case 'sql': {
			SQLSync  = require("alloy/sync/sql");
			SQLSync.sync(model,method,opts);
			break;
		}
		case 'filesystem': {
			FileSysSync  = require("alloy/sync/filesys");
			FileSysSync.sync(model,method,opts);
			break;
		}
		default: {
			Ti.API.error("No sync adapter found for: "+type);
			return;
		}
	}

	Backbone.Collection.notify.trigger('sync', {method:method,model:model});
}