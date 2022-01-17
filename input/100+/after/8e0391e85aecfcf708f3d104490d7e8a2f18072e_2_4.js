function(){
            var input = this.main.input;
            this.aimdir = main.scene.camera.getMouseWorldPos().sub(this.transform.pos).normalize();
            

            if(input.isKeyDown(' ')){
                this.boosting = true;
            }else{
                this.boosting = false;
            }
            
            if(input.isKeyDown('a')){
                this.moveDir.x = -1;
            }else if(input.isKeyDown('d')){
                this.moveDir.x = 1;
            }else{
                this.moveDir.x = 0;
            }
            if(input.isKeyDown('w')){
            
                this.moveDir.y = -1;
            }else if(input.isKeyDown('s')){
                
                this.moveDir.y = 1;
            }else{
                this.moveDir.y = 0;
            }

            if(this.moveDir.len() === 0){
                this.moveSpeed.x = 0;
                this.moveSpeed.y = 0;
                this.prevDir = this.moveDir.clone();
            }else{
                var factor  = 1;
                this.moveDir = this.moveDir.normalize();
                var dot = this.moveDir.dot(this.prevDir || this.moveDir);
                if(dot < 0){
                    factor = 0;
                }else if(dot < 0.1){
                    factor = 0.81;
                }else if(dot < 0.9){
                    factor = 0.9;
                }
                if(factor < 1){
                    this.moveSpeed = this.moveSpeed.scale(factor);
                }


                if(this.moveSpeed.len() < this.startSpeed){
                    this.moveSpeed = this.moveDir.scale(this.startSpeed*1.01);
                }else{
                    var cspeed = this.moveSpeed.len();
                    this.moveSpeed = this.moveDir.scale(this.incSpeed(cspeed,this.main.deltaTime));
                }
                this.prevDir = this.moveDir.clone();
            }
            
            if(!this.boosting && input.isKeyDown('mouse0') && this.main.time > this.lastFireTime + this.fireInterval){
                if(this.main.time > this.lastFireTime + this.fireInterval*1.5){
                    this.fireSequence = 0;
                }
                this.lastFireTime = this.main.time;
                if(this.fireSequence < this.clipSize){
                    this.main.scene.add(new Missile({ 
                        pos: this.get('pos').add(this.aimdir.scale(40)), 
                        dir: this.aimdir,
                        heritSpeed: this.moveSpeed.scale(0.5),
                    }));
                }
                if(this.fireSequence >= this.clipSize + this.reloadTime){
                    this.fireSequence = 0;
                }else{
                    this.fireSequence++;
                }
            }
            if( this.main.time - this.lastFireTime < 0.05 ){
                this.drawable = this.shipSpriteFiring;
            }else{
                this.drawable = this.shipSprite;
            }
            
            if(this.moveSpeed.len() > this.maxSpeed){
                this.moveSpeed = this.moveSpeed.setLen(this.maxSpeed);
            }
            if(this.boosting){
                this.increase('pos',this.moveSpeed.scale(this.boost * this.main.deltaTime));
            }else{
                this.increase('pos',this.moveSpeed.scale(this.main.deltaTime));
            }
            
            var prevRotation = this.get('rotation'); 
            this.set('rotationDeg',(this.aimdir.angleDeg() + 90));
            var deltaRot = Math.abs(prevRotation - this.get('rotation'));
            
            if(this.moveSpeed.len() >= 1 || deltaRot > 0.001){
                return true;
            }
        }