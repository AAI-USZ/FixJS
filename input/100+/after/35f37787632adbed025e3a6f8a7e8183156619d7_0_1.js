function generateNodes() {
	for(var name in data){
		var module = data[name];
		var deps = module.requires;
		var name = module.name;
		var clusterName = nameToCluster(name);

		var color = clusters[data[name].cluster].color;
		var id = data[name].id;
		var size = data[name].count;

		// if (size > 10) {
		// 	size = size * .9;
		// }
		// else if ( size > 15) {
		// 	size = size * .75;
		// }
		// else if (size > 20) {
		// 	size = size * .6;
		// }

		size = size * ((100-size*1.6)/100);

		var subs = {
			name: name,
			id: id,
			x: clusters[clusterName].x + (Math.floor(Math.random()*15)),
			y: clusters[clusterName].y + (Math.floor(Math.random()*15)),
			size: size,
			color: color
		};

		var xml = getTemplate('node', subs);

		nodes.push(xml);
	}
}