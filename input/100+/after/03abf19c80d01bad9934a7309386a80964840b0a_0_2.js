function(index, item) {

			var newItem = wrapItemForToolBox(item.ProductId, item.ImageUrl);

			newItem

				.appendTo('.canvas')

				.css({

					position: 'absolute',

					top: item.PosY,

					left: item.PosX

				});

			if (!readOnlyMode()) {

				newItem.draggable({

					helper: 'original'

				});

			}

			newItem.find('.thumbnail')

				.css({

					width: item.Width,

					height: item.Height

				})

				.attr('src', item.ImageUrl);

			if (!readOnlyMode())

				newItem.find('img').resizable();

		}