function() {

			// check for native browser support, if it's there don't set anything up

			if(this.options.allowNative && 'placeholder' in document.createElement('input')){

				return;

			}

			var o = this.options,

				input = this.element,

				widgetName = this.widgetName,

				placeholder = $.isFunction(o.placeholder) ? o.placeholder.apply(this.element[0]) : o.placeholder;

			

			if(!placeholder){return;}



			input.wrap("<span/>").parent().addClass("ui-watermark-container ui-watermark-" + input[0].tagName.toLowerCase());

			var label = (this.label = $('<label for="' + input.attr("id") + '">' + placeholder + '</label>').insertBefore(input));

			label.addClass("ui-watermark-label");

			label.css({

				left: parseInt(input.css("borderLeftWidth"),10) + parseInt(input.css("paddingLeft"),10),

				top: parseInt(input.css("borderTopWidth"),10) + parseInt(input.css("paddingTop"),10),

				overflow: 'hidden',

				width: input.width()

			});

			if (input.val()) {

				label.hide();

			}

			input.bind("focus." + widgetName, function() {

				if (!o.disabled && !this.value) { o.animate ? label.fadeTo("fast",o.opacity) : label.hide(); }

			}).bind("blur." + widgetName, function() {

				if (!o.disabled && !this.value) { o.animate ? label.fadeTo("fast",1) : label.show(); }

			}).bind("keyup." + widgetName+" change." + widgetName, function(e) {

				if(this.value){label.hide();} else {label.show();}

			});

		}