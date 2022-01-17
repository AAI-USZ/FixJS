function() {

			var initvo = {	
					skin:buttonColors,
					visualState:"stateDefault",
					symbol:paszczak1 };

			grid = new RFGrid();
            grid.init(S.G_WIDTH,S.G_HEIGHT,S.C_WIDTH,S.C_HEIGHT,Cell,initvo);

            gridAbstract = new RFabstractGrid();
            gridAbstract.init(S.G_WIDTH,S.G_HEIGHT,S.C_WIDTH,S.C_HEIGHT);

            mainContainer.addChild(grid);

			for ( var i = 0; i < grid.items.length; i++) {
				grid.items[i].setEngine(engine);
			}

			cursorCell = new CursorCell();
			mainContainer.addChild(cursorCell);

            enemy = new Enemy();
            enemy.gridRef=grid;

            mainContainer.addChild(enemy);
            
            // tests:
            enemy.placeHere(5,4);

            for ( var i = 5; i < 10; i++) {
                this.infectCell(i,5);
            };

            //frames
            for ( var i = 0; i < S.G_WIDTH; i++) {
                this.infectCell(i,0);
                this.infectCell(i, S.G_HEIGHT-1 );
            };

            for ( var i = 0; i < S.G_HEIGHT; i++) {
                this.infectCell(0,i);
                this.infectCell(S.G_WIDTH-1,i );
            };


            this.infectCell(8,4);
            this.infectCell(8,3);
          //  this.infectCell(7,2);
            enemy.go("RIGHT");



        }