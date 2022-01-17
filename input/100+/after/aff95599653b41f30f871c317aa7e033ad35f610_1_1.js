function(key, options) {

	key = key || 'mockCommand';

	options = options || {url: '/mock/add'};

	return commands.register(key, options)

}