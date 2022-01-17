function(data, force_absolute) {
			var self = this, editor = self.editor, baseUri = editor.documentBaseURI, sources, attrs, img, i;

			data.params.src = self.convertUrl(data.params.src, force_absolute);

			attrs = data.video.attrs;
			if (attrs)
				attrs.src = self.convertUrl(attrs.src, force_absolute);

			if (attrs)
				attrs.poster = self.convertUrl(attrs.poster, force_absolute);

			sources = toArray(data.video.sources);
			if (sources) {
				for (i = 0; i < sources.length; i++)
					sources[i].src = self.convertUrl(sources[i].src, force_absolute);
			}

			img = self.editor.dom.create('img', {
				id : data.id,
				style : data.style,
				align : data.align,
				hspace : data.hspace,
				vspace : data.vspace,
				src : self.editor.theme.url + '/img/trans.gif',
				'class' : 'mceItemMedia mceItem' + self.getType(data.type).name,
				'data-mce-json' : JSON.serialize(data, "'")
			});

			img.width = data.width = normalizeSize(data.width || (data.type == 'audio' ? "300" : "320"));
			img.height = data.height = normalizeSize(data.height || (data.type == 'audio' ? "32" : "240"));

			return img;
		}