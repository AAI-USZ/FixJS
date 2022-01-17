function(node, args) {
			var self = this, editor = self.editor, video, object, embed, iframe, name, value, data,
				source, sources, params, param, typeItem, i, item, mp4Source, replacement,
				posterSrc, style, audio;

			// Adds the flash player
			function addPlayer(video_src, poster_src) {
				var baseUri, flashVars, flashVarsOutput, params, flashPlayer;

				flashPlayer = editor.getParam('flash_video_player_url', self.convertUrl(self.url + '/moxieplayer.swf'));
				if (flashPlayer) {
					baseUri = editor.documentBaseURI;
					data.params.src = flashPlayer;

					// Convert the movie url to absolute urls
					if (editor.getParam('flash_video_player_absvideourl', true)) {
						video_src = baseUri.toAbsolute(video_src || '', true);
						poster_src = baseUri.toAbsolute(poster_src || '', true);
					}

					// Generate flash vars
					flashVarsOutput = '';
					flashVars = editor.getParam('flash_video_player_flashvars', {url : '$url', poster : '$poster'});
					tinymce.each(flashVars, function(value, name) {
						// Replace $url and $poster variables in flashvars value
						value = value.replace(/\$url/, video_src || '');
						value = value.replace(/\$poster/, poster_src || '');

						if (value.length > 0)
							flashVarsOutput += (flashVarsOutput ? '&' : '') + name + '=' + escape(value);
					});

					if (flashVarsOutput.length)
						data.params.flashvars = flashVarsOutput;

					params = editor.getParam('flash_video_player_params', {
						allowfullscreen: true,
						allowscriptaccess: true
					});

					tinymce.each(params, function(value, name) {
						data.params[name] = "" + value;
					});
				}
			};

			data = node.attr('data-mce-json');
			if (!data)
				return;

			data = JSON.parse(data);
			typeItem = this.getType(node.attr('class'));

			style = node.attr('data-mce-style')
			if (!style) {
				style = node.attr('style');

				if (style)
					style = editor.dom.serializeStyle(editor.dom.parseStyle(style, 'img'));
			}

			// Handle iframe
			if (typeItem.name === 'Iframe') {
				replacement = new Node('iframe', 1);

				tinymce.each(rootAttributes, function(name) {
					var value = node.attr(name);

					if (name == 'class' && value)
						value = value.replace(/mceItem.+ ?/g, '');

					if (value && value.length > 0)
						replacement.attr(name, value);
				});

				for (name in data.params)
					replacement.attr(name, data.params[name]);

				replacement.attr({
					style: style,
					src: data.params.src
				});

				node.replace(replacement);

				return;
			}

			// Handle scripts
			if (this.editor.settings.media_use_script) {
				replacement = new Node('script', 1).attr('type', 'text/javascript');

				value = new Node('#text', 3);
				value.value = 'write' + typeItem.name + '(' + JSON.serialize(tinymce.extend(data.params, {
					width: node.attr('width'),
					height: node.attr('height')
				})) + ');';

				replacement.append(value);
				node.replace(replacement);

				return;
			}

			// Add HTML5 video element
			if (typeItem.name === 'Video' && data.video.sources[0]) {
				// Create new object element
				video = new Node('video', 1).attr(tinymce.extend({
					id : node.attr('id'),
					width: node.attr('width'),
					height: node.attr('height'),
					style : style
				}, data.video.attrs));

				// Get poster source and use that for flash fallback
				if (data.video.attrs)
					posterSrc = data.video.attrs.poster;

				sources = data.video.sources = toArray(data.video.sources);
				for (i = 0; i < sources.length; i++) {
					if (/\.mp4$/.test(sources[i].src))
						mp4Source = sources[i].src;
				}

				if (!sources[0].type) {
					video.attr('src', sources[0].src);
					sources.splice(0, 1);
				}

				for (i = 0; i < sources.length; i++) {
					source = new Node('source', 1).attr(sources[i]);
					source.shortEnded = true;
					video.append(source);
				}

				// Create flash fallback for video if we have a mp4 source
				if (mp4Source) {
					addPlayer(mp4Source, posterSrc);
					typeItem = self.getType('flash');
				} else
					data.params.src = '';
			}

			// Add HTML5 audio element
			if (typeItem.name === 'Audio' && data.video.sources[0]) {
				// Create new object element
				audio = new Node('audio', 1).attr(tinymce.extend({
					id : node.attr('id'),
					width: node.attr('width'),
					height: node.attr('height'),
					style : style
				}, data.video.attrs));

				// Get poster source and use that for flash fallback
				if (data.video.attrs)
					posterSrc = data.video.attrs.poster;

				sources = data.video.sources = toArray(data.video.sources);
				if (!sources[0].type) {
					audio.attr('src', sources[0].src);
					sources.splice(0, 1);
				}

				for (i = 0; i < sources.length; i++) {
					source = new Node('source', 1).attr(sources[i]);
					source.shortEnded = true;
					audio.append(source);
				}

				data.params.src = '';
			}

			if (typeItem.name === 'EmbeddedAudio') {
				embed = new Node('embed', 1);
				embed.shortEnded = true;
				embed.attr({
					id: node.attr('id'),
					width: node.attr('width'),
					height: node.attr('height'),
					style : style,
					type: node.attr('type')
				});

				for (name in data.params)
					embed.attr(name, data.params[name]);

				tinymce.each(rootAttributes, function(name) {
					if (data[name] && name != 'type')
						embed.attr(name, data[name]);
				});

				data.params.src = '';
			}

			// Do we have a params src then we can generate object
			if (data.params.src) {
				// Is flv movie add player for it
				if (/\.flv$/i.test(data.params.src))
					addPlayer(data.params.src, '');

				if (args && args.force_absolute)
					data.params.src = editor.documentBaseURI.toAbsolute(data.params.src);

				// Create new object element
				object = new Node('object', 1).attr({
					id : node.attr('id'),
					width: node.attr('width'),
					height: node.attr('height'),
					style : style
				});

				tinymce.each(rootAttributes, function(name) {
					var value = data[name];

					if (name == 'class' && value)
						value = value.replace(/mceItem.+ ?/g, '');

					if (value && name != 'type')
						object.attr(name, value);
				});

				// Add params
				for (name in data.params) {
					param = new Node('param', 1);
					param.shortEnded = true;
					value = data.params[name];

					// Windows media needs to use url instead of src for the media URL
					if (name === 'src' && typeItem.name === 'WindowsMedia')
						name = 'url';

					param.attr({name: name, value: value});
					object.append(param);
				}

				// Setup add type and classid if strict is disabled
				if (this.editor.getParam('media_strict', true)) {
					object.attr({
						data: data.params.src,
						type: typeItem.mimes[0]
					});
				} else {
					object.attr({
						classid: "clsid:" + typeItem.clsids[0],
						codebase: typeItem.codebase
					});

					embed = new Node('embed', 1);
					embed.shortEnded = true;
					embed.attr({
						id: node.attr('id'),
						width: node.attr('width'),
						height: node.attr('height'),
						style : style,
						type: typeItem.mimes[0]
					});

					for (name in data.params)
						embed.attr(name, data.params[name]);

					tinymce.each(rootAttributes, function(name) {
						if (data[name] && name != 'type')
							embed.attr(name, data[name]);
					});

					object.append(embed);
				}

				// Insert raw HTML
				if (data.object_html) {
					value = new Node('#text', 3);
					value.raw = true;
					value.value = data.object_html;
					object.append(value);
				}

				// Append object to video element if it exists
				if (video)
					video.append(object);
			}

			if (video) {
				// Insert raw HTML
				if (data.video_html) {
					value = new Node('#text', 3);
					value.raw = true;
					value.value = data.video_html;
					video.append(value);
				}
			}

			if (audio) {
				// Insert raw HTML
				if (data.video_html) {
					value = new Node('#text', 3);
					value.raw = true;
					value.value = data.video_html;
					audio.append(value);
				}
			}

			var n = video || audio || object || embed;
			if (n)
				node.replace(n);
			else
				node.remove();
		}