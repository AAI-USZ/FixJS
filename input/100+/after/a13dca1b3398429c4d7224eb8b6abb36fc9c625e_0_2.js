function Boss1(game,event,param){

	Boss.apply(this,arguments);

	

	var t=this;

	t.mode=0;

	

	var children=[];

	

	t.movup=true;	//上へ

	

	var atkwait=14, count=atkwait;

	

	event.on("internal",function(){

		//進行判定

		switch(t.mode){

		case 1:

			//敵出現

			children.length=0;

			for(var i=0,l=3;i<l;i++){

				//護衛の敵

				children.push(game.add(EnemyAttendantRound1,{

					angle:Math.PI*2*i/l,

					parent:t,

					radius:80,

				}));

			}

			event.emit("modechange",2);

			break;

		case 2:

			//攻撃

			if(--count <=0){

				//発射

				var me=game.random(MyMachine);

				if(me){

					var c1=t.center(), c2=me.center();

					var k=Math.atan2(c2.y-c1.y, c2.x-c1.x);

					

					game.add(EnemyShot,{

						x:c1.x, y:c1.y,

						speedx:Math.cos(k)*12,

						speedy:Math.sin(k)*12,

					});

				}

				count=atkwait;

			}

		}

	});

	

	event.on("loop",function(){

		switch(t.mode){

		case 0:

			//登場

			t.x -= 5;

			if(t.x <= game.width-t.width*2){

				//t.mode=1;

				event.emit("modechange",1);

			}

			break;

		case 2:

			//上下移動

			if(t.movup){

				t.y-=4;

				if(t.y<30){

					t.movup=false;

				}

			}else{

				t.y+=4;

				if(t.y>game.height-40){

					t.movup=true;

				}

			}

			break;

		}

	});

	

	//もーどちぇんじ

	event.on("modechange",function(m){

		t.mode=m;

	});

}