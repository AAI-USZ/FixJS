function(index, element) {

			if (this.nodeType == Node.TEXT_NODE) {

				currentOffset += this.length;

			} else if ($(this).is(w.root) || $(this).attr('_tag')) {

				_getNodeOffsets($(this), offsets, idName);

			} else if ($(this).attr('_entity') && $(this).hasClass('start')) {

				var id = $(this).attr('name');

				offsets.push({

					id: id,

					parent: $(parent).attr(idName),

					offset: currentOffset,

					length: w.entities[id].props.content.length

				});

			} else if (w.titles[this.nodeName.toLowerCase()] != null) {

				var id = $(this).attr(idName);

				offsets.push({

					id: id,

					parent: $(parent).attr(idName),

					offset: currentOffset,

					length: $(this).text().length

				});

			}

		}