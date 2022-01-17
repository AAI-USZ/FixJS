function(){
            if(this.canvas == null){
                var c,t = Crafty.diamondIso,w =  t._map.width * (t._tile.width/2) +   t._map.height * (t._tile.width/2),
                h= t._map.width * (t._tile.height/2) +   t._map.height * (t._tile.height/2)
                c = document.createElement("canvas");
                c.width = w;
                c.height = h;
                //just for debug
                   c.style.position = 'absolute';
                    c.style.left = "0px";
                    c.style.top = -h+"px";
                     Crafty.stage.elem.appendChild(c);
                this.canvas = c;
            } 
        }