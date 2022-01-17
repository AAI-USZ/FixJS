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

      var ptrOffset = (wCnt - 1) * 2 + 6;
      for(var i = 0; i < parseInt(tokens[ptrOffset], 10); i++) {                        
	ptrs.push({
          pointerSymbol: tokens[ptrOffset + 1 + i * 4],
          synsetOffset: parseInt(tokens[ptrOffset + 2 + i * 4], 10),
          pos: tokens[ptrOffset + 3 + i * 4],
          sourceTarget: tokens[ptrOffset + 4 + i * 4]
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