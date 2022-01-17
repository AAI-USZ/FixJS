function(props) {
			var buttons = props.buttons || {};
			buttons['Yes'] = buttons['Yes'] || props.yes || $.noop;
			buttons['No']  = buttons['No']  || props.no  || $.noop;
			if (props.answer) {
				var yes = buttons['Yes'];
				var no  = buttons['No'];
				buttons['Yes'] = function(){
					yes();
					props.answer(true);
				};
				buttons['No'] = function(){
					no();
					props.answer(false);
				};
			}
			var dialog = makeDialogDiv(props).dialog(
				$.extend(makeDialogProps(props, 'Confirm'), {
					'buttons': wrapDialogButtons(buttons)
				})
			);
			return function() {
				dialog.dialog('destroy');
			};
		}