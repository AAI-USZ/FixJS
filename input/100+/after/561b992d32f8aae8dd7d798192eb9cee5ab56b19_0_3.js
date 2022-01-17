function(e) {

				var self = ($(e.target).is(form.pattern) || $(this).is(form.pattern));

				if (!self && (e.target != this || $(this).is('a, :input') || $(e.target).is('a, :input')))
				{
					return;
				}

				if (!self && opt.altClick && !e.altKey && !e.ctrlKey)
				{
					return;
				}

				var box = $(this).closest(opt.highlighted).find(form.pattern);

				if (box.length < 1)
				{
					return;
				}

				private.bindRows();

				var checked = box.prop('checked');

				if (self)
				{
					checked = !checked;
				}

				if (e.shiftKey && form.lastCheck)
				{
					var start = form.boxes.index(box);
					var end = form.boxes.index(form.lastCheck);

					public.select({
						'range' : [Math.min(start, end), Math.max(start, end)+1],
						'checked' : !checked
					});
				}
				else if (!self)
				{
					box.prop('checked', !checked).change();
				}

				if (checked === false)
				{
					form.lastCheck = box;
				}
				else
				{
					form.lastCheck = null;
				}
			}