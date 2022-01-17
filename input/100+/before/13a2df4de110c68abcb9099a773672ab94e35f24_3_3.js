function(node) {
			var object, embed, video, iframe, img, name, id, width, height, style, i, html,
				param, params, source, sources, data, type, lookup = this.lookup,
				matches, attrs, urlConverter = this.editor.settings.url_converter,
				urlConverterScope = this.editor.settings.url_converter_scope,
				hspace, vspace, align, bgcolor;

			function getInnerHTML(node) {
				return new tinymce.html.Serializer({
					inner: true,
					validate: false
				}).serialize(node);
			};

			function lookupAttribute(o, attr) {
				return lookup[(o.attr(attr) || '').toLowerCase()];
			}

			function lookupExtension(src) {
				var ext = src.replace(/^.*\.([^.]+)$/, '$1');
				return lookup[ext.toLowerCase() || ''];
			}

			// If node isn't in document
			if (!node.parent)
				return;

			// Handle media scripts
			if (node.name === 'script') {
				if (node.firstChild)
					matches = scriptRegExp.exec(node.firstChild.value);

				if (!matches)
					return;

				type = matches[1];
				data = {video : {}, params : JSON.parse(matches[2])};
				width = data.params.width;
				height = data.params.height;
			}

			// Setup data objects
			data = data || {
				video : {},
				params : {}
			};

			// Setup new image object
			img = new Node('img', 1);
			img.attr({
				src : this.editor.theme.url + '/img/trans.gif'
			});

			// Video element
			name = node.name;
			if (name === 'video' || name == 'audio') {
				video = node;
				object = node.getAll('object')[0];
				embed = node.getAll('embed')[0];
				width = video.attr('width');
				height = video.attr('height');
				id = video.attr('id');
				data.video = {attrs : {}, sources : []};

				// Get all video attributes
				attrs = data.video.attrs;
				for (name in video.attributes.map)
					attrs[name] = video.attributes.map[name];

				source = node.attr('src');
				if (source)
					data.video.sources.push({src : urlConverter.call(urlConverterScope, source, 'src', node.name)});

				// Get all sources
				sources = video.getAll("source");
				for (i = 0; i < sources.length; i++) {
					source = sources[i].remove();

					data.video.sources.push({
						src: urlConverter.call(urlConverterScope, source.attr('src'), 'src', 'source'),
						type: source.attr('type'),
						media: source.attr('media')
					});
				}

				// Convert the poster URL
				if (attrs.poster)
					attrs.poster = urlConverter.call(urlConverterScope, attrs.poster, 'poster', node.name);
			}

			// Object element
			if (node.name === 'object') {
				object = node;
				embed = node.getAll('embed')[0];
			}

			// Embed element
			if (node.name === 'embed')
				embed = node;

			// Iframe element
			if (node.name === 'iframe') {
				iframe = node;
				type = 'Iframe';
			}

			if (object) {
				// Get width/height
				width = width || object.attr('width');
				height = height || object.attr('height');
				style = style || object.attr('style');
				id = id || object.attr('id');
				hspace = hspace || object.attr('hspace');
				vspace = vspace || object.attr('vspace');
				align = align || object.attr('align');
				bgcolor = bgcolor || object.attr('bgcolor');
				data.name = object.attr('name');

				// Get all object params
				params = object.getAll("param");
				for (i = 0; i < params.length; i++) {
					param = params[i];
					name = param.remove().attr('name');

					if (!excludedAttrs[name])
						data.params[name] = param.attr('value');
				}

				data.params.src = data.params.src || object.attr('data');
			}

			if (embed) {
				// Get width/height
				width = width || embed.attr('width');
				height = height || embed.attr('height');
				style = style || embed.attr('style');
				id = id || embed.attr('id');
				hspace = hspace || embed.attr('hspace');
				vspace = vspace || embed.attr('vspace');
				align = align || embed.attr('align');
				bgcolor = bgcolor || embed.attr('bgcolor');

				// Get all embed attributes
				for (name in embed.attributes.map) {
					if (!excludedAttrs[name] && !data.params[name])
						data.params[name] = embed.attributes.map[name];
				}
			}

			if (iframe) {
				// Get width/height
				width = iframe.attr('width');
				height = iframe.attr('height');
				style = style || iframe.attr('style');
				id = iframe.attr('id');
				hspace = iframe.attr('hspace');
				vspace = iframe.attr('vspace');
				align = iframe.attr('align');
				bgcolor = iframe.attr('bgcolor');

				tinymce.each(rootAttributes, function(name) {
					img.attr(name, iframe.attr(name));
				});

				// Get all iframe attributes
				for (name in iframe.attributes.map) {
					if (!excludedAttrs[name] && !data.params[name])
						data.params[name] = iframe.attributes.map[name];
				}
			}

			// Use src not movie
			if (data.params.movie) {
				data.params.src = data.params.src || data.params.movie;
				delete data.params.movie;
			}

			// Convert the URL to relative/absolute depending on configuration
			if (data.params.src)
				data.params.src = urlConverter.call(urlConverterScope, data.params.src, 'src', 'object');

			if (video) {
				if (node.name === 'video')
					type = lookup.video.name;
				else if (node.name === 'audio')
					type = lookup.audio.name;
			}

			if (object && !type)
				type = (lookupAttribute(object, 'clsid') || lookupAttribute(object, 'classid') || lookupAttribute(object, 'type') || {}).name;

			if (embed && !type)
				type = (lookupAttribute(embed, 'type') || lookupExtension(data.params.src) || {}).name;

			// for embedded audio we preserve the original specified type
			if (embed && type == 'EmbeddedAudio') {
				data.params.type = embed.attr('type');
			}

			// Replace the video/object/embed element with a placeholder image containing the data
			node.replace(img);

			// Remove embed
			if (embed)
				embed.remove();

			// Serialize the inner HTML of the object element
			if (object) {
				html = getInnerHTML(object.remove());

				if (html)
					data.object_html = html;
			}

			// Serialize the inner HTML of the video element
			if (video) {
				html = getInnerHTML(video.remove());

				if (html)
					data.video_html = html;
			}

			data.hspace = hspace;
			data.vspace = vspace;
			data.align = align;
			data.bgcolor = bgcolor;

			// Set width/height of placeholder
			img.attr({
				id : id,
				'class' : 'mceItemMedia mceItem' + (type || 'Flash'),
				style : style,
				width : width || (node.name == 'audio' ? "300" : "320"),
				height : height || (node.name == 'audio' ? "32" : "240"),
				hspace : hspace,
				vspace : vspace,
				align : align,
				bgcolor : bgcolor,
				"data-mce-json" : JSON.serialize(data, "'")
			});
		}