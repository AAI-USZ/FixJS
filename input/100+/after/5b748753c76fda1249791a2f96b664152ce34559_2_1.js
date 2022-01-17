function(){
           var b = new BarnesHut();
           var p = {position: new THREE.Vector3(0,0,0)},
               q = {position: new THREE.Vector3(10,0,0)},
               t = {position: new THREE.Vector3(10,1,0)};
           b.insert(p);b.insert(q);
           
           it("Control acceleration between two point", function(){
               var a = b.getForceFor(p);
               expect(a.length()<0.1).toBe(true);
           });
           
        }