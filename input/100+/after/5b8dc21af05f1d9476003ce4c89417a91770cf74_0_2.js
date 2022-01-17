function() {

	var spessoreParete = this.spessoreParete;

	var spessoreBordo = this.spessoreBordo;

	var larghezzaParete = this.larghezzaParete;

	var altezzaParete = this.altezzaParete;

	//

	var deltaBordo = this.deltaBordo;

	//

	var frameInternoH = 5;

	var frameInternoV = 10;

	var frameEsternoH = 7 - deltaBordo;

	var frameEsternoV = 12 - deltaBordo;	

	var frameInternoHB = 6.5;

	var frameInternoVB = 13.5;

	var frameEsternoHB = 8.5 - deltaBordo;

	var frameEsternoVB = 15.5 - deltaBordo;

	var frameEsternoTV1 = 3 + deltaBordo;

	var frameEsternoTV2 = 37.5 + deltaBordo;

	//

	var bordoH = this.bordoH;

	var bordoV = this.bordoV;

	//



	var modelloParete = COLOR(ColoriProgetto.INTONACO_BASE)(

							STRUCT([ 

									// Grosso

									SIMPLEX_GRID( [[(larghezzaParete-frameInternoHB)/2,-frameInternoHB,(larghezzaParete-frameInternoHB)/2],[spessoreParete],[frameEsternoTV2]] ),

						  			SIMPLEX_GRID( [[-((larghezzaParete-frameInternoHB)/2),frameInternoHB,-((larghezzaParete-frameInternoHB)/2)],[spessoreParete],

						  			 	[frameEsternoTV1+bordoV,-frameInternoVB,frameEsternoTV2-frameEsternoTV1-frameInternoVB]] ) ,

						  			// Piccolo

						  			SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[-frameEsternoTV2, altezzaParete-frameEsternoTV2]] ),

						  			SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],

						  			 	[-frameEsternoTV2,bordoV,-frameInternoV,altezzaParete-frameInternoV-frameEsternoTV2-bordoV]] )

							])

						);



	var bordoFinestra = COLOR(ColoriProgetto.INTONACO_BORDI)(

							STRUCT([ 	

								// Grosso

								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoHB-(bordoH*2))/2),bordoH,-frameInternoHB,bordoH,-((larghezzaParete-frameInternoHB-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV1,frameEsternoVB+bordoV]] ),

								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoHB)/2),frameInternoHB,-((larghezzaParete-frameInternoHB)/2)],[spessoreBordo],[-frameEsternoTV1,bordoV,-frameInternoVB,bordoV]] ),

								// Piccolo

								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV2,frameEsternoV+bordoV,-(altezzaParete-frameEsternoTV2-frameEsternoV-bordoV)]] ),

								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameEsternoTV2,bordoV,-frameInternoV,bordoV,-(altezzaParete-frameEsternoTV2-(bordoV*2)-frameInternoV)]] )

							])

						);



	var posCornicioneAlto = frameEsternoTV2 + frameEsternoV + bordoV + 3*deltaBordo - this.deltaCornicione;

	var cornicioni = this.getCornicioni(larghezzaParete, posCornicioneAlto);



	var posBordoFinestra = T([1])([-spessoreBordo])(bordoFinestra);



	var finestraVetriInf = T([0,1,2])([(larghezzaParete-frameInternoHB)/2,spessoreParete/2,frameEsternoTV1+bordoV])( this.creaFinestraGrossa(frameInternoHB, frameInternoVB, true) );

	var finestraVetriSup = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV1+bordoV])( this.creaFinestraPiccola(frameInternoH, frameInternoV) );



	// finalModel

	var finalModel = [];

	finalModel.push( modelloParete );

	finalModel.push( cornicioni );

	finalModel.push( posBordoFinestra );

	finalModel.push( finestraVetriInf );

	finalModel.push( T([2])([frameEsternoTV2-frameEsternoTV1]) );

	// finalModel.push( posBordoFinestra );

	finalModel.push( finestraVetriSup );



	return  STRUCT(finalModel);

}