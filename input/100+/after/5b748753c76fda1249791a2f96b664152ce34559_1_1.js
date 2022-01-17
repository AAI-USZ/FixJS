function(){
        var mass=0,
            p = new THREE.Vector3(0,0,0);
        for(var i in this.childs){
            var ch = this.childs[i];
            if(ch instanceof Region)
                ch.computeCenterOfMass();                    
            var m = ch.getMass();
            mass += m;
            p.addSelf(ch.position
                .clone().multiplyScalar(m));
        }        
        // distinguere il centro della regione dal centro di massa??
        this.position = p.multiplyScalar(1.0 / mass);
        this.mass = mass;
    }