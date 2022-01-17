function(req,res) {
	var specs = require(process.cwd() + '/node_modules/jasmine-node/lib/jasmine-node/spec-collection');
	specs.load(process.cwd() + '/features', new RegExp(".(js)$", "i"));
	var specsList = specs.getSpecPaths();
	var results = {title:settings.title, features:[]};
  for (var i = 0, len = specsList.length; i < len; ++i) {
		var filename = specsList[i].replace(process.cwd() + '/features/','').replace(/.(js)$/,'').replace(/.spec$/,'');
    results.features.push({name:filename, showUrl:"/respect/show_feature/" + filename});
  }	
	respond('feature/list.jade', req, res, results);
}