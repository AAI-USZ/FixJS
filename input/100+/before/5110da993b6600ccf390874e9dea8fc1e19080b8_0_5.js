function(data){
				var data = data.responseText,
					title = encode($(data).find('#eow-title').attr('title'));
					
				var regexp_url = new RegExp('"url_encoded_fmt_stream_map": "([^"]*)"', 'i');
				data.match(regexp_url);
				var map = RegExp.$1.split(',');

				if (map.length > 0){
					var appends = '';

					for (var i=0, len=map.length; i<len; i++){
						var item = execHash(map[i]);
						if (typeof item.url != 'undefined'){
							var url = decodeURIComponent(item.url).replace(/\\u0026quality/, '')+'&title='+title,
								itag = url.replace(/(.*)itag=(\d+)(.*)/, '$2'),
								tag = format[itag],
								desc = typeof tag != 'undefined' ? tag.desc+'<small>'+tag.format+' / '+tag.res+'</small>' : lang.ytdl09+'<small>itag='+itag+'</small>';

							appends += i == 0 ? '<a href="'+url+'" target="_blank">'+desc+'</a>' : '<br><a href="'+url+'" target="_blank">'+desc+'</a>';
						}
					}

					ele.addClass('loaded').append(appends).parentsUntil(selectors[13]).next().find(selectors[4]).css('position', 'static');
				} else {
					$notify.html(lang.ytdl08);
				}
			}