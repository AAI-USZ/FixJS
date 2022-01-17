function(obj){
		var target = $(obj).find(selectors[15]+' '+selectors[1]+', .hz_img-in-post img'),
			length = target.length;

		if (length > 1){
			var postid = obj.parentNode.parentNode.parentNode.id;

			var link = $('<div class="hz_dlButton" aria-label="'+lang.piclink01+' ('+length+' '+lang.set08+')" data-tooltip="'+lang.piclink01+' ('+length+' '+lang.set08+')" role="button"><span></span><small>'+length+'</small></div>').click(function(){
				if (options.hz_dl_link_option === '2'){
					for (var i=0; i<length; i++){
						var url = target[i].src;
						url = url.match(/\?sz|\/proxy/) ? url.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : url.replace(picasaRegex,'/s0/$2');
						openWindow(url);
					}
				} else {
					if (!$(this).next().hasClass('hz_stacksDetail')){
						var html = '<div class="hz_closeButton"></div><strong>'+lang.piclink01+'</strong>';

						for (var i=0; i<length; i++){
							var url = target[i].src,
								id = postid + '-' + i;

							url = url.match(/\?sz|\/proxy/) ? url.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : url.replace(picasaRegex,'/s0/$2');
							if (options.hz_dl_link_option === '0'){
								html += '<div class="hz_stackItem" data-original="'+url+'"><label for="'+id+'"><img src="'+url.replace(/\/s0\//, '/w54-h54-p/')+'" width="54" height="54"></label><input id="'+id+'" type="checkbox"></div>';
							} else {
								html += i == 0 ? '<a href="'+url+'">'+(i+1)+'</a>' : ' - <a href="'+url+'">'+(i+1)+'</a>';
							}
						}

						if (options.hz_dl_link_option === '0') html += '<nav><a class="hz_stacks_downloadSelected" href="javascript:void(0)">'+lang.fs03+'</a><a class="hz_stacks_selectAll" href="javascript:void(0)">'+lang.piclink03+'</a></nav>';

						var popup = $('<div class="hz_stacksDetail">'+html+'</div>').on('click', '.hz_closeButton', function(){
							$(this).parent().fadeOut(300);
						});

						if (options.hz_dl_link_option === '1'){
							popup.on('click', 'a', function(){
								openWindow(this.href);
								return false;
							});
						}

						$(this).after(popup).next().fadeIn(300).offset({left: $(this).offset().left - 13, top: $(this).offset().top + 31}).parentsUntil(selectors[13]).next().find(selectors[4]).css('position', 'static');
					} else {
						if ($(this).next().is(':hidden')){
							$(this).next().fadeIn(300).offset({left: $(this).offset().left - 13, top: $(this).offset().top + 31});
						} else {
							$(this).next().fadeOut(300);
						}
					}
				}
			});
		} else if (length == 1){
			var url = target[0].src;
			url = url.match(/\?sz|\/proxy/) ? url.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : url.replace(picasaRegex,'/s0/$2');
			var link = $('<a class="hz_dlButton" href="'+url+'" aria-label="'+lang.piclink01+'" data-tooltip="'+lang.piclink01+'" role="button"><span></span></a>').on('click', function(){
				openWindow(url);
				return false;
			});
		}

		$(obj).next().children().eq(-1).before(link);
	}