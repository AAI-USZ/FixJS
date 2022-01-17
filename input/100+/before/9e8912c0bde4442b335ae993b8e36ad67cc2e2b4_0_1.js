function (nb, l, c) {
  for (i = 0; i < 9; i++) {
    //console.log('i=' + i + ', c=' + c + ', grid[' + l + '][' + i + ']=' + this.grid[l][i] + ', nb=' + nb);
	  if (i != c && this.grid[l][i] == nb) {
	    //console.log('pas bon');
	    return false;
		}
	}
		 	
	for (i = 0; i < 9; i++)
	  if (i != l && this.grid[i][c] == nb)
		 	return false;
	
	var i = (c % 3 == 0) ? c : ((c % 3 == 1) ? c - 1 : c - 2);
	var ibis = i + 3;
	var j = (l % 3 == 0) ? l : ((l % 3 == 1) ? l - 1 : l - 2);
	var jbis = j + 3;
	
	for (; i < ibis; i++)
		for (; j < jbis; j++)
			if ((i != l || j != c) && this.grid[i][j] == nb)
				return false;
	
	return true;
}