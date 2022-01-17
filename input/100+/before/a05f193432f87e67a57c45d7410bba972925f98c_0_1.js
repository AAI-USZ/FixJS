function() {
			var n, t = this, s = t.settings, w, h, e = t.getElement(), o, ti, u, bi, bc, re, i, initializedPlugins = [];

			tinymce.add(t);

			s.aria_label = s.aria_label || DOM.getAttrib(e, 'aria-label', t.getLang('aria.rich_text_area'));

			/**
			 * Reference to the theme instance that was used to generate the UI. 
			 *
			 * @property theme
			 * @type tinymce.Theme
			 * @example
			 * // Executes a method on the theme directly
			 * tinyMCE.activeEditor.theme.someMethod();
			 */
			if (s.theme) {
				if (typeof s.theme != "function") {
					s.theme = s.theme.replace(/-/, '');
					o = ThemeManager.get(s.theme);
					t.theme = new o();

					if (t.theme.init)
						t.theme.init(t, ThemeManager.urls[s.theme] || tinymce.documentBaseURL.replace(/\/$/, ''));
				} else {
					t.theme = s.theme;
				}
			}

			function initPlugin(p) {
				var c = PluginManager.get(p), u = PluginManager.urls[p] || tinymce.documentBaseURL.replace(/\/$/, ''), po;
				if (c && tinymce.inArray(initializedPlugins,p) === -1) {
					each(PluginManager.dependencies(p), function(dep){
						initPlugin(dep);
					});
					po = new c(t, u);

					t.plugins[p] = po;

					if (po.init) {
						po.init(t, u);
						initializedPlugins.push(p);
					}
				}
			}
			
			// Create all plugins
			each(explode(s.plugins.replace(/\-/g, '')), initPlugin);

			// Setup popup CSS path(s)
			if (s.popup_css !== false) {
				if (s.popup_css)
					s.popup_css = t.documentBaseURI.toAbsolute(s.popup_css);
				else
					s.popup_css = t.baseURI.toAbsolute("themes/" + s.theme + "/skins/" + s.skin + "/dialog.css");
			}

			if (s.popup_css_add)
				s.popup_css += ',' + t.documentBaseURI.toAbsolute(s.popup_css_add);

			/**
			 * Control manager instance for the editor. Will enables you to create new UI elements and change their states etc.
			 *
			 * @property controlManager
			 * @type tinymce.ControlManager
			 * @example
			 * // Disables the bold button
			 * tinyMCE.activeEditor.controlManager.setDisabled('bold', true);
			 */
			t.controlManager = new tinymce.ControlManager(t);

			t.onExecCommand.add(function(ed, c) {
				// Don't refresh the select lists until caret move
				if (!/^(FontName|FontSize)$/.test(c))
					t.nodeChanged();
			});

			// Enables users to override the control factory
			t.onBeforeRenderUI.dispatch(t, t.controlManager);

			// Measure box
			if (s.render_ui && t.theme) {
				if (typeof s.theme != "function") {
					w = s.width || e.style.width || e.offsetWidth;
					h = s.height || e.style.height || e.offsetHeight;
					t.orgDisplay = e.style.display;
					re = /^[0-9\.]+(|px)$/i;

					if (re.test('' + w))
						w = Math.max(parseInt(w, 10) + (o.deltaWidth || 0), 100);

					if (re.test('' + h))
						h = Math.max(parseInt(h, 10) + (o.deltaHeight || 0), 100);

					// Render UI
					o = t.theme.renderUI({
						targetNode : e,
						width : w,
						height : h,
						deltaWidth : s.delta_width,
						deltaHeight : s.delta_height
					});

					// Resize editor
					DOM.setStyles(o.sizeContainer || o.editorContainer, {
						width : w,
						height : h
					});
				} else {
					o = s.theme(t, e);

					// Convert element type to id:s
					if (o.editorContainer.nodeType) {
						o.editorContainer = o.editorContainer.id = o.editorContainer.id || t.id + "_parent";
					}

					// Convert element type to id:s
					if (o.iframeContainer.nodeType) {
						o.iframeContainer = o.iframeContainer.id = o.iframeContainer.id || t.id + "_iframecontainer";
					}
				}

				t.editorContainer = o.editorContainer;
			}

			// Load specified content CSS last
			if (s.content_css) {
				each(explode(s.content_css), function(u) {
					t.contentCSS.push(t.documentBaseURI.toAbsolute(u));
				});
			}

			// Content editable mode ends here
			if (s.content_editable) {
				e = n = o = null; // Fix IE leak
				return t.initContentBody();
			}

			// User specified a document.domain value
			if (document.domain && location.hostname != document.domain)
				tinymce.relaxedDomain = document.domain;

			h = (o.iframeHeight || h) + (typeof(h) == 'number' ? (o.deltaHeight || 0) : '');
			if (h < 100)
				h = 100;

			t.iframeHTML = s.doctype + '<html><head xmlns="http://www.w3.org/1999/xhtml">';

			// We only need to override paths if we have to
			// IE has a bug where it remove site absolute urls to relative ones if this is specified
			if (s.document_base_url != tinymce.documentBaseURL)
				t.iframeHTML += '<base href="' + t.documentBaseURI.getURI() + '" />';

			// IE8 doesn't support carets behind images setting ie7_compat would force IE8+ to run in IE7 compat mode.
			if (s.ie7_compat)
				t.iframeHTML += '<meta http-equiv="X-UA-Compatible" content="IE=7" />';
			else
				t.iframeHTML += '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';

			t.iframeHTML += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';

			// Load the CSS by injecting them into the HTML this will reduce "flicker"
			for (i = 0; i < t.contentCSS.length; i++) {
				t.iframeHTML += '<link type="text/css" rel="stylesheet" href="' + t.contentCSS[i] + '" />';
			}

			t.contentCSS = [];

			bi = s.body_id || 'tinymce';
			if (bi.indexOf('=') != -1) {
				bi = t.getParam('body_id', '', 'hash');
				bi = bi[t.id] || bi;
			}

			bc = s.body_class || '';
			if (bc.indexOf('=') != -1) {
				bc = t.getParam('body_class', '', 'hash');
				bc = bc[t.id] || '';
			}

			t.iframeHTML += '</head><body id="' + bi + '" class="mceContentBody ' + bc + '" onload="window.parent.tinyMCE.get(\'' + t.id + '\').onLoad.dispatch();"><br></body></html>';

			// Domain relaxing enabled, then set document domain
			if (tinymce.relaxedDomain && (isIE || (tinymce.isOpera && parseFloat(opera.version()) < 11))) {
				// We need to write the contents here in IE since multiple writes messes up refresh button and back button
				u = 'javascript:(function(){document.open();document.domain="' + document.domain + '";var ed = window.parent.tinyMCE.get("' + t.id + '");document.write(ed.iframeHTML);document.close();ed.initContentBody();})()';
			}

			// Create iframe
			// TODO: ACC add the appropriate description on this.
			n = DOM.add(o.iframeContainer, 'iframe', { 
				id : t.id + "_ifr",
				src : u || 'javascript:""', // Workaround for HTTPS warning in IE6/7
				frameBorder : '0',
				allowTransparency : "true",
				title : s.aria_label,
				style : {
					width : '100%',
					height : h,
					display : 'block' // Important for Gecko to render the iframe correctly
				}
			});

			t.contentAreaContainer = o.iframeContainer;

			if (o.editorContainer) {
				DOM.get(o.editorContainer).style.display = t.orgDisplay;
			}

			DOM.get(t.id).style.display = 'none';
			DOM.setAttrib(t.id, 'aria-hidden', true);

			if (!tinymce.relaxedDomain || !u)
				t.initContentBody();

			e = n = o = null; // Cleanup
		}