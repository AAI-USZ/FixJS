function(event)
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
			}