function(resource,cssom,rule,index){

		var s = rule.style;

		var len = s.length;

		//key->{property:[value,important,prefixIndex]}

		var valueMap = {};

		for(var i=0;i<len;i++){

			var n = s[i];

			var item = [s.getPropertyValue(n),s.getPropertyPriority(n)]

			var prefixIndex = sourcePrefix.length;

			var prefix = n.replace(/^(-(?:(?:moz|o|ms|webkit|ie\d*)-)+).*/,'$1');

			if(prefix!=n){//先不考虑 ie -前缀 hack

				n = n.substring(prefix.length);

				//console.log(prefix,'/',n)

				prefixIndex = findPrefixIndex(prefix);

				//console.log(prefixIndex,item,valueMap[n])

				if(prefixIndex<0){

					continue;

				}

			}

			

			var value = valueMap[n]

			if(!value || prefixIndex <= value[2]){

				item.push(prefixIndex);

				valueMap[n] = item;

			}

		}

		while(len--){

			s.removeProperty(s[len]);

		}

		for(var n in valueMap){

			var item = valueMap[n];

			var v = valueFormatter(n,item[0]);

			var p = item[1];

			n = formatProperty(n);

			if(v && n){

				s.setProperty(n,v,p)

			}else{

				console.log('invalid css property and value',n,v)

			}

		}

	}