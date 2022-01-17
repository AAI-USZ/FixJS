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
					
				if (form.lastCheck)
				{
					var end = form.boxes.index(form.lastCheck);
				}
					
				if (checked === false)
				{
					if (e.shiftKey && form.lastCheck)
					{
						var start = form.boxes.index(box);
						
						public.select({
							'range' : [Math.min(start, end), Math.max(start, end)+1]
						});
					}
					
					else if (!self)
					{
						box.prop('checked', true).change();
					}
					
					form.lastCheck = box;
				}
				
				else
				{
					if (e.shiftKey && form.lastCheck)
					{
						var start = form.boxes.index(box);
						
						public.select({
							'range' : [Math.min(start, end), Math.max(start, end)+1],
							'checked' : false
						});
					}
					else if (!self)
					{
						box.prop('checked', false).change();
					}
				
					form.lastCheck = null;
				}
			}