function(o,k){
                self.brickCount++;
                if(!o.path){
                    o.path = 'brix/gallery/'+o.name+'/';
                }
                S.use(o.path, function(S, TheBrick) {
                    var config = S.merge({
                        id: k,
                        el: '#' + k,
                        pagelet: self
                    }, o.config);
                    var myBrick = new TheBrick(config);
                    o.brick = myBrick;
                    self._addBehavior(o.bricks);
                    self.brickCount--;
                    if (self.brickCount === 0) {
                        self._fireReady();
                    }
                });
            }