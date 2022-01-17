function(s, m) {
    var _t = (m ? (m.reset(), m) 
                : new Transform());
    _t.translate(s.lx, s.ly);
    _t.translate(s.x, s.y); 
    _t.rotate(s.angle);
    _t.scale(s.sx, s.sy);
    _t.translate(-s.rx, -s.ry);  
    return _t;
}