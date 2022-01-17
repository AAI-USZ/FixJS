function() {
		!this.src && this.init();
		
		var img, 
			opts = {
				rtl : rte.rtl,
				submit : function(e, d) { 
					e.stopPropagation(); 
					e.preventDefault(); 
					self.set(); 

					dialog.close(); 
				},
				close : function() {

					bookmarks && rte.selection.moveToBookmark(bookmarks)
				},
				dialog : {
					autoOpen  : false,
					width     : 500,
					position  : 'top',
					title     : rte.i18n('Image'),
					resizable : true,
					open      : function() {
						$.fn.resizable && $(this).parents('.ui-dialog:first').resizable('option', 'alsoResize', '.elrte-image-preview');
					}
				}
			},
			dialog = new elDialogForm(opts),
			fm = !!rte.options.fmOpen,
			src = fm
				? $('<div class="elrte-image-src-fm"><span class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-folder-open"></span></span></div>')
					.append(this.src.main.src.css('width', '87%'))
				: this.src.main.src;
			
			;
		
		reset();
		this.preview.children('img').remove();
		this.prevImg = null;
		img = rte.selection.getEnd();
		
		this.img = img.nodeName == 'IMG' && !$(img).is('.elrte-protected')
			? $(img)
			: $('<img/>');
		
		bookmarks = rte.selection.getBookmark();

		if (fm) {
			src.children('.ui-state-default')
				.click( function() {
					rte.options.fmOpen( function(url) { self.src.main.src.val(url).change() } );
				})
				.hover(function() {
					$(this).toggleClass('ui-state-hover');
				});
		}
		
		dialog.tab('main', this.rte.i18n('Properies'))
			.append([this.rte.i18n('Image URL'), src],                 'main', true)
			.append([this.rte.i18n('Title'),     this.src.main.title], 'main', true)
			.append([this.rte.i18n('Alt text'),  this.src.main.alt],   'main', true)
			.append([this.rte.i18n('Size'), $('<span />').append(this.src.main.width).append(' x ').append(this.src.main.height).append(' px')], 'main', true)
			.append([this.rte.i18n('Alignment'), this.src.main.align],  'main', true)
			.append([this.rte.i18n('Margins'),   this.src.main.margin], 'main', true)
			.append([this.rte.i18n('Border'),    this.src.main.border], 'main', true)
		
		dialog.append($('<fieldset><legend>'+this.rte.i18n('Preview')+'</legend></fieldset>').append(this.preview), 'main');
		
		
		
		$.each(this.src, function(tabname, elements) {
		
			if (tabname == 'main') {
				return;
			}
			dialog.tab(tabname, rte.i18n(self.labels[tabname]));
			
			$.each(elements, function(name, el) {
				self.src[tabname][name].val(tabname == 'events' ? rte.utils.trimEventCallback(self.img.attr(name)) : self.img.attr(name)||'');
				dialog.append([rte.i18n(self.labels[name] || name), self.src[tabname][name]], tabname, true);
			});
		});
		
		dialog.open();		
		
		if (this.img.attr('src')) {
			values(this.img);
			this.prevImg = this.img.clone().prependTo(this.preview);
			proportion   = (this.img.width()/this.img.height()).toFixed(2);
			width        = parseInt(this.img.width());
			height       = parseInt(this.img.height());
		}
	}