function() {

	var $keys           = $(".keys")
    , $drum           = $("#drum")
    , currentBeat   	= 0
	  , beatResolution 	= 4		// Ticks per beat
	  , beatsPerMinute  = 100
	  , msTickDelay 	  = (1000 * 60) / (beatResolution * beatsPerMinute)
	  , pianoQueue		  = []
	  , drumQueue		    = []
	  , $met 			      = $("#met")
	;

  // Put Socket.IO Connection Here!
  var socket_io = new io.connect('http://' + window.location.host);

  socket_io.emit('enter', window._role, window._num);

	$keys.on("note-intercept", function(e, note) {
    socket_io.emit('broadcast', JSON.stringify({note: note, type: "p"}));
	});

  $drum.on("note-intercept.drum", function(e, note) {
    socket_io.emit('broadcast', JSON.stringify({note: note, type: "d"}));
  });

  socket_io.on('start_metronome', startMetronome);

  socket_io.on('receive_notes', function(note) {
    note = JSON.parse(note);

    switch(note.type) {
    case "p": playPianoNote(note.note); break;
    case "d": playDrumNote(note.note); break;
    default: return; break;
    }
  });

  function startMetronome() {
    if(metronome) {clearInterval(metronome);}
    var metronome = setInterval(function onBeat() {
      // Push this into the next event loop so we can trigger the audio
      setTimeout(function() {$(document).trigger("metronome", [currentBeat]);}, 0);

      processPianoQueue();
      processDrumQueue();

      updateBeat();
    }, msTickDelay);
  }

  socket_io.on('receive_player', function(role, partner) {
       $('#' + role).append("<a href='" + partner["link"] + "'><img height='40' src='" + partner["picture"]["data"]["url"] + "'/>" + partner["first_name"] + "</a> ");
          console.log(partner);
  });

  function playDrumNote(note) {
    $drum.trigger("triggerBtn.drum", [note]);
  }

  function playPianoNote(note)
  {
		$keys.trigger('note-'+note+'.play');
  }

	function processPianoQueue()
	{

	}

	function processDrumQueue()
	{

	}

	function updateBeat() {return currentBeat = currentBeat == 15 ? 0 : currentBeat+1;}

}