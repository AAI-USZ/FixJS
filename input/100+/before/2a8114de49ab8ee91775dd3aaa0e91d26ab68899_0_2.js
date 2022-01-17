function(){
      var allPieces = ['o','t','i','z','s','l','j'];
      var piece = {};

      allPieces.shuffle();
      var select = allPieces[0][0];

      piece = tetris.pieces[select]();
      piece.name = select;
      piece.color = tetris.randomColor();	
      return piece;
   }