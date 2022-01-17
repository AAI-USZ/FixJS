function() {
			
			// load Aloha core files
			require(
				Aloha.settings.requireConfig, 
				[
					'vendor/jquery.json-2.2.min',
					'vendor/jquery.store',
					'aloha/rangy-core',
					'util/json2',
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
					'aloha/jquery.patch',
					'aloha/jquery.aloha',
					'aloha/sidebar',
					'util/position',
					'aloha/ext-alohaproxy',
					'aloha/ext-alohareader',
					'aloha/ext-alohatreeloader',
					'aloha/ui',
					'aloha/ui-attributefield',
					'aloha/ui-browser',
					'aloha/floatingmenu',
					'aloha/repositorymanager',
					'aloha/repository',
					'aloha/repositoryobjects',
					'aloha/contenthandlermanager'
				],
				function() {
					
					// jQuery calls the init method when the dom is ready
					Aloha.jQuery( Aloha.init );
				}
			);
		}