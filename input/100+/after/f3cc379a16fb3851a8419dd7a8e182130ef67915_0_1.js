function()
		{
			var $this     = $(this);

			$this
				.unbind('click')
				.click(function()
				{
					var keys      = $this.attr('data-document').split('.'),
						slug      = keys[0],
						namespace = keys[1],
						ref       = keys[2],
						locale    = keys[3],
						revision  = keys[4],
						status    = keys[5],
						label     = $this.attr('data-label'),
						klass     = $this.attr('data-class'),
						$parent   = $this.parents('div.dropdown').eq(0).find('a.dropdown-toggle');

					var url = tapioca.config.api_uri+slug+'/document/'+namespace+'/'+ref+'/status?status='+status+'&revision='+revision+'&locale='+locale;
					//		  /api/happyend/document/saison/4fd44dd876f91/status?status=100&locale=en_UK

					$.getJSON(url, function(data)
					{
						if(_.isUndefined(_cb) && data.revisions)
						{
							$parent[0].className = 'dropdown-toggle label '+klass;
							$parent.text(label)
						}

						if(_.isFunction(_cb) && data.revisions)
						{
							_cb(data);
						}
					});
				});
		}