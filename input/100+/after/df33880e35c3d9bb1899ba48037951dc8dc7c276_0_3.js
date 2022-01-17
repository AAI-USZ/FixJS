function(action, name) {

				var $label = 0;

				var btnId = [action, this.config.id].join('-');

				

				var $btn = $('<button />')

							.append(name)

							.addClass(action)

							.attr({'title':action, 'id':btnId})

							.addClass('ui-corner-all ui-state-default')

							.hover(function() {

									$(this).addClass("ui-state-hover");

								},

								function() {

									$(this).removeClass("ui-state-hover"); 

								})

							.focus(function() {

									$(this).addClass("ui-state-focus");

								})

							.blur(function() {

									$(this).removeClass("ui-state-focus"); 

								})

							.click(function(e){

									e.preventDefault();

								});

				

				return $btn;

			}