function _init () {
			audiolet = new Audiolet(sampleRate, 2, bufferSize);
			audiolet.scheduler.setTempo(100);

			// Create empty buffers for the bass drum, hi hat and snare drum
			channels[0].buffer = new AudioletBuffer(1, 0);
			channels[1].buffer = new AudioletBuffer(1, 0);
			channels[2].buffer = new AudioletBuffer(1, 0);
			// Load wav files using synchronous XHR
			channels[0].buffer.load('assets/audio/bd_stereo.wav', false);
			channels[1].buffer.load('assets/audio/hh_stereo.wav', false);
			channels[2].buffer.load('assets/audio/sn_stereo.wav', false);

			// Create buffer players
			channels[0].buffer = new BufferPlayer(audiolet, channels[0].buffer, 1, 0, 0);
			channels[1].player = new BufferPlayer(audiolet, channels[1].buffer, 1, 0, 0);
			channels[2].player = new BufferPlayer(audiolet, channels[2].buffer, 1, 0, 0);

			// Create trigger to re-trigger the playback of samples
			channels[0].trigger = new TriggerControl(audiolet);
			channels[1].trigger = new TriggerControl(audiolet);
			channels[2].trigger = new TriggerControl(audiolet);

			// Create gain objects to control the individual gain of samples
			channels[0].gain = new Gain(audiolet, 1.00);
			channels[1].gain = new Gain(audiolet, 0.80);
			channels[2].gain = new Gain(audiolet, 0.80);
			// Create pan objects to control the individual gain of samples
			channels[0].pan = new Pan(audiolet, 0.45);
			channels[1].pan = new Pan(audiolet, 0.65);
			channels[2].pan = new Pan(audiolet, 0.40);

			// Connect it all up
			//
			// output of trigger to input of player
			channels[0].trigger.connect(channels[0].player, 0, 1);
			channels[1].trigger.connect(channels[1].player, 0, 1);
			channels[2].trigger.connect(channels[2].player, 0, 1);
			// output of player to input of gain
			channels[0].player.connect(channels[0].gain);
			channels[1].player.connect(channels[1].gain);
			channels[2].player.connect(channels[2].gain);
			// output of gain to input of pan
			channels[0].gain.connect(channels[0].pan);
			channels[1].gain.connect(channels[1].pan);
			channels[2].gain.connect(channels[2].pan);
			// output of pan to general output
			// all three signals will be added together when connected to the output
			channesl[0].pan.connect(audiolet.output);
			channels[1].pan.connect(audiolet.output);
			channels[2].pan.connect(audiolet.output);

			// Create default patterns:
			//
			// Each durations object specifies the duration of one note.
			// 0.25 is equal to a sixtenth note (or if you prefer "semiquaver")
			//
			// The pattern objects specifies the amplitude of each sample:
			// 0 -> mute
			// 1 -> medium
			// 2 -> loud
			channels[0].duration = new PSequence([0.25], Infinity);
			channels[0].pattern = new PSequence([1, 0, 1, 1,   0, 1, 0, 2,
											2, 0, 1, 0,   0, 1, 0, 0,
											1, 0, 1, 1,   0, 1, 0, 2,
											2, 0, 1, 0,   1, 0, 2, 0], Infinity);

			channels[1].duration = new PSequence([0.25], Infinity);
			channels[1].pattern = new PSequence([1, 0, 0, 0,   2, 0, 0, 0,
											1, 0, 0, 0,   2, 0, 0, 0,
											1, 0, 0, 0,   2, 0, 0, 0,
											1, 0, 0, 0,   2, 0, 0, 0], Infinity);

			channels[2].duration = new PSequence([0.25], Infinity);
			channels[2].pattern = new PSequence([0, 0, 0, 0,   1, 0, 0, 0,
											0, 0, 0, 0,   2, 0, 0, 0,
											0, 0, 0, 0,   1, 0, 0, 0,
											0, 1, 0, 0,   2, 0, 0, 1], Infinity);

			return channels;
		}