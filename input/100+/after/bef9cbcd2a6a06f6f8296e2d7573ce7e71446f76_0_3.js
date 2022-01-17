function(larghezza, posCornicioneAlto) {

	var spessoreParete = this.spessoreParete;

	var spessoreBordo = this.spessoreBordo;

	var larghezzaParete = larghezza;

	var altezzaParete = this.altezzaParete;

	//

	var deltaBordo = this.deltaBordo;

	//

	var frameInternoH = 5;

	var frameInternoV = 10;

	var frameEsternoH = 7 - deltaBordo;

	var frameEsternoV = 12 - deltaBordo;

	var frameEsternoTV1 = 3 + deltaBordo;

	var frameEsternoTV2 = 37.5 + deltaBordo;

	//

	var bordoH = this.bordoH;

	var bordoV = this.bordoV;

	//

	posCornicioneAlto = posCornicioneAlto || (frameEsternoTV2 + frameEsternoV + bordoV + 3*deltaBordo - this.deltaCornicione);

	//



	return COLOR(ColoriProgetto.INTONACO_BORDI)(

							STRUCT([ 

								T([1])([-spessoreBordo]),

								T([1,2])([-(2/3)*spessoreBordo,-this.altezzaBordoInferiore])( SIMPLEX_GRID( [[larghezzaParete],[this.deltaBordoInferiore * CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * spessoreBordo],[this.altezzaBordoInferiore]] ) ),

								SIMPLEX_GRID( [[larghezzaParete],[spessoreBordo],[(4/3)*bordoV]] ),

								SIMPLEX_GRID( [[larghezzaParete],[spessoreBordo],[-posCornicioneAlto,altezzaParete-posCornicioneAlto]] ),

								T([1])([-(1/3)*spessoreBordo]),

								SIMPLEX_GRID( [[larghezzaParete],[CommonParetiMeasure.cornicioneSuperiore_SpessoreRatio * spessoreBordo],[-altezzaParete,CommonParetiMeasure.cornicioneSuperiore_AltezzaRatio * bordoV]] )

							])

						);	

}