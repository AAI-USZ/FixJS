function(options)
	{
		// onTheOutside "class" - public methods are available through $('selector').data('outside-api')
		function onTheOutside($elem, settings)
		{
			var out = this,
				s	= settings;
			
			var listener = function(event)
			{
				var $target = $(event.target);
				
				if(s.debug)
				{
					console.log($target);
					console.log($elem);
					console.log($target.is($elem));
					console.log($target.parents().index($elem));
				}
				
				if($target.is($elem))
				{
					return;
				}
				
				if($target.parents().index($elem) < 0)
				{
					s.callback(event);

					if(s.once)
					{
						destroy();
					}
				}
			};
			
			var destroy = function()
			{
				s.outside.unbind(s.event, listener);
			};
			
			var initialise = function(s)
			{
				if(typeof(s.callback) == 'function')
				{
					s.outside.bind(s.event, listener);
				}
			}
			
			// Public API
			$.extend(
				out,
				{
					reinitialise: function(settings)
					{
						s = $.extend({}, defaults, settings);
						initialise(s);
					},
					
					destroy: function()
					{
						destroy();
					}
				}
			);
			
			initialise(s);
			
		}
		
		if(typeof(options) == 'function')
		{
			var fn = options;
			options = {
				callback: fn
			};
			
			delete fn;
		}
		
		var defaults = 
			{
				'event'		: 'click',
				'callback'	: null,
				'once'		: true,
				'debug'		: false
				'outside'	: $(document)
			},
			settings	= $.extend({}, defaults, options),
			$elem		= this, 
			api			= $elem.data('outside-api');
			
		if(api) 
		{
			api.reinitialise(settings);
		}
		else
		{
			api = new onTheOutside($elem, settings);
			$elem.data('outside-api', api);
		}

	}