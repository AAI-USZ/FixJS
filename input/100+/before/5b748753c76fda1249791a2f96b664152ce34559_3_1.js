function(){
    var p = [
        {position: new THREE.Vector3(15,15,15), barneshut: {}},
        {position: new THREE.Vector3(12, 8, 8), barneshut: {}, getMass:function(){return 4;}},
        {position: new THREE.Vector3( 8,12, 8), barneshut: {}, getMass:function(){return 4;}},
        {position: new THREE.Vector3(12,12, 8), barneshut: {}},
        {position: new THREE.Vector3( 8, 8,12), barneshut: {}},
        {position: new THREE.Vector3(12, 8,12), barneshut: {}},
        {position: new THREE.Vector3( 8,12,12), barneshut: {}},
        {position: new THREE.Vector3(12,12,12), barneshut: {}}
    ];
    
    describe('Testing constutor', function(){
        var r = new Region(9,4,4);
        it('Control number of childs', function(){
            expect(r.childs.length).toBe(0);
        });
       
    });
    
    describe('insert() Test', function(){
        var r1 = new Region(20,20,20);
        r1.insert(p[0],40);
        it('Control number of childs', function(){
           expect(r1.childs.length).toBe(1);
        });
    });
    
    describe("createSubRegion() Testing",function(){
        var r = new Region(20,20,20);
        r.range = 20;
        
        it("Control sub region correct centre values ", function(){
            var regionI = 0;
            // set child to exchange
            r.childs[regionI] = p[1];
            // call subRegion
            r.createSubRegion(regionI,p[0]);
            // control result
            var result = r.childs[regionI].centre;
            expect(result.subSelf({x:10,y:10,z:10}).lengthSq()).toBe(0);
        });
        
    });
    
    describe("contains() Testing", function(){
       var r = new Region(20,20,20), result;
       r.range = 20;
       
       it("Control if (-1,-1,-1) is not in the region", function(){
          result = r.contains({position: new THREE.Vector3(-1,-1,-1)}); 
          expect(result).toBe(false);
       });

       it("Control if (41,41,41) is not in the region", function(){
          result = r.contains({position: new THREE.Vector3(41,41,41)}); 
          expect(result).toBe(false);
       });

       it("Control if (39,39,1) is in the region", function(){
          result = r.contains({position: new THREE.Vector3(39,39,1)}); 
          expect(result).toBe(true);
       });
    });
       
}