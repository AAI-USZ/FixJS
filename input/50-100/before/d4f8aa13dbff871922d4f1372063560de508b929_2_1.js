function(other)
            {
                this.parent(other);

                if(this.level)
                    ig.game.displayCaption(this.level+" Hi-Score "+this.hiScore.toString().padString(6),.2);

            }