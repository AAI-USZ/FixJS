function(name, i)
		{
			var el = document.id(('ctrl_'+name));

			if (el)
			{
				var parent = el.getParent('div').getFirst('h3');

				if (!parent && el.match('.tl_checkbox_single_container'))
				{
					parent = el;
				}

				if (!parent)
				{
					injectError = true;
					return;
				}

				parent.addClass('inherit');

				var check = document.id('ctrl_inherit').getFirst(('input[value='+name+']'));

				check.setStyle('float', 'right').inject(parent);
				document.id('ctrl_inherit').getFirst(('label[for='+check.get('id')+']')).setStyles({'float':'right','padding-right':'5px', 'font-weight':'normal'}).set('text', label).inject(parent);

				check.addEvent('change', function(event) {
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
				});

				if (el.match('.tl_checkbox_single_container'))
				{
					el.getFirst('input').readonly = check.checked;
				}
				else
				{
					el.setStyle('display', (check.checked ? 'none' : 'initial'));
					el.getNext(':not(.tl_tip)').setStyle('display', (check.checked ? 'none' : 'initial'));
				}
			}
		}