function Doll (physicsEngine, id){
        this.id = id;
        this.physicsEngine = physicsEngine;
        this.body;
        this.legs;
        this.contactPoint;
        
        this.init(this.physicsEngine.getWorld());
    }