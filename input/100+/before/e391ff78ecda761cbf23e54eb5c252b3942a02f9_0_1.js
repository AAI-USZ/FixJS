function(){
	cargar_lista('static/ajax/lista_reproduccion.js');
	///////////////
	rockola.init('#playList ul',
		new jPlayerPlaylist({
				jPlayer: "#jquery_jplayer_N",
				cssSelectorAncestor: "#rockola"
			}, [], {
				playlistOptions: {
					enableRemoveControls: true,
					autoPlay:true
				},
				swfPath: "js",
				supplied: "webmv, ogv, m4v, oga, mp3"
	}));
	//Cargamos el 1er audio en la lista de reproducción.
	rockola.setTrack(0);
	$('ul.rockolites li a.oga').click(function() {
		rockola.player.setPlaylist([
			{
				title:$(this).text(),
				artist:this.title,
				oga: $(this).hasClass('oga')? this.href: null
			}]);
			return false;
		});
	
	$('#playList li').click(function() {
		rockola.setTrack( $(this).attr('id').match(/[0-9]+$/)  );
	});

	$('#playList a.ogg').click(function() {
		h2 = $(this).parent().parent().children('h2').text().split(' - ')
		rockola.player.setPlaylist([
			{
				title:h2[1],
				artist:h2[0],
				oga: this.href
			}]);
			return false;
		});
	
		
	$("#playlist-setPlaylist-audio-mix").click(function() {
		//rockola.player.setPlaylist([]);
	});
	// The remove commands
	
	$("#remover").click(function() {
		rockola.player.remove(1);//
		//rockola.player.remove(-2);
		//rockola.player.remove(0);
	});

	// The shuffle commands

	$("#revolver").click(function() {
		rockola.player.shuffle();
		//rockola.player.shuffle(false);
		//rockola.player.shuffle(true);
	});

	// The select commands

	$("#select-2").click(function() {
		rockola.player.select(-2);
		rockola.player.play();
	});
	// The next/previous commands
	$("#playlist-next").click(function() {
		rockola.player.next();
	});
	$("#playlist-previous").click(function() {
		rockola.player.previous();
	});
	// The pause command
	$("#playlist-pause").click(function() {
		rockola.player.pause();
	});

	// Changing the playlist options

	// Option: autoPlay
	$("#playlist-option-autoPlay-true").click(function() {
		rockola.player.option("autoPlay", true);
	});
	$("#playlist-option-autoPlay-false").click(function() {
		rockola.player.option("autoPlay", false);
	});

	// Option: enableRemoveControls
	$("#playlist-option-enableRemoveControls-true").click(function() {
		rockola.player.option("enableRemoveControls", true);
	});
	$("#playlist-option-enableRemoveControls-false").click(function() {
		rockola.player.option("enableRemoveControls", false);
	});

	// Option: displayTime

	$("#playlist-option-displayTime-0").click(function() {
		rockola.player.option("displayTime", 0);
	});
	$("#playlist-option-displayTime-fast").click(function() {
		rockola.player.option("displayTime", "fast");
	});
	$("#playlist-option-displayTime-slow").click(function() {
		rockola.player.option("displayTime", "slow");
	});
	$("#playlist-option-displayTime-2000").click(function() {
		rockola.player.option("displayTime", 2000);
	});

	// Option: addTime

	$("#playlist-option-addTime-0").click(function() {
		rockola.player.option("addTime", 0);
	});
	$("#playlist-option-addTime-fast").click(function() {
		rockola.player.option("addTime", "fast");
	});
	$("#playlist-option-addTime-slow").click(function() {
		rockola.player.option("addTime", "slow");
	});
	$("#playlist-option-addTime-2000").click(function() {
		rockola.player.option("addTime", 2000);
	});

	// Option: removeTime

	$("#playlist-option-removeTime-0").click(function() {
		rockola.player.option("removeTime", 0);
	});
	$("#playlist-option-removeTime-fast").click(function() {
		rockola.player.option("removeTime", "fast");
	});
	$("#playlist-option-removeTime-slow").click(function() {
		rockola.player.option("removeTime", "slow");
	});
	$("#playlist-option-removeTime-2000").click(function() {
		rockola.player.option("removeTime", 2000);
	});

	// Option: shuffleTime

	$("#playlist-option-shuffleTime-0").click(function() {
		rockola.player.option("shuffleTime", 0);
	});
	$("#playlist-option-shuffleTime-fast").click(function() {
		rockola.player.option("shuffleTime", "fast");
	});
	$("#playlist-option-shuffleTime-slow").click(function() {
		rockola.player.option("shuffleTime", "slow");
	});
	$("#playlist-option-shuffleTime-2000").click(function() {
		rockola.player.option("shuffleTime", 2000);
	});
}