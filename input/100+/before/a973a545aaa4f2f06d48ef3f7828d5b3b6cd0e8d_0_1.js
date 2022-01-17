function(line) {
      done();                                                                   
      var data = line.split('| ');                                              
      var tokens = data[0].split(/\s+/);                                        
      var ptrs = [];                                                            
      var wCnt = parseInt(tokens[3], 10);                                       
      var synonyms = [];                                                        

      for(var i = 0; i < wCnt; i++) {                                           
	synonyms.push(tokens[4 + i * 2]);                                       
      } 

      for(var i = 0; i < parseInt(tokens[6], 10); i++) {                        
	ptrs.push({
          pointerSymbol: tokens[7 + i * 4],
          synsetOffset: parseInt(tokens[8 + i * 4], 10),
          pos: tokens[9 + i * 4],
          sourceTarget: tokens[10 + i * 4]
	});                                                                     
      } 

      callback({
	synsetOffset: parseInt(tokens[0], 10),
	lexFilenum: parseInt(tokens[1], 10),
	pos: tokens[2],
	wCnt: wCnt,
	lemma: tokens[4],
	synonyms: synonyms,
	lexId: tokens[5],
	ptrs: ptrs,
	gloss: data[1]
      });                                                                       
    }