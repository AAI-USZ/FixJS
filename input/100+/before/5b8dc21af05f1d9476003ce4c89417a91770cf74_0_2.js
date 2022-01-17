function(frameInternoH, frameInternoV, conInferriata) {

	conInferriata = conInferriata || false;

	//

	var spessoreParete = this.spessoreParete;

	var spessoreBordo = this.spessoreBordo;

	var larghezzaParete = this.larghezzaParete;

	var altezzaParete = this.altezzaParete;

	//

	var spessBandaH = 0.3;

	var spessBandaV = spessBandaH;

	var spessVetro = spessBandaH/3;



	//

  	var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(

   							SIMPLEX_GRID([[spessBandaV],[spessoreBordo],[frameInternoV]])

   						  );

  	var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(

  							 SIMPLEX_GRID([[frameInternoH],[spessoreBordo],[spessBandaH]])

  							);

	var vetro = COLOR(ColoriProgetto.VETRO)(

					BOUNDARY(

   						SIMPLEX_GRID([[frameInternoH],[spessVetro],[frameInternoV]])

   					)

   				);

  	var bandeLaterali = COLOR(ColoriProgetto.INFISSO_FINESTRA)(

   					SIMPLEX_GRID([[spessBandaV],[spessBandaV],[frameInternoV]])

   				);



  	var finModel = [];

	finModel.push(T([1])([spessVetro])(vetro));

	finModel.push(bandeLaterali);

	finModel.push(T([0])([(frameInternoH-spessBandaV)])(bandeLaterali));

	finModel.push(T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale));

	finModel.push(T([0])([spessBandaV])(sbarraOrizzontale));

	finModel.push(T([0,2])([spessBandaV,frameInternoV-spessBandaH])(sbarraOrizzontale));

	if ( conInferriata == true ) {

		finModel.push(T([1])([-(spessBandaV/2)])(this.creaFinestra_InferriataQuadrata(frameInternoH, frameInternoV)));

	}	



	return STRUCT(finModel);

}