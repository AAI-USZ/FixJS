function ($resource, appConfig, $provide) {

        var project = $resource('/adminApi/:applicationId/:action/:Id',
    		{applicationId : "@applicationId"},
            {
                grids: { method: 'GET' ,isArray:true, params: {action : "grids"}},
                getGrid: { method: 'POST' , params: {action : "GetGrid", Id : 1}},
                AddGridElement: { method: 'POST' , params: {action : "AddGridElement"}},
                DeleteGridElement: { method: 'POST' , params: {action : "DeleteGridElement"}},
                UpdateGridElement: { method: 'POST' , params: {action : "UpdateGridElement"}}
            }
        );
        project.prototype.save = function(cb) {
            console.log("save");
            return project.save({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };
        project.prototype.getGrid = function(cb) {
        	console.log("kjbasdjkbas")
			return project.getGrid({ id: this._id.$oid },
		        angular.extend({}, this, {_id:undefined}), cb);
        };

    	return project;
    }