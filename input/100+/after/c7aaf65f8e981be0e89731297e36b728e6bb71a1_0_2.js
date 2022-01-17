function(e) {
				
				if (anguloInicial !== null) {

					var self = this,
						anguloEmRadianos = Math.atan2(tunerCenterY - e.pageY, tunerCenterX - e.pageX),
						anguloRelativo = anguloEmRadianos * (180 / Math.PI),
						anguloTemp = anguloAtual;					
					
					anguloAtual = (anguloInicial * 0) + (anguloRelativo - anguloInicial);
					var angTemp = (anguloTemp - anguloAtual);
					
					if (angTemp > 180) {
						angTemp -= 360;
					}
					if (angTemp < -180) {
						angTemp += 360;
					}

					pointerPosInicial += angTemp * -0.07;

					if (pointerPosInicial < 0) {
						pointerPosInicial = 0;
					} else if (pointerPosInicial > pointerPosFinal) {
						pointerPosInicial = pointerPosFinal;
					}

					pointer.setStyle("left", pointerPosInicial);

					Y.one(tunerRotElement).setStyle("MozTransform", "rotate(" + anguloAtual + "deg)");
					Y.one(tunerRotElement).setStyle("webkitTransform", "rotate(" + anguloAtual + "deg)");
					Y.one(tunerRotElement).setStyle("transform", "rotate(" + anguloAtual + "deg)");

					// calcula canal e ruido
					var newChannel = Math.round( (pointerPosInicial * (numChannels - 1)) / displayWidth) ;
					
					if (newChannel != channel) {
						
						audios[channel].pause();
						audios[channel].currentTime = 0;
						
						channel = newChannel;
						
						if (playing) {
							audios[channel].play();
						}

					}
					
					wavePos = (Math.cos( ((pointerPosInicial * (numChannels - 1) * 2) / displayWidth) * Math.PI ) * 0.5 + 0.5);
					setVolume(volumeAudio);

				}

			}