function(evt){
			var ctrl = $(evt.target);
			var child = $("#" + ctrl.attr("childcontrol"));
			child.attr('parentvalue', ctrl.val());
			child.attr('parentfield', ctrl.attr('id'));

		}