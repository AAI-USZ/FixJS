function rev(vet){		//	ordenando vetor ao contrario....
	vet.sort();
	var vet2 = new Array();
	var ct2 = 0;
	for (var ct=vet.length-1;ct>=0;ct--){
		vet2[ct] = vet[ct2];
		ct2++;
	}
	return vet2;
}