function leitura(tipo) {

	// Retaurando Cabeçalhos...	
	tabRow[0].getElementsByTagName("td").item(0).innerHTML = cab1;
	tabRow[0].getElementsByTagName("td").item(1).innerHTML = cab2;
	tabRow[0].getElementsByTagName("td").item(2).innerHTML = cab3;
	tabRow[0].getElementsByTagName("td").item(3).innerHTML = cab4;
	
	var v1=new Array(), v2=new Array(), v3=new Array(), v4=new Array(), vet= new Array(), vposic=new Array();

	for (var ct=0; ct<tabRow.length-1;ct++){

		v1[ct] = tabRow[ct+1].getElementsByTagName("td").item(0).textContent;
		v2[ct] = tabRow[ct+1].getElementsByTagName("td").item(1).textContent;		
		v3[ct] = tabRow[ct+1].getElementsByTagName("td").item(2).textContent;		
		v4[ct] = tabRow[ct+1].getElementsByTagName("td").item(3).textContent;	
		
		if (tipo == 1) {
			vet[ct] = v1[ct] + " | " + v1[ct] + " | " +  v2[ct] + " | " + v3[ct] + " | " + v4[ct];
		} else if (tipo == 2) {
			vet[ct] = v2[ct] + " | " + v1[ct] + " | " +  v2[ct] + " | " + v3[ct] + " | " + v4[ct];
		} else if (tipo == 3) {
			vet[ct] = v3[ct] + " | " + v1[ct] + " | " +  v2[ct] + " | " + v3[ct] + " | " + v4[ct];
		} else if (tipo == 4) {

			var bt = " | " + v1[ct] + " | " +  v2[ct] + " | " + v3[ct] + " | " + v4[ct];
			v4[ct] = v4[ct].replace("R$ ","");	
			while (v4[ct].indexOf(" ") >= 0){
				v4[ct] = v4[ct].replace(" ","");
			}
			while (String(v4[ct].length) < 10){
				v4[ct] = "0" + String(v4[ct]);
			}
		
			vet[ct] = v4[ct]  + bt;
		}		
	}	

	// Apresentando Cabeçalho da Tabela...
	var temp = tabRow[0].getElementsByTagName("td").item(tipo-1).textContent;
	
	if (opc == 0)	{
		vet.sort();		//	ordena vetor...
		if (temp.indexOf(" - DESC ") > -1){
			temp = temp.replace(" - DESC "," - ASC ");
		} else {
			temp +=" - ASC ";
		}
		opc = 1;
	} else {
		vet.reverse();		//	ordena vetor...
		if (temp.indexOf(" - ASC ") > -1){
			temp = temp.replace(" - ASC "," - DESC ");
		} else {
			temp += " - DESC ";		
		}
		opc = 0;
	}	

	tabRow[0].getElementsByTagName("td").item(tipo-1).innerHTML = temp;		
	
	// 	Preenchendo tabela
	for (var ct2=0;ct2<vet.length;ct2++){	
		palavra = vet[ct2].split("|");	//	converte string em vetor...
		for (ct=0;ct<4;ct++){
			tabRow[ct2+1].getElementsByTagName("td").item(ct).innerHTML = palavra[ct+1];
		}
	}	
}