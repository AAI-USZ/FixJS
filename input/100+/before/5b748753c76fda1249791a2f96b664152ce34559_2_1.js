function(){
		
        afterEach(function(){
            
        });
        
        beforeEach(function() {

        });
        
        describe("insert() test", function(){
            var b = new BarnesHut();
            it("Control if exclude elements without position atribute", function(){
               expect(b.insert({prova: "element"})).toBe(false);
            });
            
            it("Control if adding attribute correctly", function(){
               var p = {
                   position: new THREE.Vector3(0,0,0)
               };
               b.insert(p); 
               expect(p.barneshut).not.toBe(undefined);
               expect(p.getMass()).toBe(1);
            });
            
            it("Control positive result of call to method",function(){
               var p = {
                   position: new THREE.Vector3(1,1,0)
               };
               expect(b.insert(p)).toBe(true);
                
            });
        });
        
        describe("remove() test", function(){
           var b = new BarnesHut();
           var p = {position: new THREE.Vector3(0,0,0)},
               q = {position: new THREE.Vector3(10,0,0)};
           b.insert(p);b.insert(q);
           
           it("Control positive result of call to method",function(){
               expect(b.remove(p)).toBe(true);
           });
          
        });
        
        /**
         * Control the star distribution 
         */
        describe('Star distribution', function() {
            
            var nodeNumbers = 0, graph,commDistance;
            
            // TODO initialize graph
            // graph = new Graph();
            
            // TODO add Nodes
            
            // TODO get commDistance
            
            it('Control the distances beetween all nodes',function(){
//                for(var i =1; i++; i < nodeNumbers-1){
//                    var distance = graph.distance(0,i);
//                    expect(distance).toBe(commDistance);
//                }
            });
            
            it('Control the angle beetween all nodes',function(){
                
            });
        
        });
        
        describe('Bipolar distribution',function(){
            
        });
        
}