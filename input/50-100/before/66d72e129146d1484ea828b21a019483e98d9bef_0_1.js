function(self, $) {
	/** Object: about
	 * About candy
	 *
	 * Contains:
	 *   (String) name - Candy
	 *   (Float) version - Candy version
	 */
	self.about = {
		name: 'Candy',
		version: '1.0.9'
	};

	/** Function: init
	 * Init view & core
	 *
	 * Parameters:
	 *   (String) service - URL to the BOSH interface
	 *   (Object) options - Options for candy
	 *
	 * Options:
	 *   (Boolean) debug - Debug (Default: false)
	 *   (Array|Boolean) autojoin - Autojoin these channels. When boolean true, do not autojoin, wait if the server sends something.
	 */
	self.init = function(service, options) {
		self.View.init($('#candy'), options.view);
		self.Core.init(service, options.core);
	};

	return self;
}(Candy || {}