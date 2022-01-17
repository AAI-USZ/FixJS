function draw(ctx){
		var key = 48;
		var lastkey = 16;
		var t2 = '';
		var pt = this.containsPoint(mouseX, mouseY);
		var sy = 0;
		if(pt){
			document.body.style.cursor = 'text';
		}else{
			document.body.style.cursor = 'auto';
		}
		if(pt && click){
			clicked = true;
			console.log(':)');
		}else if(!pt && click){
			clicked = false;
			console.log(':(');
		}
		if(clicked === true){
			sy = 20;
		}
		if(clicked){
			if(frame%30 === 0){
				if(cursoron){
					cursoron = false;
				}else{
					cursoron = true;
				}
			}
		}else{
			cursoron = false;
		}
		if(key === 16 && keydown || lastkey === 16 && keydown){
			shift = true;
		}
		
		if(keydown && clicked){
			if((frame - lastframe) > 30){
				lastframe = frame;
				t = t.split('');
				console.log(keydown)
				
				if(key >= 48 && key <= 90){
					key = String.fromCharCode(keycode);
					if(shift === false){
						key = key.toLowerCase();
					}
					t.splice(t.length-cursor, 0, key);
					
				}
			}
		}
		if(keydown === false && key === 0){
			shift = false;
		}
		if(!keydown && clicked){
			lastframe -= 30;
		}
		for(i = 0; i < t.length; i++){
			t2 = t2 + t[i]
		}
		t=t2;
		ctx.drawImage(UI.input, 32, sy, 32, 20, x+32, y, w-64, h);
		ctx.drawImage(UI.input, 0, sy, 32, 20, x, y, 32, h);
		ctx.drawImage(UI.input, 98, sy, 32, 20, x+(w-64+32), y, 32, h);
		
		ctx.fillStyle = 'black';
        ctx.font = '12pt PressStart2PRegular';
        ctx.textAlign='left';
        ctx.fillText(t2, x +10, y + 30, 99999999999);
        if(cursoron){
        	ctx.fillText('|', x + ((t2.length-cursor)*16), y + 30, w-20);
        }
	}