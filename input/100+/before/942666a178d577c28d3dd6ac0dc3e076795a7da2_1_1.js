function(){
				var s = $('.slides>section');
				var slides = {};
				
				s.each(function(idx, slide){
					slide = $(slide);
					if($('section', slide).length) {
						slides['slide'+idx] = [];
						$('section', slide).each(function(i, sl){
							slides['slide'+idx].push($(sl).html());
						});
					} else {
						slides['slide'+idx] = '<section>' + $('span', slide).html() + '</section>';
					}
				});

				$.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR) {
				var url = opts.url;

				return {
					send: function(_, completeCallback) {
					var name = 'jQuery_iframe_' + jQuery.now(),
					iframe, form;

					iframe = $('<iframe>')
						.attr('name', name)
						.appendTo('head');

					form = $('<form>')
						.attr('method', opts.type) // GET or POST
						.attr('action', url)
						.attr('target', name);

					$.each(opts.params, function(k, v) {

						$('<input>')
						.attr('type', 'hidden')
						.attr('name', k)
						.attr('value', typeof v == 'string' ? v : JSON.stringify(v))
						.appendTo(form);
					});

					form.appendTo('body').submit();
					}
				};
				});
				
				$.ajax({
					  type: 'POST'
					, url : '.'
					, dataType : 'jsonpi'
					, params : {
						slides : slides
					}
				});

			}