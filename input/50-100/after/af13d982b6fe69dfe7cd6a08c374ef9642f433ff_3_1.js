function(a,b) {
			a = [];
			for(var i=0;i<b.length;i++) {
				var temp = [];
				for(var j=0;j<b[i].length;j++) {
					temp.push(b[i][j]);	
				}
				a.push(temp);
			}

		/*
			for(var i=0;i<b.length;i++) 
				for(var j=0;j<b[i].length;j++) {
					console.log(i+"<>"+j);
					a[i][j] = b[i][j];
				}
				*/
		}