function() {
//			var rem = parseInt(audio.duration - audio.currentTime, 10),
			var rem = parseInt(audio.currentTime, 10),
			pos = (audio.currentTime / audio.duration) * 100,
			mins = Math.floor(rem/60,10),
			secs = rem - mins*60;
			$('#timeleft').text(mins + ':' + (secs > 9 ? secs : '0' + secs));
			$('#loading').css({width: pos + '%'});
			window.location.hash='!/'+$('.playing').children('#title').text()+'/'+$('.playing').children('#album').text()+'/'+$('.playing').children('#artist').text()+'/'+$('.playing').children('#id').text();//+'/'+parseInt(audio.currentTime);
		}