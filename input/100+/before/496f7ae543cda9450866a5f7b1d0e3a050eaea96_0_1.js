function(id, settings) {
			var self = this, TRUE = true;

			/**
			 * Name/value collection with editor settings.
			 *
			 * @property settings
			 * @type Object
			 * @example
			 * // Get the value of the theme setting
			 * tinyMCE.activeEditor.windowManager.alert("You are using the " + tinyMCE.activeEditor.settings.theme + " theme");
			 */
			self.settings = settings = extend({
				id : id,
				language : 'en',
				theme : 'simple',
				skin : 'default',
				delta_width : 0,
				delta_height : 0,
				popup_css : '',
				plugins : '',
				document_base_url : tinymce.documentBaseURL,
				add_form_submit_trigger : TRUE,
				submit_patch : TRUE,
				add_unload_trigger : TRUE,
				convert_urls : TRUE,
				relative_urls : TRUE,
				remove_script_host : TRUE,
				table_inline_editing : false,
				object_resizing : TRUE,
				accessibility_focus : TRUE,
				doctype : tinymce.isIE6 ? '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">' : '<!DOCTYPE>', // Use old doctype on IE 6 to avoid horizontal scroll
				visual : TRUE,
				font_size_style_values : 'xx-small,x-small,small,medium,large,x-large,xx-large',
				font_size_legacy_values : 'xx-small,small,medium,large,x-large,xx-large,300%', // See: http://www.w3.org/TR/CSS2/fonts.html#propdef-font-size
				apply_source_formatting : TRUE,
				directionality : 'ltr',
				forced_root_block : 'p',
				hidden_input : TRUE,
				padd_empty_editor : TRUE,
				render_ui : TRUE,
				indentation : '30px',
				fix_table_elements : TRUE,
				inline_styles : TRUE,
				convert_fonts_to_spans : TRUE,
				indent : 'simple',
				indent_before : 'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure',
				indent_after : 'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure',
				validate : TRUE,
				entity_encoding : 'named',
				url_converter : self.convertURL,
				url_converter_scope : self,
				ie7_compat : TRUE
			}, settings);

			/**
			 * Editor instance id, normally the same as the div/textarea that was replaced. 
			 *
			 * @property id
			 * @type String
			 */
			self.id = self.editorId = id;

			/**
			 * State to force the editor to return false on a isDirty call. 
			 *
			 * @property isNotDirty
			 * @type Boolean
			 * @example
			 * function ajaxSave() {
			 *     var ed = tinyMCE.get('elm1');
			 *
			 *     // Save contents using some XHR call
			 *     alert(ed.getContent());
			 *
			 *     ed.isNotDirty = 1; // Force not dirty state
			 * }
			 */
			self.isNotDirty = false;

			/**
			 * Name/Value object containting plugin instances.
			 *
			 * @property plugins
			 * @type Object
			 * @example
			 * // Execute a method inside a plugin directly
			 * tinyMCE.activeEditor.plugins.someplugin.someMethod();
			 */
			self.plugins = {};

			/**
			 * URI object to document configured for the TinyMCE instance.
			 *
			 * @property documentBaseURI
			 * @type tinymce.util.URI
			 * @example
			 * // Get relative URL from the location of document_base_url
			 * tinyMCE.activeEditor.documentBaseURI.toRelative('/somedir/somefile.htm');
			 * 
			 * // Get absolute URL from the location of document_base_url
			 * tinyMCE.activeEditor.documentBaseURI.toAbsolute('somefile.htm');
			 */
			self.documentBaseURI = new tinymce.util.URI(settings.document_base_url || tinymce.documentBaseURL, {
				base_uri : tinyMCE.baseURI
			});

			/**
			 * URI object to current document that holds the TinyMCE editor instance.
			 *
			 * @property baseURI
			 * @type tinymce.util.URI
			 * @example
			 * // Get relative URL from the location of the API
			 * tinyMCE.activeEditor.baseURI.toRelative('/somedir/somefile.htm');
			 * 
			 * // Get absolute URL from the location of the API
			 * tinyMCE.activeEditor.baseURI.toAbsolute('somefile.htm');
			 */
			self.baseURI = tinymce.baseURI;

			/**
			 * Array with CSS files to load into the iframe.
			 *
			 * @property contentCSS
			 * @type Array
			 */			
			self.contentCSS = [];

			// Creates all events like onClick, onSetContent etc see Editor.Events.js for the actual logic
			self.setupEvents();

			// Internal command handler objects
			self.execCommands = {};
			self.queryStateCommands = {};
			self.queryValueCommands = {};

			// Call setup
			self.execCallback('setup', self);
		}