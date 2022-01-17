function (opt) {
            opt = opt||{};
             var setvalue = opt.value||0;
             var w_func = opt.src||opt.func||null;
             var ipos = opt.startX||0;
             var jpos = opt.startZ||0;
             var ilen = opt.walkX;
             var jlen = opt.walkZ;
             var hfBuffer = this.hfFloatBuffer;

             var pt,i,imax;

             var ofs_w = (this.sizeX / 2.0) - ((this.sizeX / (this.divX)) / 2.0);
             var ofs_h = (this.sizeZ / 2.0) - ((this.sizeZ / (this.divZ)) / 2.0);

             if (ipos !== undef && jpos !== undef && ilen !== undef && jlen !== undef) {
                 if (ipos >= this.divX) return;
                 if (jpos >= this.divZ) return;
                 if (ipos + ilen >= this.divX) ilen = this.divX - 1 - ipos;
                 if (jpos + jlen >= this.divZ) jlen = this.divZ - 1 - jpos;
                 if (ilen <= 0 || jlen <= 0) return;

                 for (i = ipos, imax = ipos + ilen; i < imax; i++) {
                     for (var j = jpos, jmax = jpos + jlen; j < jmax; j++) {
                         var t = (i) + (j * this.divX);
                         
                         if (w_func===null) {
                             hfBuffer[t] = setvalue;
                         } else {
                             hfBuffer[t] = w_func(this.cellSize*i-ofs_w, this.cellSize*j-ofs_h, t);
                         }
                     }
                 }
             } else {
                 for (i = 0, imax = this.hfFloatBuffer.length; i < imax; i++) {
                     if (w_func===null) {
                         hfBuffer[i] = setvalue;
                     } else {
                         var val = w_func((i%this.divX)*this.cellSize-ofs_w, (Math.floor(i/this.divX))*this.cellSize-ofs_h, i);
                         hfBuffer[i] = val;
                     }
                 }
             }
         }