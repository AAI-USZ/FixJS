function (L) {

    var Sprite = L.Class(function (data, brain) {



        this.width = data.width;

        this.height = data.height;

        this.hpBarH=15;



        Object.defineProperty(this,"left",{get:function(){

            return this.x - this.width/2;

        }})



        Object.defineProperty(this,"right",{get:function(){

            return this.x + this.width/2;

        }})



        Object.defineProperty(this,"top",{get:function(){

            return this.y - this.height/2;

        }})



        Object.defineProperty(this,"bottom",{get:function(){

            return this.y + this.height/2;

        }})



        var statesList = [

            woh.roleStates.stand, woh.roleStateClass.Stand,

            woh.roleStates.run, woh.roleStateClass.Run,

            woh.roleStates.attack, woh.roleStateClass.Attack,

            woh.roleStates.hurted, woh.roleStateClass.Hurted,

            woh.roleStates.magic, woh.roleStateClass.Magic,

            woh.roleStates.dead, woh.roleStateClass.Dead,

        ];

        this.fsm = new L.AppFSM(this, statesList);

        this.data = data;

        //L.extend(this, data);

        this.currentHP = data.health || 1000;

        this.maxHP = data.health || 1000;

        // 不用 Vector 操作，在大数据量操作的时候会快些

        this.x = 0; 

        this.y = 0;



        this.movement = new L.Vector2(0, 0);

        // 当前animation

        this.animations = {};

        this.curAnimation = null;

        

        // 是否可移动标志

        this.canMove = false;



        this.face = 'right';



        this.brain = brain||null;

        if(this.brain){this.brain.knowSprite(this)};



        this.magicAttack = null;



        this.born();



    }).methods({

        born: function () {

            this.getAnimations();

            this.initCheckArea();

            this.stand(); // 默认进入站立状态

        },

        //默认的checkarea为0

        initCheckArea: function () {

            var me = this;



            this.checkRect = new L.Sprite(woh.stage.$, function () {

                this.width = 0;

                this.height = 0;

                this.setPos = function (x, y) {

                    // 因为 sprite 默认是画在中心的，所以 也需要加上偏移量

                    this.x = x;

                    this.y = y;

                };

                this.setPos(me.x, me.y);

            });



            

        },

        getAnimations: function () {

            this.animations.stand = this.getAnimationGroup('stand')||null;

            this.animations.run = this.getAnimationGroup('run')||null;

            this.animations.hurted = this.getAnimationGroup('hurted')||null;

            var attack = this.getAnimationGroup('attack');

            Object.defineProperty(this.animations,"attack",{get:function(){

                if(this.magicAttack)

                    return this.animations[this.magicAttack];

                else return attack;

            }})



            this.animations.magic = this.getAnimationGroup('magic')||null;

            this.animations.dead = this.getAnimationGroup('dead')||null;

        },

        // 设置当前 animation 并自动播放

        setAndPlay: function (animation, loop, start, end) {

            if (loop === undefined) loop = true;

            if (start === undefined) start = 0;

            if (end === undefined) end = 1;

            

            animation = typeof animation == 'string' ? this.animations[animation] : animation;

            this.curAnimation = animation;

            

            animation.forEach(function (o) {

                o.setRange(start, end);

                o.rewind();

                o.play(loop);

            });

            

            animation[0].setCallback(L.curry(this.onAnimationEvent, this));

        },

        onAnimationEvent: function (evt, anim) {

            var me = this;

            

            switch (evt) {

                case "stopped" : this.fsm.message(woh.roleMessages.animStopped); break;

                case "standup": 

                    //with(this.getPos())

                         //this.stage.registerHurtableObject(me,me.data["areadata"]["standup"],{x:x-82,y:y-120});

                    break;

                case "standdown":

                    //with(this.getPos())

                         //this.stage.registerHurtableObject(me,me.data["areadata"]["standdown"],{x:x-82,y:y-120});

                    break;

                case "end_attack" : this.endAttack(); break;

            }



            this.fsm.message(evt, anim);

        },

        update: function (dt) {

            this.fsm.update(dt);

            this.curAnimation && this.curAnimation.forEach(function (o) { 

                o.update(dt) 

            });

            

        },

        draw: function (render) {

            var x = Math.floor(this.x), y = Math.floor(this.y),

                me = this;

            this.curAnimation && this.curAnimation.forEach(function (o) { 

                ((me.face == 'left' && !o.renderMirrored) || (me.face == 'right' && o.renderMirrored)) && o.mirror();

                o.draw(render, x, y, 0, 1, null); 

            });

            this.drawHPBar(render);

        },

        pressEnd: function () {

            this.canMove = false;

        },

        startAttack: function (type) {

        

        },

        endAttack: function () {

            //todo

            this.setInvulnerable(false);

        },

        // 可能某些时候人物是无敌的，比如处于攻击状态的时候 

        setInvulnerable: function (bool) {

            

        },

        getPos: function () {

            return {

                x: this.x,

                y: this.y

            }

        },

        setPos: function (x, y) {

            this.x = x;

            this.y = y;

            this.checkRect.setPos(x, y);



            if(this.brain){this.brain.knowPos(this,x,y)};

        },

        faceLeft: function () {

            this.face = 'left';

        },

        faceRight: function () {

            this.face = 'right';

        },

        

        stand: function () {

            this.toPos = null;

            this.fsm.setState(woh.roleStates.stand);

        },

        moveTo: function (x, y) {

            var me=this;

            x > this.x ? this.faceRight() : this.faceLeft();

            this.toPos = {x: x, y: y-me.data['height']/2};

            if(this.fsm.getCurrentState().stateId != woh.roleStates.run )

                this.fsm.setState(woh.roleStates.run);

        },

        normalAttack: function () {

            if(this.fsm.getCurrentState().stateId != woh.roleStates.attack &&

                this.fsm.getCurrentState().stateId != woh.roleStates.hurted &&

                this.fsm.getCurrentState().stateId != woh.roleStates.dead )

                this.fsm.setState(woh.roleStates.attack);

        },

        magic:function(data){

            

        },

        hurted: function (damage) {

            this.currentHP -= damage;

            if(this.currentHP<=0) {

                this.fsm.setState(woh.roleStates.dead);

                this.brain.knowDie(this);

            }

            else this.fsm.setState(woh.roleStates.hurted);

        },

        drawHPBar: function (render) {

            var me=this;

            var ctx = render.context;

            var x = this.x - me.data['width']/ 2 ;

            var y = this.y - me.data['height']/2-30;

            //console.log(this.hpBarW,this.checkRect.height);

            var border = 2;

            ctx.save();

            ctx.globalAlpha = 0.7;

            ctx.lineCap = "round";





            ctx.beginPath();

            ctx.lineWidth =this.hpBarH+border*2;

            ctx.strokeStyle = '#000';

            ctx.moveTo(this.left - border,this.top-30);

            ctx.lineTo(this.right+border,this.top-30);

            ctx.stroke();

            ctx.closePath();

            if(this.currentHP>0) {

                ctx.beginPath();

                ctx.lineWidth = this.hpBarH;

                ctx.strokeStyle = 'green';

                ctx.moveTo(this.left,this.top-30);

                ctx.lineTo(this.left+ this.width*this.currentHP/this.maxHP ,this.top-30);

                ctx.stroke();

                ctx.closePath();

            }



            ctx.restore();

        },

    });

    this.Sprite = Sprite;

}