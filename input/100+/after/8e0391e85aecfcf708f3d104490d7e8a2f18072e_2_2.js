function(){
            var center = new Vec2( 
                    window.innerWidth/2,
                    window.innerHeight/2
            );
            var dpos = this.player.get('pos').sub(this.get('pos'));
            var odpos = dpos;
            
            dpos = dpos.scale( Math.max(1, dpos.len() /10) * this.main.deltaTime);

            this.increase('pos',dpos);

            var pos = this.get('pos');
            var bound = this.get('bound');
            if(bound.size().x <= grid.get('size').x){
                if(bound.minX() <= 0){
                    pos.x -= bound.minX();
                }else if(bound.maxX() > grid.get('size').x){
                    pos.x -= (bound.maxX() - grid.get('size').x)
                }
            }else{
                if(bound.maxX() < grid.get('size').x){
                    pos.x += (grid.get('size').x - bound.maxX());
                }else if( bound.minX() > 0){
                    pos.x -= bound.minX();
                }
            }

            if(bound.size().y <= grid.get('size').y){
                if(bound.minY() <= 0){
                    pos.y -= bound.minY();
                }else if(bound.maxY() > grid.get('size').y){
                    pos.y -= (bound.maxY() - grid.get('size').y)
                }
            }else{
                if(bound.maxY() < grid.get('size').y){
                    pos.y += (grid.get('size').y - bound.maxY());
                }else if( bound.minY() > 0){
                    pos.y -= bound.minY();
                }
            }

            this.set('pos',pos);
            return true;
        }