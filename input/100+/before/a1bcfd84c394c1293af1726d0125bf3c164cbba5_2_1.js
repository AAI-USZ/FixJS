function ($resource, appConfig, $provide) {

        var project = $resource('/adminApi/:applicationId/:action',
    		{applicationId : "@applicationId"},
            {
                grids: { method: 'GET' ,isArray:true, params: {action : "grids"}},
                getGrid: { method: 'POST' , params: {action : "GetGrid"}},
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

    	return project;
    }