function(_, Handlebars, observable, context, BindingContext) {
	
	var HtmlContext = BindingContext.extend({
		renderContent: function(value) {
			return !!value ? new Handlebars.SafeString(value.toString()) : "";
		}
	});
	
	Handlebars.registerHelper('html', function(target, options) {
		var ret,
			htmlContext = new HtmlContext({ 
				target: target, 
				parent: context(),
				bind: !(options.hash['unbound'] === true)
			});
		
		context(htmlContext);
		ret = htmlContext.render();
		context.pop();
		
		return ret;
	});
}