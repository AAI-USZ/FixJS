function(gtime) {
    var x = this.xdata;
    switch (x.mode) {
        case C.R_ONCE:
            return this.__checkGJump(gtime);
        case C.R_LOOP: {
                var p = this.parent;
                var durtn = x.lband[1] -
                            x.lband[0],
                    pdurtn = p
                        ? (p.xdata.lband[1] -
                           p.xdata.lband[0])
                        : durtn;
                if (durtn < 0) return -1;
                var times = Math.floor(pdurtn / durtn),
                    fits = Math.floor((gtime - x.gband[0]) / durtn);
                if (fits < 0) return -1;
                var t = (gtime - x.gband[0]) - (fits * durtn);
                return (fits <= times) ? this.__checkJump(t) : -1;
            }
        case C.R_BOUNCE: {
                var p = this.parent;
                var durtn = x.lband[1] -
                            x.lband[0],
                    pdurtn = p
                        ? (p.xdata.lband[1] -
                           p.xdata.lband[0])
                        : durtn;
                if (durtn < 0) return -1;
                var times = Math.floor(pdurtn / durtn),
                    fits = Math.floor((gtime - x.gband[0]) / durtn);
                if (fits < 0) return -1;
                var t = (gtime - x.gband[0]) - (fits * durtn),
                    t = ((fits % 2) === 0) ? t : durtn - t;
                return (fits <= times) ? this.__checkJump(t) : -1;
            }
    }
}