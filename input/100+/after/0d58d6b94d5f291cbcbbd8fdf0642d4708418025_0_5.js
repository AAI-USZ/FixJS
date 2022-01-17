function(d) {
			var i = (importance[dic[d.name]] == null ? 0 : importance[dic[d.name]]);
			//console.log(d.name,i)
			//console.log(d.name,importance[dic[d.name]],Math.min(100,importance[dic[d.name]])/100*noderadius*2)
			return noderadius + Math.min(200,i)/200*noderadius*2;
		    }