function(method, options)
{
	var args = {}, opt;

	var defaults = {
		'checkbox' : 'input[name="selected[]"][type=checkbox]',
		'row' : 'tbody td',
		'highlighted' : 'tr',
		'selectedClass' : 'selected',
		'actions' : 'select[name=edit_method]',
		'submitButton' : '.multi-edit input[type=submit]',
		'selectAll' : 'input[name=select_all][type=checkbox]',
		'rowClick' : true,
		'altClick' : true,
		'confirmation' : textpattern.gTxt('are_you_sure')
	};

	if ($.type(method) !== 'string')
	{
		options = method;
		method = null;
	}
	else
	{
		args = options;
	}

	opt = options;

	this.closest('form').each(function() {

		var $this = $(this), form = {}, public = {}, private = {};
		
		if ($this.data('_txpMultiEdit'))
		{
			form = $this.data('_txpMultiEdit');
			opt = $.extend(form.opt, opt);
		}
		
		else
		{
			opt = $.extend(defaults, opt);
			form.pattern = opt.checkbox;
			form.editMethod = $this.find(opt.actions);
			form.lastCheck = null;
			form.opt = opt;
			form.selectAll = $this.find(opt.selectAll);
			form.button = $this.find(opt.submitButton);
		}

		/**
		 * Registers multi-edit options
		 * @param string label
		 * @param string value HTML Option's value
		 * @param obj|string html Object or HTML markup used as for the action's second step. NULL to skip 2nd step.
		 * @return obj this
		 */

		public.addOption = function(options)
		{
			var settings = $.extend({
				'label' : null,
				'value' : null,
				'html' : null
			}, options);

			var option = form.editMethod.find('option').filter(function() {
				return $(this).attr('value') === settings.value;
			});
			
			var exists = (option.length > 0);
			form.editMethod.val('');
			
			if (!exists)
			{
				option = $('<option />');
			}
			
			if (!option.data('method'))
			{
				if (!option.attr('value'))
				{
					option.attr('value', settings.value);
				}
				
				if (!option.text() && settings.label)
				{
					option.text(settings.label);
				}
				
				option.data('method', settings.html);
			}
			
			if (!exists)
			{
				form.editMethod.append(option);
			}
			
			return public;
		};
		
		/**
		 * Selects rows based on supplied arguments. Only one of the filters applies at time.
		 * @param array index Select based on row's index.
		 * @param array range [min, max] Select based on index range.
		 * @param array value [value1, value2, value3, ...]
		 * @param bool checked Set matched checked or unchecked. FALSE to uncheck.
		 */
		
		public.select = function(options)
		{
			var settings = $.extend({
				'index' : null,
				'range' : null,
				'value' : null,
				'checked' : true
			}, options);
			
			var obj = $this.find(form.pattern);
			
			if (settings.value !== null)
			{
				obj = obj.filter(function() {
					return $.inArray($(this).attr('value'), settings.value) !== -1;
				});
			}
			
			else if (settings.index !== null)
			{
				obj = obj.filter(function(index) {
					return $.inArray(index, settings.index) !== -1;
				});
			}
			
			else if (settings.range !== null)
			{
				obj = obj.slice(settings.range[0], settings.range[1]);
			}
		
			obj.prop('checked', settings.checked).change();
			return public;
		};
		
		/**
		 * Binds checkboxes
		 */
		
		private.bindRows = function()
		{
			form.rows = $this.find(opt.row);
			form.boxes = $this.find(form.pattern);
			return private;
		};
		
		/**
		 * Highlights selected rows
		 */
		
		private.highlight = function()
		{
			form.boxes.filter(':checked').closest(opt.highlighted).addClass(opt.selectedClass);
			form.boxes.filter(':not(:checked)').closest(opt.highlighted).removeClass(opt.selectedClass);
			return private;
		};
		
		/**
		 * Extends click region to whole row
		 */
		
		private.extendedClick = function()
		{
			if (opt.rowClick)
			{
				var obj = form.rows;
			}
			else
			{
				var obj = form.boxes;
			}

			obj.live('click', function(e) {
			
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
			});
			
			return private;
		};
		
		/**
		 * Tracks row checks
		 */
		
		private.checked = function()
		{
			form.boxes.live('change', function(e) {
				var box = $(this);
				
				if (box.prop('checked'))
				{
					$(this).closest(opt.highlighted).addClass(opt.selectedClass);
					form.selectAll.prop('checked', form.boxes.filter(':checked').length === form.boxes.length);
				}
				else
				{
					$(this).closest(opt.highlighted).removeClass(opt.selectedClass);
					form.selectAll.prop('checked', false);
				}
			});
			
			return private;
		};
		
		/**
		 * Handles edit method selecting
		 */
		
		private.changeMethod = function()
		{
			form.button.hide();

			form.editMethod.val('').change(function(e) {
				var selected = $(this).find('option:selected');
				$this.find('.multi-step').remove();

				if (selected.length < 1 || selected.val() === '')
				{
					form.button.hide();
					return private;
				}

				if (selected.data('method'))
				{
					$(this).after($('<div />').attr('class', 'multi-step multi-option').html(selected.data('method')));
					form.button.show();
				}
				else 
				{
					form.button.hide();
					$(this).parents('form').submit();
				}
			});

			return private;
		};

		/**
		 * Handles sending
		 */

		private.sendForm = function()
		{
			$this.submit(function() {
				if (opt.confirmation !== false && verify(opt.confirmation) === false)
				{
					form.editMethod.val('').change();
					return false;
				}
			});

			return private;
		};

		if(!$this.data('_txpMultiEdit'))
		{
			private.bindRows().highlight().extendedClick().checked().changeMethod().sendForm();

			$this.find('.multi-option:not(.multi-step)').each(function() {
				public.addOption({
					'label' : null,
					'html' : $(this).contents(),
					'value' : $(this).attr('id').substring(13)
				});
			}).remove();

			form.selectAll.live('change', function(e) {
				public.select({
					'checked' : $(this).prop('checked')
				});
			});
		}

		if (method && public[method])
		{
			public[method].call($this, args);
		}

		$this.data('_txpMultiEdit', form);
	});

	return this;
}