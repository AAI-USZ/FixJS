function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			var focusBorder, focusFGColorNight, focusBGColor, focusBGColorNight;
			if (typeof(this.options.focusBorder) == 'undefined') {
				focusBorder = '1px dashed #888888';
			} else {
				focusBorder = this.options.focusBorder.value;
			}
			if (typeof(this.options.focusBGColor) == 'undefined') {
				focusBGColor = '#F0F3FC';
			} else {
				focusBGColor = this.options.focusBGColor.value;
			}
			if (!(this.options.focusBGColorNight.value)) {
				focusBGColorNight = '#666';
			} else {
				focusBGColorNight = this.options.focusBGColorNight.value;
			}
			if (!(this.options.focusFGColorNight.value)) {
				focusFGColorNight = '#DDD';
			} else {
				focusFGColorNight = this.options.focusFGColorNight.value;
			}

			var borderType = 'outline';
			if (typeof(opera) != 'undefined') borderType = 'border';
			RESUtils.addCSS(' \
				.keyHighlight { '+borderType+': '+focusBorder+'; background-color: '+focusBGColor+'; } \
				.res-nightmode .keyHighlight, .res-nightmode .keyHighlight .usertext-body, .res-nightmode .keyHighlight .usertext-body .md, .res-nightmode .keyHighlight .usertext-body .md p, .res-nightmode .keyHighlight .noncollapsed, .res-nightmode .keyHighlight .noncollapsed .md, .res-nightmode .keyHighlight .noncollapsed .md p { background-color: '+focusBGColorNight+' !important; color: '+focusFGColorNight+' !important;} \
				.res-nightmode .keyHighlight a.title:first-of-type {color: ' + focusFGColorNight + ' !important; } \
				#keyHelp { display: none; position: fixed; height: 90%; overflow-y: auto; right: 20px; top: 20px; z-index: 1000; border: 2px solid #AAAAAA; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px; width: 300px; padding: 5px; background-color: #ffffff; } \
				#keyHelp th { font-weight: bold; padding: 2px; border-bottom: 1px dashed #dddddd; } \
				#keyHelp td { padding: 2px; border-bottom: 1px dashed #dddddd; } \
				#keyHelp td:first-child { width: 70px; } \
				#keyCommandLineWidget { font-size: 14px; display: none; position: fixed; top: 200px; left: 50%; margin-left: -275px; z-index: 9999; width: 550px; border: 3px solid #555555; border-radius: 10px 10px 10px 10px; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px 10px 10px 10px; padding: 10px; background-color: #333333; color: #CCCCCC; opacity: 0.95; } \
				#keyCommandInput { width: 240px; background-color: #999999; margin-right: 10px; } \
				#keyCommandInputTip { margin-top: 5px; color: #99FF99; } \
				#keyCommandInputTip ul { font-size: 11px; list-style-type: disc; }  \
				#keyCommandInputTip li { margin-left: 15px; }  \
				#keyCommandInputError { margin-top: 5px; color: red; font-weight: bold; } \
				.keyNavAnnotation { font-size: 9px; position: relative; top: -6px; } \
			');
		}
	}