function(w2) {
		    if (dic[w2] == null) {
			dic[w2] = cntr;
			order[dic[w2]] = 0;
			nodes.push({name: w2, index:labels[w2], group:gcntr, idic:cntr});
			//console.log(cntr,w1,w2,dic[w1],dic[w2])
			cntr++;
		    }
		    if (w1 != w2) {
			var tt = {source: dic[w1], target: dic[w2]};
			//console.log(ii++,w1,w2,labels[w1],labels[w2],dic[w1],dic[w2],tt);
			links.push(tt);
			order[dic[w2]] = order[dic[w2]] + 1;
		    }
		}