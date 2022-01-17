function(ed, url) {
			var t = this, s, v, o;

			t.editor = ed;
			t.url = url;
			t.onResolveName = new tinymce.util.Dispatcher(this);

			// Default settings
			t.settings = s = extend({
				theme_nos_path : true,
				theme_nos_toolbar_location : 'external',
		        theme_nos_toolbar_align : "left",
		        theme_nos_statusbar_location : "bottom",

                theme_nos_buttons1 : "tablecontrols",
                theme_nos_buttons2 : "underline,strikethrough,sub,sup,|,forecolor,backcolor,|,outdent,indent,blockquote,|,anchor,charmap,hr,nonbreaking,brclearall,|,styleprops,removeformat",
                theme_nos_buttons3 : "search,replace,|,spellchecker,|,newdocument,visualhtmlcontrols,code",
                theme_nos_buttons4 : "image,nosmedia,linkcontrols,enhancer",
                theme_nos_buttons5 : "styleselect,bold,italic,justifycontrols,bullist,numlist,|,cut,copy,pastecontrols,undo,redo,|,toolbar_toggle",

                theme_nos_style_formats : [
                    { block : 'p', title : 'nos.paragraph'},
                    { block : 'address', title : 'nos.address'},
                    { block : 'pre', title : 'nos.pre'},
                    { block : 'h1', title : 'nos.h1'},
                    { block : 'h2', title : 'nos.h2'},
                    { block : 'h3', title : 'nos.h3'},
                    { block : 'h4', title : 'nos.h4'},
                    { block : 'h5', title : 'nos.h5'},
                    { block : 'h6', title : 'nos.h6'},
                    { block : 'div', title : 'nos.div'},
                    { block : 'blockquote', title : 'nos.blockquote'},
                    { block : 'code', title : 'nos.code'},
                    { block : 'dt', title : 'nos.dt'},
                    { block : 'dd', title : 'nos.dd'},
                    { block : 'samp', title : 'nos.samp'}
                ],
				theme_nos_blockformats : "p,address,pre,h1,h2,h3,h4,h5,h6",
				theme_nos_fonts : "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
				theme_nos_more_colors : 1,
				theme_nos_row_height : 23,
				theme_nos_resize_horizontal : 1,
				theme_nos_resizing_use_cookie : 1,
				theme_nos_font_sizes : "1,2,3,4,5,6,7",
				theme_nos_font_selector : "span",
				theme_nos_show_current_color: 0,
				theme_nos_enhancers : [],
				readonly : ed.settings.readonly
			}, ed.settings);

			// Setup default font_size_style_values
			if (!s.font_size_style_values)
				s.font_size_style_values = "8pt,10pt,12pt,14pt,18pt,24pt,36pt";

            if (s.theme_nos_enhancers) {
                each(s.theme_nos_enhancers, function(f, id) {
                    s.theme_nos_enhancers[id].id = id;
                });
            }

            if (tinymce.is(s.theme_nos_font_sizes, 'string')) {
				s.font_size_style_values = tinymce.explode(s.font_size_style_values);
				s.font_size_classes = tinymce.explode(s.font_size_classes || '');

				// Parse string value
				o = {};
				ed.settings.theme_nos_font_sizes = s.theme_nos_font_sizes;
				each(ed.getParam('theme_nos_font_sizes', '', 'hash'), function(v, k) {
					var cl;

					if (k == v && v >= 1 && v <= 7) {
						k = v + ' (' + t.sizes[v - 1] + 'pt)';
						cl = s.font_size_classes[v - 1];
						v = s.font_size_style_values[v - 1] || (t.sizes[v - 1] + 'pt');
					}

					if (/^\s*\./.test(v))
						cl = v.replace(/\./g, '');

					o[k] = cl ? {'class' : cl} : {fontSize : v};
				});

				s.theme_nos_font_sizes = o;
			}

			if ((v = s.theme_nos_path_location) && v != 'none')
				s.theme_nos_statusbar_location = s.theme_nos_path_location;

			if (s.theme_nos_statusbar_location == 'none')
				s.theme_nos_statusbar_location = 0;

			if (ed.settings.content_css !== false)
				ed.contentCSS.push(ed.baseURI.toAbsolute(url + "/skins/" + ed.settings.skin + "/content.css"));

			// Init editor
			ed.onInit.add(function() {
				if (!ed.settings.readonly) {
					ed.onNodeChange.add(t._nodeChanged, t);
					ed.onKeyUp.add(t._updateUndoStatus, t);
					ed.onMouseUp.add(t._updateUndoStatus, t);
					ed.dom.bind(ed.dom.getRoot(), 'dragend', function() {
						t._updateUndoStatus(ed);
					});
				}
			});

			var self = this;

            ed.addButton('nosmedia', {
                title : 'nos.media_title',
                label : 'nos.media_label',
                'class' : 'mce_media',
                cmd : 'mceMedia'
            });

			function makeItNice(ed) {

                var $body = $(ed.getBody());
				// Rebuilds the enhancer, as if we just inserted them (adds the action links like delete)
				$body.find('.nosEnhancer, .nosEnhancerInline').each(function() {
					var enhancer = $(this);
                    enhancer.html('Loading...');

					var enhancer_id = $(this).data('enhancer');
					var metadata  = self.settings.theme_nos_enhancers[enhancer_id];
					var data      = $(this).data('config');
					$.ajax({
						url: metadata.previewUrl,
						type: 'POST',
						dataType: 'json',
						data: data,
						success: function(json) {
                            enhancer.html(json.preview);
							self.onEnhancerAdd(enhancer, metadata);
						},
						error: function() {
                            enhancer.html('Error when loading the preview of the application');
						}
					});
				});
			}

			// When editing HTML content, we clean up enhancer preview, we'll make them nice again after
			ed.onGetContent.add(function(ed, o) {
				var content = $(o.content);
				// Empty enhancer previews (data and useful informations are stored as html attributes on the higest div)
				content.filter('.nosEnhancer, .nosEnhancerInline').empty();
				content.find('.nosEnhancer, .nosEnhancerInline').empty();

                // Replace image SRC
				content.find('img').filter(function() {
					return $(this).data('mediaId') || ($(this).data('media') || {}).id;
				}).replaceWith(function() {
					var $img = $(this);
					var media = $img.data('media');
                    var media_id = (media && media.id) ? media.id : $img.data('mediaId');
					var src = 'nos://media/' + media_id;

					if ($img.attr('width') && $img.attr('height')) {
						src += '/' + $img.attr('width') + '/' + $img.attr('height');
					}
					return $('<img />').attr({
                        'data-media-id': media_id,
						src:    $img.attr('src'),
						title:  $img.attr('title'),
						alt:    $img.attr('alt'),
						style:  $img.attr('style')
					})
				});

				o.content = $('<div></div>').append(content).html();
			});

			ed.onSetContent.add(function(ed, o) {
				setTimeout(function() {
					makeItNice(ed);
				}, 1);
			});

            // Previously "onSaveContent". But it seems useless...
			ed.onPostProcess.add(function(ed, o) {
				var content = $(o.content);

				content.find('img').filter(function() {
					return $(this).data('mediaId') || ($(this).data('media') || {}).id;// || $(this).attr('src').substr(0, 12) == 'nos://media/';
				}).replaceWith(function() {
					var $img = $(this);
					var media = $img.data('media');
                    var media_id = (media && media.id) ? media.id : $img.data('media-id');
					var src = 'nos://media/' + media_id;

					if ($img.attr('width') && $img.attr('height')) {
						src += '/' + $img.attr('width') + '/' + $img.attr('height');
					}
					var $new_img = $('<img />').attr({
						src:    src,
						title:  $img.attr('title'),
						alt:    $img.attr('alt'),
						style:  $img.attr('style')
					});
                    return $new_img;
				});
				o.content = $('<div></div>').append(content).html();
			});

			// Global onClick handlers to execute actions from the enhancers
			// We need that to play nicefully with undo/redo
			ed.onClick.add(function(ed, e) {
				var target = $(e.target);
				var action = target.data('action');

				// Enhancers are non-editable, so we can't add new paragraphs by pressing "Enter"
				// This allow insertion before or after the display:block enhancer

                var p = null;

				// Add a new paragraph before a display:block enhancer
				if (action == 'addParagraphBefore') {
					p = $('<p>New paragraph</p>');
					target.closest('.nosEnhancer, .nosEnhancerInline').before(p);
					// All 3 commands are needed to select the node and focus the editor
					ed.selection.select(p.get(0), true);
					ed.focus(false);
					ed.execCommand('mceSelectNode', false, p.get(0), {skip_undo : 1});
					// Tell undoManager to add a checkpoint
					ed.execCommand("mceEndUndoLevel");
					e.preventDefault();
				}

				// Add a new paragraph after a display:block enhancer
				if (action == 'addParagraphAfter') {
					p = $('<p>New paragraph</p>');
					target.closest('.nosEnhancer, .nosEnhancerInline').after(p);
					// All 3 commands are needed to select the node and focus the editor
					ed.selection.select(p.get(0), true);
					ed.focus(false);
					ed.execCommand('mceSelectNode', false, p.get(0), {skip_undo : 1});
					// Tell undoManager to add a checkpoint
					ed.execCommand("mceEndUndoLevel");
					e.preventDefault();
				}

				if (action == 'editEnhancer') {
                    var enhancer   = target.closest('.nosEnhancer, .nosEnhancerInline');
                    var metadata = self.settings.theme_nos_enhancers[$(enhancer).data('enhancer')];
					self._nosEnhancer(null, metadata, enhancer);
					e.preventDefault();
				}

				if (action == 'removeEnhancer') {
					target.closest('.nosEnhancer, .nosEnhancerInline').remove();
					// Tell undoManager to add a checkpoint
					ed.execCommand("mceEndUndoLevel");
					e.preventDefault();
				}
			});

			ed.onSetProgressState.add(function(ed, b, ti) {
				var co, id = ed.id, tb;

				if (b) {
					t.progressTimer = setTimeout(function() {
						co = ed.getContainer();
						co = co.insertBefore(DOM.create('DIV', {style : 'position:relative'}), co.firstChild);
						tb = DOM.get(ed.id + '_tbl');

						DOM.add(co, 'div', {id : id + '_blocker', 'class' : 'mceBlocker', style : {width : tb.clientWidth + 2, height : tb.clientHeight + 2}});
						DOM.add(co, 'div', {id : id + '_progress', 'class' : 'mceProgress', style : {left : tb.clientWidth / 2, top : tb.clientHeight / 2}});
					}, ti || 0);
				} else {
					DOM.remove(id + '_blocker');
					DOM.remove(id + '_progress');
					clearTimeout(t.progressTimer);
				}
			});

			DOM.loadCSS(s.editor_css ? ed.documentBaseURI.toAbsolute(s.editor_css) : url + "/skins/" + ed.settings.skin + "/ui.css");

			if (s.skin_variant)
				DOM.loadCSS(url + "/skins/" + ed.settings.skin + "/ui_" + s.skin_variant + ".css");
		}