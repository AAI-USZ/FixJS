function(s,e,w,h) {
	{
		var _g1 = s, _g = w + 1;
		while(_g1 < _g) {
			var i = _g1++;
			{
				var _g3 = e, _g2 = h + 1;
				while(_g3 < _g2) {
					var j = _g3++;
					if(this.grid[i][j] != 0) return false;
				}
			}
		}
	}
	return true;
}