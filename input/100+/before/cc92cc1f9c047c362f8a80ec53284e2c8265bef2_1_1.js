function() {

	var DOM = tinymce.DOM, Event = tinymce.dom.Event, extend = tinymce.extend, each = tinymce.each, explode = tinymce.explode;



	// Tell it to load theme specific language pack(s)

	tinymce.ThemeManager.requireLangPack('cleanslate');



	tinymce.create('tinymce.themes.CleanslateTheme', {



		// Control name lookup, format: title, command

		controls : {

			bold : ['bold_desc', 'Bold'],

			italic : ['italic_desc', 'Italic'],

			underline : ['underline_desc', 'Underline'],

			strikethrough : ['striketrough_desc', 'Strikethrough'],

			justifyleft : ['justifyleft_desc', 'JustifyLeft'],

			justifycenter : ['justifycenter_desc', 'JustifyCenter'],

			justifyright : ['justifyright_desc', 'JustifyRight'],

			justifyfull : ['justifyfull_desc', 'JustifyFull'],

			bullist : ['bullist_desc', 'InsertUnorderedList'],

			numlist : ['numlist_desc', 'InsertOrderedList'],

			outdent : ['outdent_desc', 'Outdent'],

			indent : ['indent_desc', 'Indent'],

			cut : ['cut_desc', 'Cut'],

			copy : ['copy_desc', 'Copy'],

			paste : ['paste_desc', 'Paste'],

			undo : ['undo_desc', 'Undo'],

			redo : ['redo_desc', 'Redo'],

			link : ['link_desc', 'mceLink'],

			unlink : ['unlink_desc', 'unlink'],

			image : ['image_desc', 'mceImage'],

			cleanup : ['cleanup_desc', 'mceCleanup'],

			help : ['help_desc', 'mceHelp'],

			code : ['code_desc', 'mceCodeEditor'],

			hr : ['hr_desc', 'InsertHorizontalRule'],

			removeformat : ['removeformat_desc', 'RemoveFormat'],

			sub : ['sub_desc', 'subscript'],

			sup : ['sup_desc', 'superscript'],

			forecolor : ['forecolor_desc', 'ForeColor'],

			forecolorpicker : ['forecolor_desc', 'mceForeColor'],

			backcolor : ['backcolor_desc', 'HiliteColor'],

			backcolorpicker : ['backcolor_desc', 'mceBackColor'],

			charmap : ['charmap_desc', 'mceCharMap'],

			visualaid : ['visualaid_desc', 'mceToggleVisualAid'],

			anchor : ['anchor_desc', 'mceInsertAnchor'],

			newdocument : ['newdocument_desc', 'mceNewDocument'],

			blockquote : ['blockquote_desc', 'mceBlockQuote']

		},



		stateControls : ['bold', 'italic', 'forecolor', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'bullist', 'numlist', 'indent', 'outdent'],



		getInfo : function() {

			return {

				longname : 'Cleanslate theme',

				author : 'Prescientware, LLC',

				authorurl : 'http://prescientware.com',

				version : "0.1"

			}

		},



		init : function(ed, url) {

			var t = this;

			t.editor = ed;

//**			t.buttons = parent.cms.toolbar.wysiwyg_buttons;



			// Default settings

			t.settings = s = extend({

				theme_buttons : "bold,italic,forecolor,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,outdent,indent,|,link,unlink",

				//theme_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect",

				//theme_buttons2 : "bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",

				//theme_buttons3 : "hr,removeformat,visualaid,|,sub,sup,|,charmap",

				theme_blockformats : "p,address,pre,h1,h2,h3,h4,h5,h6",

				theme_fonts : "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",

				theme_font_selector : "span"

			}, ed.settings);



	    //////states = ['Bold', 'Italic', 'Underline', 'Strikethrough', 'InsertUnorderedList', 'InsertOrderedList'];



			// Init editor

			ed.onInit.add(function() {

				if (!ed.settings.readonly) {

					ed.onNodeChange.add(t._nodeChanged, t);

					//ed.onKeyUp.add(t._updateUndoStatus, t);

					//ed.onMouseUp.add(t._updateUndoStatus, t);

					//ed.dom.bind(ed.dom.getRoot(), 'dragend', function() {

					//	t._updateUndoStatus(ed);

					//});

				

					//console.log(ed);

				}

			});



			ed.onActivate.add(function() {

				parent.$('#' + ed.id + '_tb_container').show();

			});



			ed.onDeactivate.add(function() {

				parent.$('#' + ed.id + '_tb_container').hide();

			});



		},



		renderUI : function(o) {

			var t = this, s = t.settings, n = o.targetNode, ic, tb, ed = t.editor, cf = ed.controlManager, sc;

			

			// Create toolbar

			tb = t.toolbar = cf.createToolbar("tools");

			each(explode(s.theme_buttons), function(n) {

				var c = t._createControl(n, cf);

				if (c) {

					tb.add(c);

				}

			});



			// build toolbars in page editor parent window

			window.parent.$('#wysiwyg_toolbar').append('<div class="mceToolbar_container" id="' + ed.id + '_tb_container"/>');

			toolbar_container = window.parent.$('#' + ed.id + '_tb_container').hide();

			tb.renderTo(toolbar_container[0]);



			return {

				iframeContainer : null,

				editorContainer : ed.id,

				sizeContainer : null,

				deltaHeight : 0

			};

		},



		_createControl : function(n, cf) {

			var cd, c;

			

			if (c = cf.createControl(n))

				return c;

			

			switch (n) {

				case "styleselect":

					return this._createStyleSelect();

			

				case "formatselect":

					return this._createBlockFormats();

			

				case "fontselect":

					return this._createFontSelect();

			

				case "fontsizeselect":

					return this._createFontSizeSelect();

			

				case "forecolor":

					return this._createForeColorMenu();

			

				case "backcolor":

					return this._createBackColorMenu();

			}

			

			if ((cd = this.controls[n]))

				return cf.createButton(n, {title : cd[0], cmd : cd[1], ui : cd[2], value : cd[3]});

		},



		_createForeColorMenu : function() {

			var c, t = this, s = t.settings, o = {}, v;

			

			if (s.theme_advanced_more_colors) {

				o.more_colors_func = function() {

					t._mceColorPicker(0, {

						color : c.value,

						func : function(co) {

							c.setColor(co);

						}

					});

				};

			}

			

			if (v = s.theme_advanced_text_colors)

				o.colors = v;

			

			if (s.theme_advanced_default_foreground_color)

				o.default_color = s.theme_advanced_default_foreground_color;

			

			o.title = 'advanced.forecolor_desc';

			o.cmd = 'ForeColor';

			o.scope = this;

			

			c = t.editor.controlManager.createColorSplitButton('forecolor', o);

			return c;

		},



		_nodeChanged : function(ed, cm, n, co, ob) { //editor, control-manager, node, selection-collapsed, generic object that can be passed

			var t = this, p, de = 0, v, c, s = t.settings, cl, fz, fn, fc, bc, formatNames, matches;

			

			if ($(n).hasClass('wysiwyg_container')) {

				

			}

			

			tinymce.each(t.stateControls, function(c) {

				cm.setActive(c, ed.queryCommandState(t.controls[c][1]));

			});



			function getParent(name) {

				var i, parents = ob.parents, func = name;



				if (typeof(name) == 'string') {

					func = function(node) {

						return node.nodeName == name;

					};

				}



				for (i = 0; i < parents.length; i++) {

					if (func(parents[i]))

						return parents[i];

				}

			};



			//cm.setActive('visualaid', ed.hasVisual);

			////t._updateUndoStatus(ed);

			

			// enable/disable outdent

			cm.setDisabled('outdent', !ed.queryCommandState('Outdent'));



			// handle anchor states

			p = getParent('A');

			if (c = cm.get('link')) {

				if (!p || !p.name) { // if there is no <A> element, or the <A> element has an empty 'name' attribute

					c.setDisabled(!p && co); // disable link when no parent <A> and no text selected

					c.setActive(!!p); // button on if we have a parent <A> element, off if not

				}

			}



			if (c = cm.get('unlink')) {

				c.setDisabled(!p && co); // disable unlink when no parent <A> and no text selected

				c.setActive(!!p && !p.name); // button on if we have a parent <A> element and it has no name, off if not

			}



			if (c = cm.get('anchor')) {

				c.setActive(!co && !!p && p.name); // button on if we have a parent <A> element and it has a name and selection is not collapsed, off if not

			}



			p = getParent('IMG');

			if (c = cm.get('image'))

				c.setActive(!co && !!p && n.className.indexOf('mceItem') == -1);

			

			if (c = cm.get('styleselect')) {

				t._importClasses();



				formatNames = [];

				each(c.items, function(item) {

					formatNames.push(item.value);

				});



				matches = ed.formatter.matchAll(formatNames);

				c.select(matches[0]);

			}



			if (c = cm.get('formatselect')) {

				p = getParent(DOM.isBlock);



				if (p)

					c.select(p.nodeName.toLowerCase());

			}



			// Find out current fontSize, fontFamily and fontClass

			getParent(function(n) {

				if (n.nodeName === 'SPAN') {

					if (!cl && n.className)

						cl = n.className;

				}



				if (ed.dom.is(n, s.theme_advanced_font_selector)) {

					if (!fz && n.style.fontSize)

						fz = n.style.fontSize;



					if (!fn && n.style.fontFamily)

						fn = n.style.fontFamily.replace(/[\"\']+/g, '').replace(/^([^,]+).*/, '$1').toLowerCase();

					

					if (!fc && n.style.color)

						fc = n.style.color;



					if (!bc && n.style.backgroundColor)

						bc = n.style.backgroundColor;

				}



				return false;

			});



			if (c = cm.get('fontselect')) {

				c.select(function(v) {

					return v.replace(/^([^,]+).*/, '$1').toLowerCase() == fn;

				});

			}



			// Select font size

			if (c = cm.get('fontsizeselect')) {

				// Use computed style

				if (s.theme_advanced_runtime_fontsize && !fz && !cl)

					fz = ed.dom.getStyle(n, 'fontSize', true);



				c.select(function(v) {

					if (v.fontSize && v.fontSize === fz)

						return true;



					if (v['class'] && v['class'] === cl)

						return true;

				});

			}

			

			if (s.theme_advanced_show_current_color) {

			function updateColor(controlId, color) {

				if (c = cm.get(controlId)) {

					if (!color)

						color = c.settings.default_color;

					if (color !== c.value) {

						c.displayColor(color);

					}

				}

			}

			updateColor('forecolor', fc);

				updateColor('backcolor', bc);

			}



			if (s.theme_advanced_show_current_color) {

				function updateColor(controlId, color) {

					if (c = cm.get(controlId)) {

						if (!color)

							color = c.settings.default_color;

						if (color !== c.value) {

							c.displayColor(color);

						}

					}

				};



				updateColor('forecolor', fc);

				updateColor('backcolor', bc);

			}



			if (s.theme_advanced_path && s.theme_advanced_statusbar_location) {

				p = DOM.get(ed.id + '_path') || DOM.add(ed.id + '_path_row', 'span', {id : ed.id + '_path'});



				if (t.statusKeyboardNavigation) {

					t.statusKeyboardNavigation.destroy();

					t.statusKeyboardNavigation = null;

				}



				DOM.setHTML(p, '');



				getParent(function(n) {

					var na = n.nodeName.toLowerCase(), u, pi, ti = '';



					// Ignore non element and bogus/hidden elements

					if (n.nodeType != 1 || na === 'br' || n.getAttribute('data-mce-bogus') || DOM.hasClass(n, 'mceItemHidden') || DOM.hasClass(n, 'mceItemRemoved'))

						return;



					// Handle prefix

					if (tinymce.isIE && n.scopeName !== 'HTML')

						na = n.scopeName + ':' + na;



					// Remove internal prefix

					na = na.replace(/mce\:/g, '');



					// Handle node name

					switch (na) {

						case 'b':

							na = 'strong';

							break;



						case 'i':

							na = 'em';

							break;



						case 'img':

							if (v = DOM.getAttrib(n, 'src'))

								ti += 'src: ' + v + ' ';



							break;



						case 'a':

							if (v = DOM.getAttrib(n, 'name')) {

								ti += 'name: ' + v + ' ';

								na += '#' + v;

							}



							if (v = DOM.getAttrib(n, 'href'))

								ti += 'href: ' + v + ' ';



							break;



						case 'font':

							if (v = DOM.getAttrib(n, 'face'))

								ti += 'font: ' + v + ' ';



							if (v = DOM.getAttrib(n, 'size'))

								ti += 'size: ' + v + ' ';



							if (v = DOM.getAttrib(n, 'color'))

								ti += 'color: ' + v + ' ';



							break;



						case 'span':

							if (v = DOM.getAttrib(n, 'style'))

								ti += 'style: ' + v + ' ';



							break;

					}



					if (v = DOM.getAttrib(n, 'id'))

						ti += 'id: ' + v + ' ';



					if (v = n.className) {

						v = v.replace(/\b\s*(webkit|mce|Apple-)\w+\s*\b/g, '')



						if (v) {

							ti += 'class: ' + v + ' ';



							if (DOM.isBlock(n) || na == 'img' || na == 'span')

								na += '.' + v;

						}

					}



					na = na.replace(/(html:)/g, '');

					na = {name : na, node : n, title : ti};

					t.onResolveName.dispatch(t, na);

					ti = na.title;

					na = na.name;



					//u = "javascript:tinymce.EditorManager.get('" + ed.id + "').theme._sel('" + (de++) + "');";

					pi = DOM.create('a', {'href' : "javascript:;", role: 'button', onmousedown : "return false;", title : ti, 'class' : 'mcePath_' + (de++)}, na);



					if (p.hasChildNodes()) {

						p.insertBefore(DOM.create('span', {'aria-hidden': 'true'}, '\u00a0\u00bb '), p.firstChild);

						p.insertBefore(pi, p.firstChild);

					} else

						p.appendChild(pi);

				}, ed.getBody());



				if (DOM.select('a', p).length > 0) {

					t.statusKeyboardNavigation = new tinymce.ui.KeyboardNavigation({

						root: ed.id + "_path_row",

						items: DOM.select('a', p),

						excludeFromTabOrder: true,

						onCancel: function() {

							ed.focus();

						}

					}, DOM);

				}

			}

		},



	});



	tinymce.ThemeManager.add('cleanslate', tinymce.themes.CleanslateTheme);

}