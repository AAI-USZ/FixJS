function show(ctx, ret){
			var pos = ret.pos; // xyza color name affine
			var data = ret.data;
			var af = ret.pos[5];
			var a,b;
			a = 0; // X ?
			b = 1; // Y ?
				
			ctx.fillRect(pos[a], -pos[b], 5, 5);
			if(ret.name == undefined){
			    // 端っこの点は大きめに
				    
			    ctx.fillRect(pos[a]-5, -pos[b]-5, 10, 10);
			    //ctx.beginPath();
			    //ctx.arc(pos[a], -pos[b], 7, 0, Math.PI*2, false)
			    //ctx.fill();
			}
				
				
			// boneの名前を描画
			ctx.fillText(ret.name,pos[a]+100,-pos[b]+10);
				
			for(var i = 0; i < ret.data.length; i++){
			    ctx.beginPath();
			    ctx.moveTo(pos[a],-pos[b]);
			    ctx.lineTo(ret.data[i].pos[a], -ret.data[i].pos[b]);
			    ctx.stroke();
			    show(ctx, ret.data[i]);
			}
			var afa,afb,afc;
			var afz,afy;
			var tmpa,tmpb,tmpc;
			if(ret.name == "Head"){
			    // Twitterの顔をつける
			    afa = new Affine();
			    afb = new Affine();
			    afc = new Affine();

			    //ctx.fillRect(pos[a]-10, -pos[b]-10, 20, 20);
			    ctx.fillStyle="red";				    
				    
				    
			    var scale = 10;
			    afz = new Affine33(
					       -1/2,1/2,0,
					       1/2,0,1/2,
					       0,-1/2,1/2
					       ); // 逆行列

			    afa.data = af.clone();
			    afa.shift(-scale,scale,0);
			    tmpa = afa.calc();

			    afb.data = af.clone();
			    afb.shift(scale,scale,0);
			    tmpb = afb.calc();

			    afc.data = af.clone();
			    afc.shift(-scale,-scale,0);
			    tmpc = afc.calc();

			    afy = new Affine33( // 中間構造
					       tmpa[a],tmpb[a],tmpc[a],
					       -tmpa[b],-tmpb[b],-tmpc[b],
					       1,1,1
						);	   
			    afy.mul(afz);
			    ctx.save();
				    
			    ctx.strokeStyle = "red";
			    //console.log(afy.data[0],afy.data[1],afy.data[2]);
			    ctx.transform(afy.data[0][0],afy.data[1][0],afy.data[0][1],afy.data[1][1],afy.data[0][2],afy.data[1][2]);
			    ctx.lineWidth = "0.1";
			    ctx.beginPath();
			    ctx.moveTo(-1,1);
			    ctx.lineTo(1,1);
			    ctx.lineTo(1,-1);
			    ctx.lineTo(-1,-1);
			    ctx.lineTo(-1,1);
			    ctx.stroke();
			    ctx.rotate(Math.PI);
			    try{
				ctx.drawImage(img,-1,-1,2,2);
			    }catch(e){}
			    ctx.strokeStyle = "black";
				    
			    ctx.restore();
				    
			    ctx.fillStyle="black";
			}

				
		    }