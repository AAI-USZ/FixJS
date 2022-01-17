function handleFiles(files) {
        if (files && files.length > 0) {
            if(files[0].type.indexOf('image/') != -1) {
                var reader = new FileReader();
				reader.onprogress = function(e) {
					if(e.lengthComputable) {
						progress.css('width', ((e.loaded / e.total) * 100) + '%');
					}
					else {
						progress.css('width', '100%');
					}
				};
                reader.onload = function(e) {
                    if(!dropzoneImage) {
                        dropzoneImage = $(document.createElement('img'));
                        dropzoneImageContainer.append(dropzoneImage);
                        dropzoneImage.on('load', function() {
                            dropzonePos.width = dropzoneImageContainer.width();
                            dropzonePos.height = dropzoneImageContainer.height();
                            dropzone.css('height', dropzonePos.height + 30);
                            
                            locked = false;
                            lockControl.removeClass('active');
                            
                            dropzoneContent.addClass('faded');
                            dropzoneImageContainer.removeClass('faded');
                        });
                    }
                    dropzoneImage.attr('src', '');
                    dropzoneImage.attr('src', e.target.result);
                    dropzoneImageType = files[0].type;
                    resetBtn.removeAttr("disabled");
                };
                reader.readAsDataURL(files[0]);
            }
        }
    }