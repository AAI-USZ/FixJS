function(){
	var rockPlayer = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#rockola"
	}, [
		{
			title:"Buffaro Bill vs Los Jinetes Ja",
			artist:"Los Jawuai Surfers",
			oga:"media/Los_Jawuai-BuFaLo_BiLl_Vs_LoS_jInEtEs_Ja.ogg"
			//mp3:"media/folie_atrois_ELECTRO.mp3"
		}
	], {
		playlistOptions: {
			enableRemoveControls: true,
			autoPlay:true
		},
		swfPath: "js",
		supplied: "webmv, ogv, m4v, oga, mp3"
	});
	
	$('ul.rockolites li a.oga').click(function() {
		rockPlayer.setPlaylist([
			{
				title:$(this).text(),
				artist:this.title,
				oga: $(this).hasClass('oga')? this.href: null
			}]);
			return false;
		});
	
	$('#playList a.mp3').click(function() {
		h2 = $(this).parent().parent().children('h2').text().split(' - ')
		rockPlayer.setPlaylist([
			{
				title:h2[1],
				artist:h2[0],
				mp3: this.href
			}]);
			return false;
		});
	$('#playList a.ogg').click(function() {
		h2 = $(this).parent().parent().children('h2').text().split(' - ')
		rockPlayer.setPlaylist([
			{
				title:h2[1],
				artist:h2[0],
				oga: this.href
			}]);
			return false;
		});
	
		
	$("#playlist-setPlaylist-audio-mix").click(function() {
		rockPlayer.setPlaylist([
			{
				title:"Cro Magnon Man",
				artist:"The Stark Palace",
				mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
				oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
			},
			{
				title:"Your Face",
				artist:"The Stark Palace",
				mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
				oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
			},
			{
				title:"Hidden",
				artist:"Miaow",
				free: true,
				mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
				oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
			},
			{
				title:"Cyber Sonnet",
				artist:"The Stark Palace",
				mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
				oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
			},
			{
				title:"Tempered Song",
				artist:"Miaow",
				mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
				oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
			},
			{
				title:"Lentement",
				artist:"Miaow",
				mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
				oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
			}
		]);
	});
	// The remove commands
	
	$("#remover").click(function() {
		rockPlayer.remove(1);//
		//rockPlayer.remove(-2);
		//rockPlayer.remove(0);
	});

	// The shuffle commands

	$("#revolver").click(function() {
		rockPlayer.shuffle();
		//rockPlayer.shuffle(false);
		//rockPlayer.shuffle(true);
	});

	// The select commands

	$("#select-2").click(function() {
		rockPlayer.select(-2);
		rockPlayer.play();
	});
	// The next/previous commands
	$("#playlist-next").click(function() {
		rockPlayer.next();
	});
	$("#playlist-previous").click(function() {
		rockPlayer.previous();
	});
	// The pause command
	$("#playlist-pause").click(function() {
		rockPlayer.pause();
	});

	// Changing the playlist options

	// Option: autoPlay
	$("#playlist-option-autoPlay-true").click(function() {
		rockPlayer.option("autoPlay", true);
	});
	$("#playlist-option-autoPlay-false").click(function() {
		rockPlayer.option("autoPlay", false);
	});

	// Option: enableRemoveControls
	$("#playlist-option-enableRemoveControls-true").click(function() {
		rockPlayer.option("enableRemoveControls", true);
	});
	$("#playlist-option-enableRemoveControls-false").click(function() {
		rockPlayer.option("enableRemoveControls", false);
	});

	// Option: displayTime

	$("#playlist-option-displayTime-0").click(function() {
		rockPlayer.option("displayTime", 0);
	});
	$("#playlist-option-displayTime-fast").click(function() {
		rockPlayer.option("displayTime", "fast");
	});
	$("#playlist-option-displayTime-slow").click(function() {
		rockPlayer.option("displayTime", "slow");
	});
	$("#playlist-option-displayTime-2000").click(function() {
		rockPlayer.option("displayTime", 2000);
	});

	// Option: addTime

	$("#playlist-option-addTime-0").click(function() {
		rockPlayer.option("addTime", 0);
	});
	$("#playlist-option-addTime-fast").click(function() {
		rockPlayer.option("addTime", "fast");
	});
	$("#playlist-option-addTime-slow").click(function() {
		rockPlayer.option("addTime", "slow");
	});
	$("#playlist-option-addTime-2000").click(function() {
		rockPlayer.option("addTime", 2000);
	});

	// Option: removeTime

	$("#playlist-option-removeTime-0").click(function() {
		rockPlayer.option("removeTime", 0);
	});
	$("#playlist-option-removeTime-fast").click(function() {
		rockPlayer.option("removeTime", "fast");
	});
	$("#playlist-option-removeTime-slow").click(function() {
		rockPlayer.option("removeTime", "slow");
	});
	$("#playlist-option-removeTime-2000").click(function() {
		rockPlayer.option("removeTime", 2000);
	});

	// Option: shuffleTime

	$("#playlist-option-shuffleTime-0").click(function() {
		rockPlayer.option("shuffleTime", 0);
	});
	$("#playlist-option-shuffleTime-fast").click(function() {
		rockPlayer.option("shuffleTime", "fast");
	});
	$("#playlist-option-shuffleTime-slow").click(function() {
		rockPlayer.option("shuffleTime", "slow");
	});
	$("#playlist-option-shuffleTime-2000").click(function() {
		rockPlayer.option("shuffleTime", 2000);
	});


}