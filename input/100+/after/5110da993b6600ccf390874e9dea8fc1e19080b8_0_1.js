function(){
			var arr = $(_this).parentsUntil('.Ry').find('.aG'),
				links = [];

			if (arr.length > 0){
				var num = $.inArray(_this, arr);

				for (var i=0, len=arr.length; i<len; i++){
					var item = arr[i];
					links.push((item.src.match(/\?sz|\/proxy/) ? item.src.replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : item.src.replace(picasaRegex,'/s0/$2')));
				}
			} else {
				var num = 0;
				links.push(_this.href || _this.src);
			}

			hide();
			lightbox.start(links, num);
		}