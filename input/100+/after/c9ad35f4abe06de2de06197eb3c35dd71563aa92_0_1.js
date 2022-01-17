function() {
		var rem, sidebars = $('div.widgets-sortables'), isRTL = !! ( 'undefined' != typeof isRtl && isRtl ),
			margin = ( isRtl ? 'marginRight' : 'marginLeft' ), the_id;

		$('#widgets-right').children('.widgets-holder-wrap').children('.sidebar-name').click(function(){
			var c = $(this).siblings('.widgets-sortables'), p = $(this).parent();
			if ( !p.hasClass('closed') ) {
				c.sortable('disable');
				p.addClass('closed');
			} else {
				p.removeClass('closed');
				c.sortable('enable').sortable('refresh');
			}
		});

		$('#widgets-left').children('.widgets-holder-wrap').children('.sidebar-name').click(function() {
			$(this).parent().toggleClass('closed');
		});

		sidebars.each(function(){
			if ( $(this).parent().hasClass('inactive') )
				return true;

			var h = 50, H = $(this).children('.widget').length;
			h = h + parseInt(H * 48, 10);
			$(this).css( 'minHeight', h + 'px' );
		});

		$('a.widget-action').live('click', function(){
			var css = {}, widget = $(this).closest('div.widget'), inside = widget.children('.widget-inside'), w = parseInt( widget.find('input.widget-width').val(), 10 );

			if ( inside.is(':hidden') ) {
				if ( w > 250 && inside.closest('div.widgets-sortables').length ) {
					css['width'] = w + 30 + 'px';
					if ( inside.closest('div.widget-liquid-right').length )
						css[margin] = 235 - w + 'px';
					widget.css(css);
				}
				wpWidgets.fixLabels(widget);
				inside.slideDown('fast');
			} else {
				inside.slideUp('fast', function() {
					widget.css({'width':'', margin:''});
				});
			}
			return false;
		});

		$('input.widget-control-save').live('click', function(){
			wpWidgets.save( $(this).closest('div.widget'), 0, 1, 0 );
			return false;
		});

		$('a.widget-control-remove').live('click', function(){
			wpWidgets.save( $(this).closest('div.widget'), 1, 1, 0 );
			return false;
		});

		$('a.widget-control-close').live('click', function(){
			wpWidgets.close( $(this).closest('div.widget') );
			return false;
		});

		sidebars.children('.widget').each(function() {
			wpWidgets.appendTitle(this);
			if ( $('p.widget-error', this).length )
				$('a.widget-action', this).click();
		});

		$('#widget-list').children('.widget').draggable({
			connectToSortable: 'div.widgets-sortables',
			handle: '> .widget-top > .widget-title',
			distance: 2,
			helper: 'clone',
			zIndex: 100,
			containment: 'document',
			start: function(e,ui) {
				ui.helper.find('div.widget-description').hide();
				the_id = this.id;
			},
			stop: function(e,ui) {
				if ( rem )
					$(rem).hide();

				rem = '';
			}
		});

		sidebars.sortable({
			placeholder: 'widget-placeholder',
			items: '> .widget',
			handle: '> .widget-top > .widget-title',
			cursor: 'move',
			distance: 2,
			containment: 'document',
			start: function(e,ui) {
				ui.item.children('.widget-inside').hide();
				ui.item.css({margin:'', 'width':''});
			},
			stop: function(e,ui) {
				if ( ui.item.hasClass('ui-draggable') && ui.item.data('draggable') )
					ui.item.draggable('destroy');

				if ( ui.item.hasClass('deleting') ) {
					wpWidgets.save( ui.item, 1, 0, 1 ); // delete widget
					ui.item.remove();
					return;
				}

				var add = ui.item.find('input.add_new').val(),
					n = ui.item.find('input.multi_number').val(),
					id = the_id,
					sb = $(this).attr('id');

				ui.item.css({margin:'', 'width':''});
				the_id = '';

				if ( add ) {
					if ( 'multi' == add ) {
						ui.item.html( ui.item.html().replace(/<[^<>]+>/g, function(m){ return m.replace(/__i__|%i%/g, n); }) );
						ui.item.attr( 'id', id.replace('__i__', n) );
						n++;
						$('div#' + id).find('input.multi_number').val(n);
					} else if ( 'single' == add ) {
						ui.item.attr( 'id', 'new-' + id );
						rem = 'div#' + id;
					}
					wpWidgets.save( ui.item, 0, 0, 1 );
					ui.item.find('input.add_new').val('');
					ui.item.find('a.widget-action').click();
					return;
				}
				wpWidgets.saveOrder(sb);
			},
			receive: function(e, ui) {
				var sender = $(ui.sender);

				if ( !$(this).is(':visible') || this.id.indexOf('orphaned_widgets') != -1 )
					sender.sortable('cancel');

				if ( sender.attr('id').indexOf('orphaned_widgets') != -1 && !sender.children('.widget').length ) {
					sender.parents('.orphan-sidebar').slideUp(400, function(){ $(this).remove(); });
				}
			}
		}).sortable('option', 'connectWith', 'div.widgets-sortables').parent().filter('.closed').children('.widgets-sortables').sortable('disable');

		$('#available-widgets').droppable({
			tolerance: 'pointer',
			accept: function(o){
				return $(o).parent().attr('id') != 'widget-list';
			},
			drop: function(e,ui) {
				ui.draggable.addClass('deleting');
				$('#removing-widget').hide().children('span').html('');
			},
			over: function(e,ui) {
				ui.draggable.addClass('deleting');
				$('div.widget-placeholder').hide();

				if ( ui.draggable.hasClass('ui-sortable-helper') )
					$('#removing-widget').show().children('span')
					.html( ui.draggable.find('div.widget-title').children('h4').html() );
			},
			out: function(e,ui) {
				ui.draggable.removeClass('deleting');
				$('div.widget-placeholder').show();
				$('#removing-widget').hide().children('span').html('');
			}
		});
	}