function(obj){
		var target = $(obj).children('.Yj'),
			length = target.length,
			parentWidth = $(obj).width(),
			original = [],
			modified = [],
			button = $('<div class="hz_dlButton hz_maxPicResize" aria-label="'+lang.maxpic01+'" data-tooltip="'+lang.maxpic01+'"><span></span></div>').click(function(){
				if (target.eq(0).hasClass('hz_maxPic_container')){
					target.each(function(i){
						$(this).removeClass('hz_maxPic_container').children().children().attr('src', original[i]);
					});
				} else {
					target.each(function(i){
						$(this).addClass('hz_maxPic_container').children().children().attr('src', modified[i]);
					});
				}

				$(document).scrollTop(this.parentNode.parentNode.parentNode.parentNode.offsetTop);
			});
		
		target.each(function(i){
			var children = this.childNodes[0].childNodes[0],
				src = children.src;
			original.push(src);
			src = length == 3 && i > 0 && options.hz_maxpic_option === '1' ? src.replace(picasaRegex, '/w'+parseInt(parentWidth/2)+'-h'+parseInt(parentWidth/2)+'-p/$2') : src.replace(picasaRegex, '/w'+parentWidth+'/$2');
			
			children.src = src;
			modified.push(src);
			$(this).addClass('hz_maxPic_container');
		});

		$(obj).parentsUntil('.ii').next().children().eq(-1).before(button);
	}