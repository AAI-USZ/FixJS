function (elm) {
			var $tabs,
				$panels,
				$accordion,
				$collapsible
				
			// Convert html elements and attributes into the format the jQuery mobile accordian plugin expects.
			// Get the content out of the html structure tabbedinterface usually expects.
			$panels = elm.find(".tabs-panel").children();
			// Create the accordion structure to move the content to.
			$accordion = $('<div data-role="collapsible-set" data-content-theme="b" data-theme="b"/>');
			if ($panels.filter(".default").length < 1){
				$panels.filter(":first").addClass("default");
			}
			elm.find(".tabs").remove();
			$panels.each(function(){
				var $p = $(this);
				$collapsible = $('<div data-role="collapsible"/>');
				$collapsible.append($p.find(":header:first").parent().html());
				if ($p.hasClass('default')) {
					$collapsible.attr('data-collapsed', 'false');
				}
				$accordion.append($collapsible);
			});
			elm.empty().append($accordion);
			return elm;
		}