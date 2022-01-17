function renderTemplate (name, subs) {

	var handlebars = require('handlebars'),
		asset = 'templates/' + name + '.mustache',
		source = require('./utils').getAsset(asset),
		template = handlebars.compile(source);

	return template(subs);

}