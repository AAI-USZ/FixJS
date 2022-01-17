function(matrix, fix) {
				var cleaned = matrix.toArray().map(function(n){
					return (fix && (parseInt(n, 10) !== n)) ? n.toFixed(fix) : n
				});
				
				var css = cleaned.join(',');
				cleaned[4] += 'px';
				cleaned[5] += 'px';				
				var moz = cleaned.join(',');
				
				return [
					'-webkit-transform: matrix(' + css + ');',
					'-moz-transform: matrix(' + moz + ');',
					'-ms-transform: matrix(' + css + ');',
					'-o-transform: matrix(' + css + ');',
					'transform: matrix(' + css + ');'
				].join('\n');
			}