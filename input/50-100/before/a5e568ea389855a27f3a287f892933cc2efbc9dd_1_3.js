function() {
				var linked = !$('#tool_node_link').hasClass('push_button_pressed');
				if (linked)
					$('#tool_node_link').addClass('push_button_pressed').removeClass('tool_button').find("input").attr("checked", true);
				else
					$('#tool_node_link').removeClass('push_button_pressed').addClass('tool_button').find("input").attr("checked", false);
					
				path.linkControlPoints(linked);
			}