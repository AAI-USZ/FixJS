function(viewName, locals, cb) {
	//Append .blade for filenames without an extension
	var ext = viewName.split("/");
	ext = ext[ext.length-1].indexOf(".");
	if(ext < 0)
		viewName += ".blade";
	//Load and render the template
	blade.runtime.loadTemplate(viewName, function(err, tmpl) {
		if(err) return cb(err);
		(function renderTemplate() {
			function renderIt() {
				tmpl(locals ? locals.observable || locals : {}, cb);
			}
			if(blade.Context)
			{
				var context = new blade.Context();
				context.on_invalidate(renderTemplate); //recurse
				context.run(renderIt);
			}
			else
				renderIt();
		})();
	});
}