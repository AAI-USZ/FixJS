function() {
			//	var dummy = '{"level":{"attributes":{"id":"3071"},"sequence":["-----GAGGATCCAGC-----","-----GAGGCTCAAGC-----","TTTTGAAAACTAGATA-----","-----GGAGTCTAAAA-----","-----AGGCGCTAAAAACAAA","------GGAACTCCAA-----","-----AGGGCGAAAAC-----","-----AGGCTCCAATG-----"],"tree":"((((hg19,rheMac2),mm9),(bosTau4,(canFam2,pteVam1))),(loxAfr3,dasNov2));"}}';
				var dummy = '{"level":{"attributes":{"id":"1926"},"sequence":["---agagtgactcccag----","----gagagatatagag----","---GGGTGAAGGGGTGG----","-TCGAGATTCCCCCGAAGACA","---agagtgacccccag----"],"tree":"((((hg19,rheMac2),mm9),canFam2),loxAfr3);"}} ';
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
			}