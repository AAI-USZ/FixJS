function (jQuery) {
			// Provide Aloha.jQuery for compatibility with old implementations
			// that which expect it to be there.
			Aloha.jQuery = jQuery;

	        // Load Aloha core files ...
	        require(requireConfig, [
					'vendor/jquery.json-2.2.min',
					'aloha/rangy-core',
					'util/class',
					'util/lang',
					'util/range',
					'util/dom',
					'aloha/core',
					'aloha/editable',
					'aloha/console',
					'aloha/markup',
					'aloha/message',
					'aloha/plugin',
					'aloha/selection',
					'aloha/command',
					'aloha/jquery.aloha',
					'aloha/sidebar',
					'util/position',
					'aloha/repositorymanager',
					'aloha/repository',
					'aloha/repositoryobjects',
					'aloha/contenthandlermanager'
				], function () {
				// ... and have jQuery call the Aloha.init method when the dom
				// is ready.
				jQuery(Aloha.init);
			});
		}