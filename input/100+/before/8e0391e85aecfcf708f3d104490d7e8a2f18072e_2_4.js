function(){
            var input = this.main.input;
            this.aimdir = main.scene.camera.getMouseWorldPos().sub(this.transform.pos).normalize();
            
            //console.log('moveSpeed:', this.moveSpeed, this.get('moveSpeed') );
            
            if(input.isKeyDown('a')){
                //console.log('A : left');
                this.moveDir.x = -1;
            }else if(input.isKeyDown('d')){
                //console.log('D : right');
                this.moveDir.x = 1;
            }else{
                this.moveDir.x = 0;
            }
            if(input.isKeyDown('w')){
            
                //console.log('W : up');
                this.moveDir.y = -1;
            }else if(input.isKeyDown('s')){
                
                //console.log('S : down');
                this.moveDir.y = 1;
            }else{
                this.moveDir.y = 0;
            }
            if(this.moveDir.x === 0){
                this.moveSpeed.x = 0;
            }else{
                if(this.moveDir.x * this.moveSpeed.x < 0){
                    this.moveSpeed.x = 0;
                }
                this.moveSpeed.x += (this.moveDir.x * this.acceleration) * this.main.deltaTime;
                
                if(Math.abs( this.moveSpeed.x ) > this.maxSpeed){
                    this.moveSpeed.x = this.moveDir.x * this.maxSpeed;
                }
            }
            if(this.moveDir.y === 0){
                this.moveSpeed.y = 0;
            }else{
                if(this.moveDir.y * this.moveSpeed.y < 0){
                    this.moveSpeed.y = 0;
                }
                this.moveSpeed.y += (this.moveDir.y * this.acceleration) * this.main.deltaTime;
                
                if(Math.abs( this.moveSpeed.y ) > this.maxSpeed){
                    this.moveSpeed.y = this.moveDir.y * this.maxSpeed;
                }
                    
            }
            
            if(input.isKeyDown('mouse0') && this.main.time > this.lastFireTime + this.fireInterval){
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
            
            this.increase('pos',this.moveSpeed.scale(this.main.deltaTime));
            var prevRotation = this.get('rotation'); 
            this.set('rotationDeg',(this.aimdir.angleDeg() + 90));
            var deltaRot = Math.abs(prevRotation - this.get('rotation'));
            
            if(this.moveSpeed.len() >= 1 || deltaRot > 0.001){
                return true;
            }
        }