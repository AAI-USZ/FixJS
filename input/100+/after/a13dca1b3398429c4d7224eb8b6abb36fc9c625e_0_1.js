function MyMachine(game,event,param){



	//param:{user:Game.User}

	var user=param.user;

	

	//初期状態

	/*param{

		x:x, y:y, speed:speed

	}*/

	this.x=param.x, this.y=param.y, this.speed=param.speed;

	

	this.hp=this.maxhp;

	

	var t=this;



	//入力状態z

	var key={37:false,38:false,39:false,40:false,90:false};

	

	var shot_count=0, shot_wait=5;



	var ke=user.event;

	user.keyWait([37,38,39,40,90/*Z*/]);



	ke.on("keydown",function(e){

		var c=e.keyCode;

		key[c]=true;

		

	});

	ke.on("keyup",function(e){

		key[e.keyCode]=false;

	});

	

	//切断時

	ke.on("disconnect",function(){

		//自殺

		event.emit("die");

	});

	event.on("internal",function(){

		if(key[90]){

			//Shot

			if(shot_count==0){

				game.add(MyShot,{

					x:t.x+t.width,

					y:t.y+t.height/2,

					speedx:10,

					speedy:0,

				});

				shot_count=shot_wait;

			}else{

				shot_count--;

			}

		}else{

			shot_count=0;

		}

	});



	event.on("loop",function(){

		//毎フレームの動作

		if(key[37]){

			t.x-=t.speed;

		}

		if(key[38]){

			t.y-=t.speed;

		}

		if(key[39]){

			t.x+=t.speed;

		}

		if(key[40]){

			t.y+=t.speed;

		}

		if(t.x<0)t.x=0;

		if(t.y<0)t.y=0;

		if(t.x>=game.width-t.width)t.x=game.width-t.width;

		if(t.y>=game.height-t.height)t.y=game.height-t.height;

	});

	event.on("render",function(canvas,ctx){

		//描画

		ctx.fillStyle="#000000";

		ctx.font=t.height+"px sans-serif";

		ctx.fillText("自分",t.x,t.y+t.height);

		

		//HPバー

		ctx.fillStyle="#dddddd";

		ctx.fillRect(t.x+2,t.y-2,t.width,4);

		ctx.fillStyle="#ee4444";

		ctx.fillRect(t.x+2,t.y-2,t.width*(t.hp/t.maxhp),4);

	});

	

	//外部干渉

	event.on("damage",function(power){

		t.hp-=power;

		if(t.hp<=0){

			t.hp=0;

			//爆発を起こす

			game.event.emit("effect","explode",t.center());

			//死ぬ

			event.emit("die");

		}

	});

	event.on("die",function(){

		game.event.emit("over",t,user);

	});

	event.on("recover",function(power){

		t.hp+=power;

		if(t.hp>t.maxhp)t.hp=t.maxhp;

	});

}