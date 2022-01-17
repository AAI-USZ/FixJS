function() {
		updatesize();
		ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
		ctx.fillRect(0,0,w,h);
		secs = (millis() - t) / 1000;
		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = "source-over";
		if (secs < 20) {
			fs = secs * 100;
			for (var i = 0; i < p.length; i++) {
				q = fisheye(p[i], {x:w/2, y:h/2});
				ctx.fillStyle = q.c;
				ctx.beginPath();
				ctx.arc(q.x, q.y, q.r, 0, 2*Math.PI); 
				ctx.closePath();
				ctx.fill();
			}
			updatepoints();
		}
		ctx.globalCompositeOperation = "xor";
		if (logo.loaded) {
			var scale = 20 - secs;
			if (scale < 1) scale = 1;
			var hw = logo.width * scale / 2;
			var hh = logo.height * scale / 2;
			ctx.drawImage(logo, w/2 - hw, h/2 - hh, 2*hw, 2*hh);
		}
		if (secs > 20 && !clickable) {
			clickable = true;
			$("#canvas").click(function() {
				window.location="http://0x20.be/FrackFest_is_a_feature";
			});
			$("#canvas").css('cursor', 'pointer');
		}
		if (secs > 20) {
			var pic = pics[parseInt(secs/2) % pics.length];
			var scale = w / pic.width;
			scale *= 1 + secs % 2;
			var sw = pic.width * scale;
			var sh = pic.height * scale;
			ctx.drawImage(pic, (w-sw)/2, (h-sh)/2, sw, sh);
		}
		ctx.globalCompositeOperation = "source-over";
		if (secs > 20) {
			var alpha = 1-((23-secs)/3);
			if (alpha > 1) alpha = 1;			
			ctx.globalAlpha = alpha;
			ctx.fillStyle = "#333333";
			ctx.textAlign = "center";
			var x = w/2;
			var y = h/2 + 200;
			ctx.font='40px "VideoPhreak"';
			ctx.fillText("That's not a bug, that's a feature!", x, y);
			y += 40;
			ctx.font='28px "VideoPhreak"';
			ctx.fillText("Friday, 29th of June 2012, Whitespace.", x, y);
			y += 30;
			ctx.font='22px "VideoPhreak"';
			ctx.fillText("You *are* invited. Resistance *is* futile.", x, y);
			y += 24;
			ctx.font='16px "VideoPhreak"';
			ctx.fillText("Coded by sandb.", x, y);
		}
		ctx.globalCompositeOperation = "source-over";
		if (secs > 30) {
			fs = (10 + Math.abs(((secs - 30) % 20) - 10)) * 100;
			for (var i = 0; i < p.length; i++) {
				q = fisheye(p[i], {x:w/2, y:h/2});
				ctx.fillStyle = q.c;
				ctx.beginPath();
				ctx.arc(q.x, q.y, q.r, 0, 2*Math.PI); 
				ctx.closePath();
				ctx.fill();
			}
			updatepoints();
		}
		if (secs > 4 && !playing) {
			playing = true;
			aw.play();
		}
		setTimeout("draw()", 30);
	}