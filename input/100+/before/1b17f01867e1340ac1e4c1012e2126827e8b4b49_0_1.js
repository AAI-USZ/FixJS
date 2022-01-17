function (teksto) {
			teksto = teksto.replace(/[^\w\d]+/g, " ").replace(/\s\s+/gi, " ");
			var vortoj = teksto.split(" ");
			
			vortoj2 = new Array();
			
			// forigu duplikatoj
			for(var i = 0;i < vortoj.length;i++){
				var vrt = foxvortaro.trim(vortoj[i]).toLowerCase();
				
				if (vrt != '' && vortoj2.indexOf(vrt) < 0){
					vortoj2.push(vrt);
				}
				
				if (vortoj2.length >= foxvortaro.maksKvanto){
					break;
				}
			}
			
			var doc = content.document;
			var tabelo = $('<table>', doc).attr('class', 'spec');
			
			for(var i = 0;i < vortoj2.length;i++){
				var vorto = vortoj2[i];
				var rez = foxvortaro.traduku(vorto);
					
				if (rez != null)
					tabelo.append(foxvortaro.tabeligi(rez.v, rez.t));
				else
					tabelo.append(foxvortaro.tabeligi(vorto, null));
			}
			
			var html = $('<div>', doc).append(tabelo.clone()).remove().html();
			
			return html;
		}