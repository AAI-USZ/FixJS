function() {
		var ds = new DataSet();
		var nb = ds.nodeBuilder;
		var wb = ds.wayBuilder;
		ds.nodeBuilder.withTags({name: 'test'}).create(1);
		ds.nodeBuilder.withTags({amenity: 'restaurant'}).create(2);
		ds.nodeBuilder.createProxy(3);
		var w = ds.wayBuilder.withTags({highway: 'residential'}).withNodes(ds.node(1), ds.node(2)).create();
		var map = {};
		ds.each(function(obj) {
			map[obj.id] = obj;
		}, {all: true});
		util.assert(map[1] == ds.node(1), "1 - wrong object");
		util.assert(map[2] == ds.node(2), "2 - wrong object");
		util.assert(map[w.id] == ds.way(w.id), "3 - wrong object");	
		util.assert(map[4], "should  have proxy node");
	}