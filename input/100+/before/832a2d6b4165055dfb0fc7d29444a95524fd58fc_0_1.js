function (theGame) {
			
			$.extend($._wordSearch.gameState,$._wordGame.gameDescriptor);
			$(theGame).addClass('wordsearch');
			
			var instructionsText=
				"Find the listed words in the grid of letters below. Words may be vertical, horizontal or diagonal";
			
			$._wordGame.insertTitle("WordSearch",instructionsText)
			
			
			var words=$._wordGame.gameDescriptor.words;
			var table =$('<table id="wordsToFind">').appendTo(theGame);
			
			var row;
			for(i=0;i<words.length;i++){
				if(i%2==0)
					row=$('<tr>').appendTo(table);
				$('<td>',{"text" :words[i].toUpperCase()}).addClass(function(index) {
  					return "word-" + i;}).appendTo(row);
			}
			
			
					
			//populate the grid
			gridSize=$._wordSearch.gameState.gridSize=12;
			for(i=0;i<gridSize;i++){
				$._wordSearch.theGrid[i]=[];
				for(j=0;j<gridSize;j++){
					$._wordSearch.theGrid[i][j]=' ';
					
				}
			}
			
			var fitFuncs=[$._wordSearch.fitWordHoriz,$._wordSearch.fitWordVert,$._wordSearch.fitWordDiag]; // these are the3 directions for fitting words
			

			
			var numSqs=gridSize*gridSize;
			
			var numDirections=fitFuncs.length;
			var direction=Math.floor(Math.random()*numDirections); //pick one of horiz/vert,diag to start. Put it here so the each word is attempted to be placed in a different direction
			
			for(w in words){
				words[w]=words[w].toUpperCase();
				var word=words[w];
				if(word.length>gridSize){
					$.error( "word too long for grid:"+word);
					continue;
				}
				
				
				var wordPlaced=false;
				var sq=Math.floor(Math.random()*numSqs); //pick a random square to start trying to fit word
				

				var dirAttempts=0; //track how many different directions we've attempted
				do{
					
					var sqAttempts=0;
					do{ //try all available directions
						var pos=$._wordSearch.sqXY(sq,gridSize);
						wordPlaced=fitFuncs[direction](word,pos);
						sq++;  //try next square
						sq%=numSqs; //wrap around square zero
	
						
					}while(wordPlaced==false && (++sqAttempts)<numSqs); // try all squares
	
				direction++;
				direction%=numDirections;
				}while(wordPlaced==false && (++dirAttempts)<numDirections); // try all directions until word fits
				
				if(!wordPlaced){
					//$.error( "Unable to place word:"+word);
				}
				
				
				
			}
			
			$('<table>',{
				"id" : "grid"
			}).appendTo(theGame);
			
			
				
			for(i=0;i<gridSize;i++){
				var row=$('<tr>',{
				"class":"row"});
				
				var chars = "abcdefghijklmnopqrstuvwxyz";
	
				for(j=0;j<gridSize;j++){
					c=$._wordSearch.theGrid[i][j];
					if(c==' '){
						var rnum = Math.floor(Math.random() * chars.length);
						c=$._wordSearch.theGrid[i][j]=chars.substring(rnum,rnum+1);
					}
					
					var cell=$("<td>").appendTo(row);
					
					$("<div>",{ 
						"class":"square",
						"text" :c,
						"data": {x:j,y:i}}).appendTo(cell);
				}
				$('#grid').append(row);
			}
			
			theGame.append("<div id='currentWord'></div>");
			
			$._wordSearch.gameState.selectedWord='';
			
			$('.square').click(function(){;});
			
			$('.square').on("touchstart",function(event){
				event.preventDefault();
				event.stopPropagation();
				$._wordSearch.gameState.dragging=true;
				$._wordSearch.gameState.startSq=$(event.target).data();
				$._wordSearch.gameState.endSq=$._wordSearch.gameState.startSq;
				$._wordSearch.computeSelectedSquares();	
				$('#currentWord').html("ts:");			
				});
		
			$('.square').on("touchmove",function(event){
				event.preventDefault();
				event.stopPropagation();
				var evt=event.originalEvent;
				var elem = document.elementFromPoint(evt.pageX, evt.pageY);
				//$('#currentWord').html("te:"+evt.pageX+";"+evt.pageY+$(elem).html());	
				if($._wordSearch.gameState.dragging){
					$._wordSearch.gameState.endSq=$(elem).data();
					$._wordSearch.computeSelectedSquares();
					
				}
			});		
			
			$('.square').on("touchend",function(event){		
				event.preventDefault();
				event.stopPropagation();
				$._wordSearch.gameState.dragging=false;
				
				$._wordSearch.computeSelectedSquares();
				$._wordSearch.checkSelectedWord();
				$('.selectedSquare').removeClass('selectedSquare');
				$('#currentWord').html("mu:"+$._wordSearch.selectedWord);
				
			});	
				
				
			
			$('.square').mouseenter(function(){
				if($._wordSearch.gameState.dragging){
					$._wordSearch.gameState.endSq=$(this).data();
					$._wordSearch.computeSelectedSquares();
					
					}
				});
				
			
			
			$('.square').mousedown(function(){	
				$._wordSearch.gameState.dragging=true;
				$._wordSearch.gameState.startSq=$(this).data();
				$._wordSearch.gameState.endSq=$(this).data();
				$._wordSearch.computeSelectedSquares();
				});
			
	
			$('.square').mouseup(function(){
				$._wordSearch.gameState.dragging=false;
				
				$._wordSearch.gameState.endSq=$(this).data();
				$._wordSearch.computeSelectedSquares();
				$._wordSearch.checkSelectedWord();
				$('.selectedSquare').removeClass('selectedSquare');

				});		
				
			$('#grid').mouseleave(function(){
				$._wordSearch.gameState.dragging=false;
				$._wordSearch.computeSelectedSquares();
				$._wordSearch.checkSelectedWord();
				$('.selectedSquare').removeClass('selectedSquare');

				});		
			
			/*$('.wsSquare').on("touchend",function(event){
				event.preventDefault();
				event.stopPropagation();
				$._wordSearch.gameState.dragging=false;
				
				var evt=event.originalEvent;

				var elem = document.elementFromPoint(evt.changedTouches[0].pageX, evt.changedTouches[0].pageY);	
				
				var s=evt.pageX+';'+evt.pageY+';' +$(elem).html()+'|';
				for(i=0;i< event.originalEvent.changedTouches.length;i++){
					s+=String(event.originalEvent.changedTouches[i].pageX);
				}
				$('#currentWord').html(s);
				
			
				$._wordSearch.gameState.endSq=$(elem).data();
				$._wordSearch.computeSelectedSquares();
				$._wordSearch.checkSelectedWord();
				$('.wsSelectedSquare').removeClass('wsSelectedSquare');
				
				});
			*/	
			$('.wordsearch').disableSelection();
			
			
		}