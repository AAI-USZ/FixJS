function(data){
                var n =data.split("\n");
                var v = [];
                var f = [];
                for(var i = 0; i < n.length; i++){
                    var l = n[i].split(" ");
                    if(l[0] == "v"){
                        var t = new POS3D.Vector(l[1],l[2],l[3]);
                       
                        v.push(t);
                    }
                    if(l[0] == "f"){
         
                        f.push(new POS3D.Face([v[l[1]-1],v[l[2]-1],v[l[3]-1]],null));
                    }
                }
             
                model = new POS3D.Model(new POS3D.Vector(0,0,100),f);
         //       model.transform.rotateY(toRad(90));
                //   model.transform.rotateX(1.57);
                model.transform.translate(100, 100, 0);
                model.transform.scale(10,10, 0);     
                model.transform.rotateX(toRad(180));
                setTimeout(POS3D.Render.loop, (1/TICK) * 1000);
            }