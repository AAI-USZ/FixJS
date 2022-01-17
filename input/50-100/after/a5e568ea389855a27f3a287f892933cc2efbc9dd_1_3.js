function() {
				var linked = !$('#tool_node_link').hasClass('checked');
				if (linked)
					$('#tool_node_link').addClass('checked').find("input").attr("checked", true);
				else
					$('#tool_node_link').removeClass('checked').find("input").attr("checked", false);
					
				path.linkControlPoints(linked);
			}