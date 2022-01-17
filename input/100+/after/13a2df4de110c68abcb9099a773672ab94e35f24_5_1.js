function(pl, o) {
			var ed = this.editor,
				h = o.content,
				grep = tinymce.grep,
				explode = tinymce.explode,
				trim = tinymce.trim,
				len, stripClass;

			//console.log('Before preprocess:' + o.content);

			function process(items) {
				each(items, function(v) {
					// Remove or replace
					if (v.constructor == RegExp)
						h = h.replace(v, '');
					else
						h = h.replace(v[0], v[1]);
				});
			}
			
			if (ed.settings.paste_enable_default_filters == false) {
				return;
			}

			// IE9 adds BRs before/after block elements when contents is pasted from word or for example another browser
			if (tinymce.isIE && document.documentMode >= 9 && /<(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)/.test(o.content)) {
				// IE9 adds BRs before/after block elements when contents is pasted from word or for example another browser
				process([[/(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, '$1']]);

				// IE9 also adds an extra BR element for each soft-linefeed and it also adds a BR for each word wrap break
				process([
					[/<br><br>/g, '<BR><BR>'], // Replace multiple BR elements with uppercase BR to keep them intact
					[/<br>/g, ' '], // Replace single br elements with space since they are word wrap BR:s
					[/<BR><BR>/g, '<br>'] // Replace back the double brs but into a single BR
				]);
			}

			// Detect Word content and process it more aggressive
			if (/class="?Mso|style="[^"]*\bmso-|w:WordDocument/i.test(h) || o.wordContent) {
				o.wordContent = true;			// Mark the pasted contents as word specific content
				//console.log('Word contents detected.');

				// Process away some basic content
				process([
					/^\s*(&nbsp;)+/gi,				// &nbsp; entities at the start of contents
					/(&nbsp;|<br[^>]*>)+\s*$/gi		// &nbsp; entities at the end of contents
				]);

				if (getParam(ed, "paste_convert_headers_to_strong")) {
					h = h.replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>");
				}

				if (getParam(ed, "paste_convert_middot_lists")) {
					process([
						[/<!--\[if !supportLists\]-->/gi, '$&__MCE_ITEM__'],					// Convert supportLists to a list item marker
						[/(<span[^>]+(?:mso-list:|:\s*symbol)[^>]+>)/gi, '$1__MCE_ITEM__'],		// Convert mso-list and symbol spans to item markers
						[/(<p[^>]+(?:MsoListParagraph)[^>]+>)/gi, '$1__MCE_ITEM__']				// Convert mso-list and symbol paragraphs to item markers (FF)
					]);
				}

				process([
					// Word comments like conditional comments etc
					/<!--[\s\S]+?-->/gi,

					// Remove comments, scripts (e.g., msoShowComment), XML tag, VML content, MS Office namespaced tags, and a few other tags
					/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,

					// Convert <s> into <strike> for line-though
					[/<(\/?)s>/gi, "<$1strike>"],

					// Replace nsbp entites to char since it's easier to handle
					[/&nbsp;/gi, "\u00a0"]
				]);

				// Remove bad attributes, with or without quotes, ensuring that attribute text is really inside a tag.
				// If JavaScript had a RegExp look-behind, we could have integrated this with the last process() array and got rid of the loop. But alas, it does not, so we cannot.
				do {
					len = h.length;
					h = h.replace(/(<[a-z][^>]*\s)(?:id|name|language|type|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi, "$1");
				} while (len != h.length);

				// Remove all spans if no styles is to be retained
				if (getParam(ed, "paste_retain_style_properties").replace(/^none$/i, "").length == 0) {
					h = h.replace(/<\/?span[^>]*>/gi, "");
				} else {
					// We're keeping styles, so at least clean them up.
					// CSS Reference: http://msdn.microsoft.com/en-us/library/aa155477.aspx

					process([
						// Convert <span style="mso-spacerun:yes">___</span> to string of alternating breaking/non-breaking spaces of same length
						[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,
							function(str, spaces) {
								return (spaces.length > 0)? spaces.replace(/./, " ").slice(Math.floor(spaces.length/2)).split("").join("\u00a0") : "";
							}
						],

						// Examine all styles: delete junk, transform some, and keep the rest
						[/(<[a-z][^>]*)\sstyle="([^"]*)"/gi,
							function(str, tag, style) {
								var n = [],
									i = 0,
									s = explode(trim(style).replace(/&quot;/gi, "'"), ";");

								// Examine each style definition within the tag's style attribute
								each(s, function(v) {
									var name, value,
										parts = explode(v, ":");

									function ensureUnits(v) {
										return v + ((v !== "0") && (/\d$/.test(v)))? "px" : "";
									}

									if (parts.length == 2) {
										name = parts[0].toLowerCase();
										value = parts[1].toLowerCase();

										// Translate certain MS Office styles into their CSS equivalents
										switch (name) {
											case "mso-padding-alt":
											case "mso-padding-top-alt":
											case "mso-padding-right-alt":
											case "mso-padding-bottom-alt":
											case "mso-padding-left-alt":
											case "mso-margin-alt":
											case "mso-margin-top-alt":
											case "mso-margin-right-alt":
											case "mso-margin-bottom-alt":
											case "mso-margin-left-alt":
											case "mso-table-layout-alt":
											case "mso-height":
											case "mso-width":
											case "mso-vertical-align-alt":
												n[i++] = name.replace(/^mso-|-alt$/g, "") + ":" + ensureUnits(value);
												return;

											case "horiz-align":
												n[i++] = "text-align:" + value;
												return;

											case "vert-align":
												n[i++] = "vertical-align:" + value;
												return;

											case "font-color":
											case "mso-foreground":
												n[i++] = "color:" + value;
												return;

											case "mso-background":
											case "mso-highlight":
												n[i++] = "background:" + value;
												return;

											case "mso-default-height":
												n[i++] = "min-height:" + ensureUnits(value);
												return;

											case "mso-default-width":
												n[i++] = "min-width:" + ensureUnits(value);
												return;

											case "mso-padding-between-alt":
												n[i++] = "border-collapse:separate;border-spacing:" + ensureUnits(value);
												return;

											case "text-line-through":
												if ((value == "single") || (value == "double")) {
													n[i++] = "text-decoration:line-through";
												}
												return;

											case "mso-zero-height":
												if (value == "yes") {
													n[i++] = "display:none";
												}
												return;
										}

										// Eliminate all MS Office style definitions that have no CSS equivalent by examining the first characters in the name
										if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?!align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test(name)) {
											return;
										}

										// If it reached this point, it must be a valid CSS style
										n[i++] = name + ":" + parts[1];		// Lower-case name, but keep value case
									}
								});

								// If style attribute contained any valid styles the re-write it; otherwise delete style attribute.
								if (i > 0) {
									return tag + ' style="' + n.join(';') + '"';
								} else {
									return tag;
								}
							}
						]
					]);
				}
			}

			// Replace headers with <strong>
			if (getParam(ed, "paste_convert_headers_to_strong")) {
				process([
					[/<h[1-6][^>]*>/gi, "<p><strong>"],
					[/<\/h[1-6][^>]*>/gi, "</strong></p>"]
				]);
			}

			process([
				// Copy paste from Java like Open Office will produce this junk on FF
				[/Version:[\d.]+\nStartHTML:\d+\nEndHTML:\d+\nStartFragment:\d+\nEndFragment:\d+/gi, '']
			]);

			// Class attribute options are: leave all as-is ("none"), remove all ("all"), or remove only those starting with mso ("mso").
			// Note:-  paste_strip_class_attributes: "none", verify_css_classes: true is also a good variation.
			stripClass = getParam(ed, "paste_strip_class_attributes");

			if (stripClass !== "none") {
				function removeClasses(match, g1) {
						if (stripClass === "all")
							return '';

						var cls = grep(explode(g1.replace(/^(["'])(.*)\1$/, "$2"), " "),
							function(v) {
								return (/^(?!mso)/i.test(v));
							}
						);

						return cls.length ? ' class="' + cls.join(" ") + '"' : '';
				};

				h = h.replace(/ class="([^"]+)"/gi, removeClasses);
				h = h.replace(/ class=([\-\w]+)/gi, removeClasses);
			}

			// Remove spans option
			if (getParam(ed, "paste_remove_spans")) {
				h = h.replace(/<\/?span[^>]*>/gi, "");
			}

			//console.log('After preprocess:' + h);

			o.content = h;
		}