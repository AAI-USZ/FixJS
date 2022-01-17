function(img) {
                b.__modify(Element.SYS_MOD, function(t) {
                    this.rx = Math.floor(img.width/2);
                    this.ry = Math.floor(img.height/2);
                });
           }