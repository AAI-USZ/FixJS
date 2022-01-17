function(token) {
	token = token.toLowerCase().replace(/ё/g, 'e');
	var volwesRegexp = /^(.*?[аеиоюяуыиэ])(.*)$/g;
	var RV = volwesRegexp.exec(token);
	if (!RV || RV.length < 3) {
		return token;
	}
	var head = RV[1];
	RV = RV[2];
	volwesRegexp.lastIndex = 0;
	var R2 = volwesRegexp.exec(RV);
	var result = perfectiveGerund(RV);
	if (result === null) {
		var resultReflexive = reflexive(RV) || RV;
		result = adjectival(resultReflexive);
		if (result === null) {
			result = verb(resultReflexive);
			if (result === null) {
				result = noun(resultReflexive);
				if (result === null) {
					result = resultReflexive;
				}
			}
		}
	}
	result = result.replace(/и$/g, '');
	var derivationalResult = result
	if (R2 && R2[2]) {
		derivationalResult = derivational(R2[2]);
		if (derivationalResult != null) {
			derivationalResult = derivational(result);
		} else {
			derivationalResult = result;
		}
	}

	var superlativeResult = superlative(derivationalResult) || derivationalResult;

	superlativeResult = superlativeResult.replace(/(н)н/g, '$1');
	superlativeResult = superlativeResult.replace(/ь$/g, '');
	return head + superlativeResult;
}