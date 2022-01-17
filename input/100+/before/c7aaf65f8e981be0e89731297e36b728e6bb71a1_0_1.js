function(e) {

				if (volumeAnguloInicial !== null) {

					var self = this,
						anguloEmRadianos = Math.atan2(volumeCenterY - e.pageY, volumeCenterX - e.pageX),
						anguloRelativo = anguloEmRadianos * (180 / Math.PI),
						anguloTemp = volumeAnguloAtual;
										
					volumeAnguloAtual = (volumeAnguloInicial * 0) + (anguloRelativo - volumeAnguloInicial);
					
					var angTemp = (anguloTemp - volumeAnguloAtual);

					//mantem o angulo entre 0 e 360
					if (volumeAnguloAtual < 0) {
						volumeAnguloAtual += 360;
					}

					if (volumeAnguloAtual > 360) {
						volumeAnguloAtual -= 360;
					}

					if (volumeAnguloAtual < 90 && anguloTemp > 270 && blockMove != -1) {
					    blockMove = 1;
					    volumeAnguloInicial = null;
					}

					if (volumeAnguloAtual < 180 && anguloTemp < 270 && blockMove != 1) {
					    blockMove =- 1;
					    volumeAnguloInicial = null;
					}

					if(blockMove == -1) {
					    volumeAnguloAtual = 180;
					}

					if(blockMove == 1) {
						volumeAnguloAtual = 360;
					}

					volumeAudio = ( volumeAnguloAtual - 180 ) / 180;

					setVolume(volumeAudio);

                    Y.one(volumeRotElement).setStyle("-webkit-transform", "rotate(" + volumeAnguloAtual + "deg)");
                    Y.one(volumeRotElement).setStyle("-moz-transform", "rotate(" + volumeAnguloAtual + "deg)");
				}

			}