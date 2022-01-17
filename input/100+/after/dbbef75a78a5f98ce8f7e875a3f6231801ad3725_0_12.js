function() {
	if(this.currFeature-- == 0) {
		if(this.roomInterv != -1) null;
		haxe.Log.trace("Done.",{ fileName : "RoomFiller.hx", lineNumber : 543, className : "glidias.RoomFiller", methodName : "createFeature"});
		return false;
	}
	var i, j;
	var giveUp = 0;
	var tx = -1;
	var ty = -1;
	var tt, tb, tl, tr;
	var dir = -1;
	do {
		i = this.random.nextIntRange(2,78);
		j = this.random.nextIntRange(2,78);
		if(this.grid[i][j] == 1) {
			tt = this.grid[i][j - 1];
			tb = this.grid[i][j + 1];
			tl = this.grid[i - 1][j];
			tr = this.grid[i + 1][j];
			if(tt == 0 && (tl == 1 && tr == 1)) {
				tx = i;
				ty = j - 1;
				dir = 0;
			} else if(tb == 0 && (tl == 1 && tr == 1)) {
				tx = i;
				ty = j + 1;
				dir = 1;
			} else if(tl == 0 && (tt == 1 && tb == 1)) {
				tx = i - 1;
				ty = j;
				dir = 2;
			} else if(tr == 0 && (tt == 1 && tb == 1)) {
				tx = i + 1;
				ty = j;
				dir = 3;
			}
		}
	} while(dir == -1 && giveUp++ < 200);
	if(dir != -1) do {
		var w, h;
		var sx, sy;
		var feature = Math.random();
		if(feature < .3) {
			if(dir == 0 || dir == 1) {
				sx = tx - 1;
				w = 3;
				h = this.random.nextIntRange(10,20);
				if(dir == 0) {
					sy = ty - h;
					if(sy < 1) continue;
				} else {
					sy = ty + 1;
					if(ty + h > 79) continue;
				}
			} else {
				sy = ty - 1;
				w = this.random.nextIntRange(10,20);
				h = 3;
				if(dir == 2) {
					sx = tx - w;
					if(sx < 1) continue;
				} else {
					sx = tx + 1;
					if(tx + w > 79) continue;
				}
			}
		} else if(dir == 0 || dir == 1) {
			w = this.random.nextIntRange(6,14);
			h = this.random.nextIntRange(6,14);
			sx = tx - Math.floor(w * .5);
			if(sx < 1 || sx + w > 79) continue;
			if(dir == 0) {
				sy = ty - h;
				if(sy < 1) continue;
			} else {
				sy = ty + 1;
				if(ty + h > 79) continue;
			}
		} else {
			w = this.random.nextIntRange(6,14);
			h = this.random.nextIntRange(6,14);
			sy = ty - Math.floor(h * .5);
			if(sy < 1 || sy + h > 79) return true;
			if(dir == 2) {
				sx = tx - w;
				if(sx < 1) continue;
			} else {
				sx = tx + 1;
				if(tx + w > 79) continue;
			}
		}
		if(sx < 1) sx = 2;
		if(sx + w > 78) w = sx - 80 - 2;
		if(sy < 1) sy = 1;
		if(sy + h > 78) h = sy - 80 - 2;
		if(this.createRoom(sx,sy,w,h)) {
			this.grid[tx][ty] = 2;
			switch(dir) {
			case 0:
				this.grid[tx][ty + 1] = 3;
				this.doors.push(new glidias.Int4(tx,ty,0,1));
				break;
			case 1:
				this.grid[tx][ty - 1] = 3;
				this.doors.push(new glidias.Int4(tx,ty,0,-1));
				break;
			case 2:
				this.grid[tx + 1][ty] = 3;
				this.doors.push(new glidias.Int4(tx,ty,1,0));
				break;
			case 3:
				this.grid[tx - 1][ty] = 3;
				this.doors.push(new glidias.Int4(tx,ty,-1,0));
				break;
			}
			break;
		}
	} while(giveUp++ < 200);
	return true;
}