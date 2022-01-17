function initCrop(type, contentParent){
		if (typeof(contentParent) === 'undefined') return;
		var cropable = contentParent.find('.cropable');
		if (contentParent.find('#imagecrop_x').length == 0){
			cropable.each(function(){
				var parent = jQuery(this).parent();
				parent.append(jQuery('<input type="hidden" id="imagecrop_x" name="imagecrop_x" />'));
				parent.append(jQuery('<input type="hidden" id="imagecrop_y" name="imagecrop_y" />'));
				parent.append(jQuery('<input type="hidden" id="imagecrop_w" name="imagecrop_w" />'));
				parent.append(jQuery('<input type="hidden" id="imagecrop_h" name="imagecrop_h" />'));
			});
		}
		cropable.Jcrop({
			aspectRatio: 1,
			bgOpacity: .6,
			minSize: [400, 400],
			onSelect: updateCoords,
			onChange: updateCoords,
			onRelease: releaseCheck,
		},function(){
			jcrop_api = this;
			jcrop_api.animateTo([0,0,400,400]);
		});
		cropable.removeClass('cropable');
	}