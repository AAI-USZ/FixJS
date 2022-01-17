function(event) {
					var element = document.id(('ctrl_'+event.target.get('value')));

					if (element.match('.tl_checkbox_single_container'))
					{
						element.getFirst('input').disabled = event.target.checked;
					}
					else
					{
						element.setStyle('display', (event.target.checked ? 'none' : 'initial'));
						element.getNext(':not(.tl_tip)').setStyle('display', (event.target.checked ? 'none' : 'initial'));
					}
				}