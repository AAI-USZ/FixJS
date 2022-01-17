function() {

    window.canvas = document.getElementById('test_canvas_1');
    window.context = canvas.getContext('2d');
    
    modula.use();   

    var shipSprite = new RendererCanvas2d.DrawableSprite({
        src:'img/ship_yellow.png',
        centered:true,
    });

    var shipSpriteFiring = new RendererCanvas2d.DrawableSprite({
        src:'img/ship_yellow_firing.png',
        centered:true,
    });
    
    var missileSprite = new RendererCanvas2d.DrawableSprite({
        src:'img/projectile.png',
        globalCompositeOperation: 'lighter',
        pos: new Vec2(0,20),
        centered:true,
    });
    
    var explosionSprite = new RendererCanvas2d.DrawableSprite({
        src:'img/explosion128blue.png',
        globalCompositeOperation: 'lighter',
        centered:true,
    });
    
    var blockSprite = new RendererCanvas2d.DrawableSprite({
        src:'img/block.png',
        pos:new Vec2(-12,-12),
    });

    var blockSpriteYellow = new RendererCanvas2d.DrawableSprite({
        src:'img/blockyellow.png',
        pos:new Vec2(-12,-12),
    });

    var grid = new Grid({
        cellX: 18,
        cellY: 18,
        cellSize: 103,
        cells: [ 
            2,0,1,0,1,0,1,0,2,2,0,1,0,1,0,1,0,2,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,1,1,0,1,1,0,0,0,0,1,1,0,1,1,0,2,
            0,0,1,2,0,2,1,0,0,0,0,2,1,0,2,1,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
            0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,2,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            2,0,1,0,1,0,1,0,0,2,0,0,1,2,1,2,1,2,
            2,0,1,0,1,0,1,0,0,2,0,0,2,1,0,1,0,2,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,1,1,0,1,1,0,0,0,0,1,1,0,1,1,0,2,
            0,0,1,2,0,2,1,0,0,0,0,2,1,0,2,1,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
            0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,2,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            2,0,1,0,1,0,1,0,2,2,0,1,1,2,1,2,1,2,
        ],
    });

    var drawgrid = new DrawableGrid({
        grid: grid,
        drawables:{
            1: blockSprite,
            2: blockSpriteYellow,
        },
    });

    var GridEnt = Ent.extend({
        name: 'TheGrid',
        drawable: drawgrid,
        grid: grid,
        bound: new Rect(0,0,grid.get('size').x, grid.get('size').y),
        collisionBehaviour: 'receive',
    });

    var gridEnt = new GridEnt();

    var GridCollider = Ent.extend({
        onCollisionEmit: function(ent){
            if(ent instanceof GridEnt){
                var cells = ent.grid.getColldingCells(this.bound.cloneAt(this.get('pos')));
                for(var i = 0, len = cells.length; i < len; i++){
                    this.onGridCollision(cells[i]);
                }
            }
        },
        gridCollision: function(){
            var grid  = gridEnt.grid;
            var centercell  = grid.getCellAtPixel(this.get('pos'));
            var bound = this.get('bound').cloneAt(this.get('pos'));
            var cells = [[],[],[]];
            if(!centercell){
                return {outside:true};
            }
            for(var x = -1; x <=1; x++){
                for(var y = -1; y <= 1; y++){
                    var px = centercell.x + x;
                    var py = centercell.y + y;
                    var c  = grid.get('cell',[px,py]);
                    var b =  grid.get('bound',[px,py]);
                    cells[x+1][y+1] = {
                        x:px,
                        y:py,
                        out: px < 0 || px >= grid.get('cellX') || py < 0 || py >= grid.get('cellY'),
                        cell:c,
                        bound:b,
                        solid: !!c,
                        collides: bound.collides(b),
                        cvec:bound.collisionVector(b),
                        caxis:bound.collisionAxis(b),
                    };
                }
            }
            return {
                outside:false,
                cells: cells,
            };
        },


            
        onGridCollision: function(cell){
            console.log("GridCollide:",cell);
        },
    });
    
    var MissileExplosion = Ent.extend({
        name: 'missileExplosion',
        init: function(opt){
            this._super(opt);
            this.drawable = explosionSprite.clone();
            this.set('rotation', Math.random() * 6.28);
        },
        onInstanciation:function(){
            this.destroy(0.4);
        },
        onUpdate: function(){
            this.drawable.alpha = Math.max(0,1-(5*(this.main.time - this.startTime)));
            this.transform.scaleFac(1.05);
            return true;
        },
    });
    
    
    var Missile = GridCollider.extend({
        name: 'missile',
        init: function(opt){
            this._super(opt);
            this.dir = opt.dir || new Vec2(1,0);
            this.heritSpeed = opt.heritSpeed || new Vec2(); 
            this.speed = opt.speed || 1000;
            this.speedVec = this.dir.scale(this.speed).add(this.heritSpeed);
            this.drawable = opt.drawable || missileSprite;
            this.transform.setRotationDeg( this.speedVec.angleDeg() + 90);
            this.radius = opt.radius || 5;
            this.collisionBehaviour = 'emit';
            this.bound = new Rect(0,0,this.radius*2,this.radius*2,'centered');
        },
        onInstanciation:function(){
            this.destroy(0.7);
        },
        onUpdate: function(){
            this.increase('pos',this.speedVec.scale(this.main.deltaTime));
            this.set('scaleFac',Math.max(0.3, Math.min(0.7, 20*(this.main.time - this.startTime) )));
            return true;
        },
        onDestruction: function(){
            this.main.scene.add(new MissileExplosion({pos:this.transform.pos}) );
        },
        onGridCollision: function(cell){
            if(cell.cell){
                this.destroy();
            }
        },
    });
    
    var Block = Ent.extend({
        name: 'block',
        init: function(opt){
            this._super(opt);
            this.drawable = opt.sprite || Math.random() < 0.5 ? blockSprite : blockSpriteYellow;
            this.width = 110;
            this.collisionBehaviour = 'receive';
            this.bound = new Rect(0,0,this.width,this.width,'centered');
        },
    });

    var PlayerCamera = Camera.extend({
        name: 'playerCamera',
        init: function(player){
            this.player = player;
            this.set('pos',player.get('pos'));
        },
        onUpdate: function(){
            var center = new Vec2( 
                    window.innerWidth/2,
                    window.innerHeight/2
            );
            var dpos = this.player.get('pos').sub(this.get('pos'));
            var odpos = dpos;
            
            dpos = dpos.scale( Math.max(1, dpos.len() /10) * this.main.deltaTime);

            this.increase('pos',dpos);

            var pos = this.get('pos');
            var bound = this.get('bound');
            if(bound.size().x <= grid.get('size').x){
                if(bound.minX() <= 0){
                    pos.x -= bound.minX();
                }else if(bound.maxX() > grid.get('size').x){
                    pos.x -= (bound.maxX() - grid.get('size').x)
                }
            }else{
                if(bound.maxX() < grid.get('size').x){
                    pos.x += (grid.get('size').x - bound.maxX());
                }else if( bound.minX() > 0){
                    pos.x -= bound.minX();
                }
            }

            if(bound.size().y <= grid.get('size').y){
                if(bound.minY() <= 0){
                    pos.y -= bound.minY();
                }else if(bound.maxY() > grid.get('size').y){
                    pos.y -= (bound.maxY() - grid.get('size').y)
                }
            }else{
                if(bound.maxY() < grid.get('size').y){
                    pos.y += (grid.get('size').y - bound.maxY());
                }else if( bound.minY() > 0){
                    pos.y -= bound.minY();
                }
            }

            this.set('pos',pos);
            return true;
        },
    });
    
    
    var PlayerShip = GridCollider.extend({
        name: 'player',
        init: function(opt){
            this._super(opt);
            
            this.moveSpeed   = new Vec2();
            this.moveDir     = new Vec2();
            this.aimdir       = new Vec2();
            this.realSpeed   = 0;
            this.maxSpeed    = 350;
            this.ultraSpeed   = 1000;
            this.ultraAccel   = 100;
            this.acceleration = 100000;
            this.color        = '#F00';
            this.radius       = 20;

            this.startSpeed   = 160;
            this.accel        = 4;
            this.turnDrag     = 1;

            this.boost        = 1.5;

            this.incSpeed = function(cspeed,dt){
                var t = Math.log(1 - cspeed/this.maxSpeed)/-this.accel;
                return this.maxSpeed * ( 1 - Math.exp(-this.accel*(t+dt)));
            }
            
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


        },
        onInstanciation: function(){
            this.main.scene.camera = new PlayerCamera(this);
        },
    
        onUpdate: function(){
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
        },
        onGridCollision: function(cell){
            var bound = cell.bound;
            if(cell.cell){
                this.colVec = this.collisionAxis(bound);
                this.increase('pos',this.colVec);
                if(this.colVec.x){
                    this.moveSpeed.x = 0;
                }else{
                    this.moveSpeed.y = 0;
                }
                if(this.colVec.len() > 1){
                    return true;
                }
            }
        },
                
    });
    
    var ShivrzScene = Scene.extend({
        onSceneStart: function(){
            this.lastTime = -1;
            this.add(new PlayerShip({
                pos: new Vec2(
                    window.innerWidth/2,
                    window.innerHeight/2
                ),
            }));
            this.add(gridEnt);
        },
        onFrameEnd: function(){
        },
    });

    window.main   = new Main({
        input: new Input('body'),
        scene: new ShivrzScene({
            renderer: new RendererCanvas2d({
                canvas:window.canvas,
                getSize: function(){
                    return new Vec2(window.innerWidth,window.innerHeight);
                },
                background: '#333',
                alwaysRedraw: false,
            }),
        }),
    });

    window.main.set('fps',60);
    window.main.run();
}