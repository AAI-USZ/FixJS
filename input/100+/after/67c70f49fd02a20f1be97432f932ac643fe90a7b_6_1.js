function()
            {
                this.drawModal();

                //TODO this should be moved into the utils
                var x = ig.system.width * .5;
                var y = ig.system.height * .5;
                this.menuFont.draw(this.title, x, y - 30, ig.Font.ALIGN.CENTER);

                // Show quit message
                //if(!ig.game.isGameOver)
                this.menuFont.draw("~ Press 'Q' To Quit At Any Time ~", x, y - 45, ig.Font.ALIGN.CENTER); //TODO need to have this support touch controls and customization


                //TODO calculate score
                var stats = ig.game.stats;
                if(stats)
                {
                    var i;
                    var total;

                    var displayStats = ["time","kills","doors","score"];
                    total = displayStats.length;


                    for (i = 0 ; i < total; i++)
                    {
                        var name =  displayStats[i];
                        //TODO need to come up with a better way to handle the score but this is a good hack for now
                        var points =  stats[displayStats[i]];//totalItems * this.collectionKeys[i].value * (i+1);
                        this.menuFont.draw(name.capitalize()+": "+ points, x, y+(10 * (i+1))+10, ig.Font.ALIGN.CENTER);
                    }

                    //this.menuFont.draw("Score : ", x, y+(10 * (i+2))+10, ig.Font.ALIGN.CENTER);
                }
            }