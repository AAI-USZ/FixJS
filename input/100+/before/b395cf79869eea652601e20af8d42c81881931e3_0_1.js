function (data, brain) {



        this.width = data.width;

        this.height = data.height;



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

        this.brain||this.brain.knowSprite(this);



        this.magicAttack = null;



        this.born();



    }