function() {
			var cur = parseInt(audio.currentTime, 10),
			pos = (audio.currentTime / audio.duration) * 100;
			function format(obJ){
				return pt(obJ/60)+":"+pt(obJ%60)
			}			
			function pt(n){
				n=parseInt(n);
				return n>9?n:'0'+n;
			}			
			$('#timeleft').text(format(audio.currentTime)+'/'+format(audio.duration));
			$('#loading').css({width: pos + '%'});
			//window.location.hash='!/'+$('.playing').children('#title').text()+'/'+$('.playing').children('#album').text()+'/'+$('.playing').children('#artist').text()+'/'+$('.playing').children('#id').text()+'/'+parseInt(audio.currentTime);
		}