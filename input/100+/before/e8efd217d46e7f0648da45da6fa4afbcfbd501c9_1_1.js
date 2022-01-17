function drawUI(ctx){
	if(dialogdirectionY === 'up'){
		if(dialogY < 240){
			dialogY += 5;
		}
	}else if(dialogdirectionY === 'down'){
		if(dialogY > -240){
			dialogY -= 5;
		}
	}
	if(dialogtext.length != futuredialogtext.length){
		var t = futuredialogtext.split('');
		dialogtext += t[(dialogtext.length)];
	}
	
	var ui = [
		UIBox(dialogtext, 5, HEIGHT - dialogY, WIDTH-10, 240),
		UIButton('next', WIDTH-300, HEIGHT - dialogY + 180, 180, 50, function(){dialogtext = '';}),
		UIBox('     ' + character.name, 200, 40, 300, 120)
	];
	for(var i = 0; i < ui.length; i++){
		ui[i].draw(ctx);
		if(ui[i].containsPoint(mouseX, mouseY) && click){
			ui[i].trigger();
		};
	};
	ctx.beginPath();
	ctx.arc(140, 140, 125, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
	ctx.fill();
	if(frame%60 === 0){
		if(character.hp[0] < character.hp[1]){
			character.hp[0] += 1;
		}
		if(character.mp[0] < character.mp[1]){
			character.mp[0] += 1;
		}
	}
	ctx.drawImage(UI.bar_hp_mp, 0, 0, 106, 32, 280, 80, 209, 60);
	ctx.drawImage(UI.bar_hp_mp, 3, 34, 100 - (((character.hp[1] - character.hp[0])/character.hp[1])*100), 16, 284, 81, 200 - (((character.hp[1] - character.hp[0])/character.hp[1])*200), 32);
	ctx.drawImage(UI.bar_hp_mp, 3, 48, 100 - (((character.mp[1] - character.mp[0])/character.mp[1])*100), 16, 284, 107, 200 - (((character.mp[1] - character.mp[0])/character.mp[1])*200), 32);
	ctx.fillStyle = '#fff';
    ctx.font = '7pt PressStart2PRegular';
    ctx.textAlign = 'center'
	ctx.fillText('HP:'+ character.hp[0] +'/'+ character.hp[1], 384, 103);
	ctx.fillText('MP:'+ character.mp[0] +'/'+ character.mp[1], 384, 130);
}