function(setting) {	
			var str ="";
			var url = "../phpdb/phyloDB2.php";
			var type = this.tp;
			var score = this.score;
	
			if(type == "random") {
				str+= "mode=1&diff="+score;

			} else if(type == "disease") {
				mode = 2;
				str+= "mode=2&id="+score;

			} else if(type == "level") {
				mode = 2;
				str+= "mode=2&id="+score;
			}

			console.log(str);

			$.ajax({
				url : url,
				data : str,
				type : "POST",
			}).done(function(data) {
				console.log(data);
				data = data.replace("@","");
				if(DEBUG)
					console.log(data);
				try {
					var j = eval("["+data+"]")[0].level;
				} catch(err) {
					if(DEBUG)
						console.log(err);
					return;
				}
				$.phylo.id = j.attributes.id;
				for(var i =0;i<j.sequence.length;i++) {
					j.sequence[i] = (j.sequence[i].replace(/-/g,"_")).toUpperCase();
				}	
				$.phylo.get = {};
				$.phylo.get.sequence = j.sequence;
				
				if(DEBUG) {
					j.sequence;
					j.tree;
				}
				$.phylo.get.treeString = j.tree;
				var tree = $.newick.parse(j.tree); 
				$.phylo.get.tree = tree;
				$.main.callBack();

			}).fail(function() {
				var dummy = '{"level":{"attributes":{"id":"3071"},"sequence":["-----GAGGATCCAGC-----","-----GAGGCTCAAGC-----","TTTTGAAAACTAGATA-----","-----GGAGTCTAAAA-----","-----AGGCGCTAAAAACAAA","------GGAACTCCAA-----","-----AGGGCGAAAAC-----","-----AGGCTCCAATG-----"],"tree":"((((hg19,rheMac2),mm9),(bosTau4,(canFam2,pteVam1))),(loxAfr3,dasNov2));"}}';
				console.log(">> Cannnot connect to database");
				console.log(">> loading dummy data");
				try {
					var j = eval("["+dummy+"]")[0].level;
				} catch(err) {
					if(DEBUG)
						console.log(err);
					return;
				}
				$.phylo.id = j.attributes.id;
				for(var i =0;i<j.sequence.length;i++) {
					j.sequence[i] = (j.sequence[i].replace(/-/g,"_")).toUpperCase();
				}	
				$.phylo.get = {};
				$.phylo.get.sequence = j.sequence;
				
				if(DEBUG) {
					j.sequence;
					j.tree;
				}
				$.phylo.get.treeString = j.tree;
				var tree = $.newick.parse(j.tree); 
				$.phylo.get.tree = tree;
				$.main.callBack();
			});
		}