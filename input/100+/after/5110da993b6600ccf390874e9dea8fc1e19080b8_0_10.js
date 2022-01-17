function(obj){
		var parentWidth = $(obj).parent().parent().width(),
			target = obj.childNodes[1],
			original, modified,
			button = $('<div class="hz_dlButton hz_maxPicResize" aria-label="'+lang.maxpic01+'" data-tooltip="'+lang.maxpic01+'"><span></span></div>').click(function(){
				if ($(obj).hasClass('hz_maxPic_container')){
					target.src = original;
					$(obj).parent().removeClass('hz_maxPic_container');
				} else {
					target.src = modified;
					$(obj).parent().addClass('hz_maxPic_container');
				}

				$(document).scrollTop(this.parentNode.parentNode.parentNode.parentNode.offsetTop);
			});

		var src = target.src;
		original = src;
		src = src.match(/\?sz|\/proxy/) ? src.replace(/resize_\D?=\d+/, 'resize_w='+parentWidth) : src.replace(picasaRegex,'/w'+parentWidth+'/$2');
		modified = src;
		target.src = src;
		obj.removeChild(obj.childNodes[0]);
		$(obj).parent().addClass('hz_maxPic_container').parentsUntil('.ii').next().children().eq(-1).before(button);
	}