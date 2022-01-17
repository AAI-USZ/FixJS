function(sector,gridSize,mat) {
	var planeResult = glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[this.direction],sector,gridSize);
	var p;
	var html = "<div style=" + "" + "-webkit-transform:matrix3d(" + [-planeResult.right.x,-planeResult.right.y,-planeResult.right.z,0,planeResult.up.x,planeResult.up.y,planeResult.up.z,0,planeResult.look.x,planeResult.look.y,planeResult.look.z,0,planeResult.pos.x,planeResult.pos.y,planeResult.pos.z,1].join(",") + ");" + "" + "\">";
	var x = 0;
	var y = 0;
	var width = planeResult.width;
	var doorwayHeight = this.portals[0].height;
	var aboveDoorwayHeight = planeResult.height - doorwayHeight;
	if(aboveDoorwayHeight > 0) {
		p = glidias.PlaneResult.getIdentity();
		p.width = planeResult.width;
		p.height = aboveDoorwayHeight;
		html += "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(p.width) + "px;height:" + Math.round(p.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-p.right.x,-p.right.y,-p.right.z,0,p.up.x,p.up.y,p.up.z,0,p.look.x,p.look.y,p.look.z,0,p.pos.x,p.pos.y,p.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
	}
	var pos = planeResult.pos;
	var right = planeResult.right.getReverse();
	var baseOffset = pos.x * right.x + pos.y * right.y + pos.z * right.z;
	this.portals.sort(function(a,b) {
		var a2 = right.x * a.minX + right.y * a.minY + right.z * a.minZ;
		var b2 = right.x * b.minX + right.y * b.minY + right.z * b.minZ;
		if(a2 < b2) return -1; else if(a2 == b2) return 0;
		return 1;
	});
	var len = this.portals.length;
	var portal;
	var c;
	var lastC = -99999999;
	var o;
	var m = 0;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		portal = this.portals[i];
		c = portal.minX * right.x + portal.minY * right.y + portal.minZ * right.z;
		o = portal.maxX * right.x + portal.maxY * right.y + portal.maxZ * right.z;
		if(o < c) c = o;
		if(lastC > c) haxe.Log.trace("WRONG, shoudl be less!",{ fileName : "AABBPortalPlane.hx", lineNumber : 324, className : "glidias.AABBPortalPlane", methodName : "getHTML"});
		lastC = c;
		o = baseOffset < c?c - baseOffset:baseOffset - c;
		p = glidias.PlaneResult.getIdentity();
		p.pos.x = m;
		p.pos.y = aboveDoorwayHeight;
		p.width = o - m;
		p.height = portal.height;
		if(!(p.width == 0 || p.height == 0)) html += "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(p.width) + "px;height:" + Math.round(p.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-p.right.x,-p.right.y,-p.right.z,0,p.up.x,p.up.y,p.up.z,0,p.look.x,p.look.y,p.look.z,0,p.pos.x,p.pos.y,p.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
		m += p.width + portal.width;
	}
	portal = this.portals[len - 1];
	p = glidias.PlaneResult.getIdentity();
	p.pos.x = m;
	p.pos.y = aboveDoorwayHeight;
	p.width = planeResult.width - m;
	p.height = portal.height;
	if(!(p.width == 0 || p.height == 0)) html += "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(p.width) + "px;height:" + Math.round(p.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-p.right.x,-p.right.y,-p.right.z,0,p.up.x,p.up.y,p.up.z,0,p.look.x,p.look.y,p.look.z,0,p.pos.x,p.pos.y,p.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
	html += "</div>";
	return html;
}