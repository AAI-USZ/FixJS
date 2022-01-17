function ()
		{
			var name, data, control, i;

			for (i = 0; i < options.control.length; i++)
			{
				name = options.control[i];
				data = r.module.editor.controls[name];
				
				/* append divider */
				
				if (name === 'divider')
				{
					$('<div class="js_editor_divider editor_divider"></div>').appendTo(editor.toolbar);
				}

				else if (name === 'newline')
				{
					$('<div class="js_editor_newline editor_newline"></div>').appendTo(editor.toolbar);
				}

				/* append toggler */

				else if (name === 'toggle')
				{
					editor.toggler = control = $('<div class="js_editor_control editor_control editor_control_source_code" title="' + data.title + '"></div>').appendTo(editor.toolbar);
				}

				/* append serveral controls */
	
				else if (data)
				{
					control = $('<div class="js_editor_control editor_control editor_control_' + name + '" title="' + data.title + '"></div>').appendTo(editor.toolbar);
				}

				/* setup control events */

				if (data)
				{
					control.data('data', data).mousedown(function ()
					{
						data = $(this).data('data');

						/* call methode */

						editor[data.methode](data.command, data.message, data.value);
						editor.post();
					});
				}
			}
		}