function (elm) {
			var $tabs,
				$panels,
				$accordion,
				i,
				$collapsible;
			// Convert html elements and attributes into the format the jQuery mobile accordian plugin expects.
			// Get the content out of the html structure tabbedinterface usually expects.
			$tabs = elm.find(".tabs li > a");
			$panels = elm.find(".tabs-panel").children();
			// Create the accordion structure to move the content to.
			$accordion = $('<div data-role="collapsible-set" data-content-theme="b" data-theme="b"/>');
			for (i = 0; i < $tabs.length; i += 1) {
				$collapsible = $('<div data-role="collapsible"/>');
				$collapsible.append('<h2>' + $tabs.eq(i).text() + '</h2>');
				$collapsible.append($panels.eq(i).html());
				if ($tabs.eq(i).parent().hasClass('default')) {
					$collapsible.attr('data-collapsed', 'false');
				}
				$accordion.append($collapsible);
			}
			elm.replaceWith($accordion);
			return elm;
		}