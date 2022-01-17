function(gridSize,minRoomHeight,possibleRoomHeightAdd,groundPos) {
	if(groundPos == null) groundPos = 0;
	if(possibleRoomHeightAdd == null) possibleRoomHeightAdd = 0;
	var map = new Array();
	var wallMask;
	var len;
	var door;
	var doorType;
	var sector;
	var rect;
	var portal;
	var portalPlane;
	len = this.rooms.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		rect = this.rooms[i];
		var uLen = Std["int"](rect.width);
		var vLen = Std["int"](rect.height);
		var invalid = false;
		var _g1 = Std["int"](rect.x);
		while(_g1 < uLen) {
			var u = _g1++;
			var _g2 = Std["int"](rect.y);
			while(_g2 < vLen) {
				var v = _g2++;
				if(this.grid[u][v] < 4) {
					haxe.Log.trace("NOn floor detected over room!  " + i,{ fileName : "RoomFiller.hx", lineNumber : 219, className : "glidias.RoomFiller", methodName : "getSectors"});
					invalid = true;
					break;
				}
			}
			if(invalid) break;
		}
		sector = new glidias.AABBSector();
		sector.setup(rect,gridSize,minRoomHeight + Math.round(Math.random() * possibleRoomHeightAdd),groundPos);
		map.push(sector);
	}
	len = this.doors.length;
	var target;
	var direction;
	var d;
	var c;
	var exit = false;
	var addedPortals = [];
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		door = this.doors[i];
		doorType = this.getDoorType(door);
		if(doorType >= 4) {
			target = this.getSectorIndexAt(door.x - door.z,door.y - door.w);
			haxe.Log.trace("indoors!" + [door.x,door.y] + " : " + [door.z,door.w],{ fileName : "RoomFiller.hx", lineNumber : 248, className : "glidias.RoomFiller", methodName : "getSectors"});
		} else if(doorType == 0) {
			target = -1;
			if(!this.enableOutdoors) continue;
			haxe.Log.trace("Outdoors!",{ fileName : "RoomFiller.hx", lineNumber : 253, className : "glidias.RoomFiller", methodName : "getSectors"});
		} else if(doorType == 1) {
			this.grid[door.x][door.y] = 3;
			if(door.z != 0) {
				d = glidias.AABBPortalPlane.norm(door.z);
				door.z += d;
				door.x -= d;
				while(true) {
					c = door.x - d;
					exit = c < 0 || c >= 80;
					if(exit) break;
					if(this.grid[c - d][door.y] >= 4) {
						this.grid[door.x][door.y] = 2;
						break;
					}
					door.z += d;
					door.x = c;
					this.grid[c][door.y] = 3;
					d++;
				}
				if(exit) continue;
			} else {
				d = glidias.AABBPortalPlane.norm(door.w);
				door.w += d;
				door.y -= d;
				while(true) {
					c = door.y - d;
					exit = c < 0 || c >= 80;
					if(exit) break;
					if(this.grid[door.x][c - d] >= 4) {
						this.grid[door.x][door.y] = 2;
						break;
					}
					door.w += d;
					door.y = c;
					this.grid[door.x][c] = 3;
					d++;
				}
				if(exit) continue;
			}
			target = !exit?this.getSectorIndexAt(door.x - door.z,door.y - door.w):-1;
		} else {
			haxe.Log.trace("Could not resolve door type. " + doorType + ". " + [door.x,door.y] + ": " + [door.z,door.w],{ fileName : "RoomFiller.hx", lineNumber : 317, className : "glidias.RoomFiller", methodName : "getSectors"});
			continue;
		}
		sector = new glidias.AABBSector();
		var tarOffset = target >= 0?2:1;
		rect = new glidias.Rectangle(door.x - (door.z < 0?tarOffset:0),door.y - (door.w < 0?tarOffset:0),door.z != 0?this.abs(door.z) + 1:1,door.w != 0?this.abs(door.w) + 1:1);
		sector.setup(rect,gridSize,this.doorHeight,groundPos);
		map.push(sector);
		portal = new glidias.AABBPortal();
		portal.id = "c_s";
		direction = portal.setup(target >= 0?map[target]:null,door,gridSize,gridSize,this.doorHeight,groundPos);
		sector.addPortal(portal,direction);
		addedPortals.push(portal);
		direction = glidias.AABBPortalPlane.getReverse(direction);
		var p;
		if(target >= 0) {
			p = portal.getReverse(sector,direction);
			p.id = "s_c";
			map[target].addPortal(p,direction);
			addedPortals.push(p);
		}
		target = this.getSectorIndexAt(door.x + door.z + glidias.AABBPortalPlane.norm(door.z),door.y + door.w + glidias.AABBPortalPlane.norm(door.w));
		if(target < 0) {
			haxe.Log.trace("Dead end.",{ fileName : "RoomFiller.hx", lineNumber : 367, className : "glidias.RoomFiller", methodName : "getSectors"});
			continue;
		}
		var copyDir = glidias.AABBPortalPlane.DIRECTIONS[direction];
		var copyOffset = (direction & 1) != 0?(glidias.AABBPortalPlane.abs(door.z) + 1) * gridSize:(glidias.AABBPortalPlane.abs(door.w) + 1) * gridSize;
		portal = portal.clone2(map[target],copyDir.x * -copyOffset,copyDir.y * -copyOffset,copyDir.z * -copyOffset);
		portal.id = "c_s2";
		sector.addPortal(portal,direction);
		addedPortals.push(portal);
		direction = glidias.AABBPortalPlane.getReverse(direction);
		p = portal.getReverse(sector,direction,true);
		p.id = "s_c2";
		map[target].addPortal(p,direction);
		addedPortals.push(p);
	}
	len = addedPortals.length;
	var points;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		portal = addedPortals[i];
		points = portal.points;
		portal.points = [points[3],points[0],points[1],points[2]];
	}
	return map;
}