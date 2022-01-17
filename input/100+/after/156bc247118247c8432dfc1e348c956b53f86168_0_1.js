function addDropboxImage (file, source, uri) {
			var title         = (source === 'local') ? 'Local file: ' + (file.name)
			                                         : source + ' file: ' + uri
			  , dataURLreader = new FileReader()
			  , binaryReader  = new FileReader()
			  ;
			  
			var $img = $.make('img', { 'class'   : 'localImage'
			                         , alt       : title
			                         , draggable : true
			                         , title     : title
			                         })
			            .data({ source : source
			                  , file   : file
			                  });


			var getExif = function getExif (event) {
				var jpeg = new JpegMeta.JpegFile(this.result, file.name);
				jpeg = jpeg.general;
				
				$img.data({ depth      : jpeg.depth.value
				          , name       : file.name || file.fileName || uri
				          , resolution : jpeg.pixelWidth.value + ' x ' + jpeg.pixelHeight.value
				          , size       : INNERCONTEXT.UTILITY.addCommas(file.size || file.fileSize)
				          });
			};
			
			var addImageToDOM = function addImageToDOM (event) {
				INNERCONTEXT.DOM['Main‿div‿imageHolder'].append($img.prop('src', event.target.result));
			};

            var readImage = function readImage () {
				dataURLreader.readAsDataURL(file);
				binaryReader.readAsBinaryString(file);
			};

			dataURLreader.onload = addImageToDOM;
			binaryReader.onloadend = getExif;

			setTimeout(readImage, 1);
		}