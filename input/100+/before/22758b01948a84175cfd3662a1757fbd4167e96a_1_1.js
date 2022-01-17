function(e){
		if(e.note_number == 36 && e.midi_channel == 9){
			newRandomCameraMovement(e.time_to_next_sameevent / midi.ticks_per_second * 44100*0.5);
		}
	}