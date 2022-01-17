function(opt){
            this._super(opt);
            
            this.moveSpeed   = new Vec2();
            this.moveDir     = new Vec2();
            this.aimdir       = new Vec2();
            this.realSpeed   = 0;
            this.maxSpeed    = 500;
            this.ultraSpeed   = 1000;
            this.ultraAccel   = 100;
            this.acceleration = 100000;
            this.color        = '#F00';
            this.radius       = 20;
            
            this.shipSprite   = shipSprite.clone();
            this.shipSpriteFiring = shipSpriteFiring.clone();
            this.drawable     = this.shipSprite;  
            
            
            this.lastFireTime = 0;
            this.fireInterval = 0.1;
            this.fireSequence = 0;
            this.clipSize     = 5;
            this.reloadTime   = 2;
            this.collisionBehaviour = 'emit';
            this.bound = new Rect(0,0,this.radius*2, this.radius*2,'centered');
            this.colVec = new Vec2();


        }