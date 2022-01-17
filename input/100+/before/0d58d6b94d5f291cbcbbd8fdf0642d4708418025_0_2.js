function(newwords) {
	    //links = [];
	    //nodes = [];
	    //var dic = {};
	    // create the dictionary of all words
	    // that originate from given words
	    // and create links
	    var ii = 1;
	    newwords.forEach(function(w1) {
		// the first element is rows is the same as 
		rows[labels[w1]].forEach(function(w2) {
		    if (dic[w2] == null) {
			dic[w2] = cntr;
			nodes.push({name: w2, index:labels[w2], group:gcntr, idic:cntr});
			//console.log(cntr,w1,w2,dic[w1],dic[w2])
			cntr++;
		    }
		    if (w1 != w2) {
			var tt = {source: dic[w1], target: dic[w2]};
			//console.log(ii++,w1,w2,labels[w1],labels[w2],dic[w1],dic[w2],tt);
			links.push(tt);
		    }
		});
		gcntr++;
	    });
	    info.report('You are viewing '+words.length+' words and '+nodes.length+' nodes.');

	}