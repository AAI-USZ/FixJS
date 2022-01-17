function createContext(ctx, w, h) {
        var $save = ctx.save, $restore = ctx.restore, $rotate = ctx.rotate, $scale = ctx.scale, $translate = ctx.translate;

        ctx.counter = 0;
        ctx.stack = Array(33);
        for(var i=0; i < ctx.stack.length; i++) { 
            var s = new Object();
            s.srot = s.rotateVal = s.x = s.y = s.width = s.height = s.dx = s.dy = 0;
            s.crot = s.sx = s.sy = 1;
            ctx.stack[i] = s;
        }
        ctx.stack[0].width  = w;
        ctx.stack[0].height = h;
        ctx.setFont(pkg.Font.defaultNormal);
        ctx.setColor(zebra.util.rgb.white);

        ctx.getTopStack = function() { return this.stack[this.counter]; }

        ctx.tX = function(x, y) { 
            var c = this.stack[this.counter], b = (c.sx != 1 || c.sy != 1 || c.rotateVal != 0);
            return (b ?  ((c.crot * x + y * c.srot)/c.sx + 0.5) | 0 : x) - c.dx; 
        }
        
        ctx.tY = function(x, y) { 
            var c = this.stack[this.counter], b = (c.sx != 1 || c.sy != 1 || c.rotateVal != 0);
            return (b ? ((y * c.crot - c.srot * x)/c.sy + 0.5) | 0 : y) - c.dy; 
        }

        ctx.translate = function(dx, dy) { 
            if (dx != 0 || dy != 0) {
                var c = this.stack[this.counter];
                c.x -= dx;
                c.y -= dy;
                c.dx += dx;
                c.dy += dy;
                $translate.call(this, dx, dy); 
            }
        }

        ctx.rotate = function(v) {
            var c = this.stack[this.counter];
            c.rotateVal += v;
            c.srot = MS(c.rotateVal);
            c.crot = MC(c.rotateVal);
            $rotate.call(this, v);
        }

        ctx.scale = function(sx, sy) {
            var c = this.stack[this.counter];
            c.sx = c.sx * sx;
            c.sy = c.sy * sy; 
            $scale.call(this, sx, sy);
        }

        ctx.save = function() {
            this.counter++;
            var c = this.stack[this.counter], cc = this.stack[this.counter - 1];
            c.x = cc.x;
            c.y = cc.y;
            c.width = cc.width;
            c.height = cc.height;

            c.dx = cc.dx;
            c.dy = cc.dy;
            c.sx = cc.sx;
            c.sy = cc.sy;
            c.srot = cc.srot;
            c.crot = cc.crot;
            c.rotateVal = cc.rotateVal;

            $save.call(this);
            return this.counter - 1;
        }

        ctx.restore = function() {
            if (this.counter == 0) throw new Error();
            this.counter--;
            $restore.call(this);
            return this.counter;
        }
        
        //!!!!!
        ctx.setClip = function(x,y,w,h) {}

        ctx.clipRect = function(x,y,w,h){
            var c = this.stack[this.counter];
            if (c.x != x || y != c.y || w != c.width || h != c.height) {
                var xx = c.x, yy = c.y, ww = c.width, hh = c.height;
                c.x      = Math.max(x, xx);
                c.width  = Math.min(x + w, xx + ww) - c.x;
                c.y      = Math.max(y, yy);
                c.height = Math.min(y + h, yy + hh) - c.y;
                if (c.x != xx || yy != c.y || ww != c.width || hh != c.height) {
                    this.beginPath();
                    this.rect(x, y, w, h);
                    this.clip();
                }
            } 
        }
        
        ctx.reset = function(w, h) {
            //!!!!!!!!!!!!
            this.counter = 0;
            this.stack[0].width = w;
            this.stack[0].height = h;
        }
        
        return ctx;
    }