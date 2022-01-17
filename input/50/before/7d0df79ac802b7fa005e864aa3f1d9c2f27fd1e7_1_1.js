function Doll (physicsEngine, id){
        this.id = id;
        this._physicsEngine = physicsEngine;
        this._body;
        this._legs;
        this._contactPoint;
        
        this.init(this._physicsEngine.getWorld());
    }