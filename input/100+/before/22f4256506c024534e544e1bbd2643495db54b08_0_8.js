function(evt){
			var ctrl = $(evt.target);
			var child = $("#" + ctrl.attr("childcontrol"));
			
			$("option", child).hide();
			$("option[parentvalue=" + ctrl.val() + "]", child).show();
			
			// if this means the current value is hidden
			if($("option[value=" + child.val() + "]", child).css("display") == "none")
			{
				opts = $("option", child);
				
				for(var i = 0; i < opts.length; i++)
				{
					if($(opts[i]).css("display") != "none") child.val(opts[i].value);
				}
			}
		}