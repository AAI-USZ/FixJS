function(event, data) {
				var	that = this;
				var img, len = data.filesObjs.length, fileObj, config;

				while (--len >= 0) {
					fileObj = data.filesObjs[len];
					if (fileObj.file.type.match(/image\//)) {
						config = that.getEditableConfig(data.editable);
						// Prepare
						img = jQuery('<img/>');
						img.css({
							"max-width": that.maxWidth,
							"max-height": that.maxHeight
						});
						img.attr('id',fileObj.id);
						if (typeof fileObj.src === 'undefined') {
							img.attr('src', fileObj.data );
							//fileObj.src = fileObj.data ;
						} else {
							img.attr('src',fileObj.src );
						}
						GENTICS.Utils.Dom.insertIntoDOM(img, data.range, jQuery(Aloha.activeEditable.obj));
					}
				}
				
			}