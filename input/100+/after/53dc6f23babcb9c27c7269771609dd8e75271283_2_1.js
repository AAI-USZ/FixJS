function(ctx){
      var deferred = new Deferred();
      var doc = ctx ? ctx.document : document;

      var win = doc.defaultView;

      doc.documentElement.style.cursor = 'crosshair';

      var style = doc.createElement('style');
      style.innerHTML =
        "* {\n" +
        "  cursor: crosshair !important;\n" +
        "  -webkit-user-select: none;\n" +
        "}\n" +
        "div.taberareloo_capture_size {\n" +
        "  padding: 5px !important;\n" +
        "  border-radius: 5px !important;\n" +
        "  opacity: 0.7 !important;\n" +
        "  position: fixed !important;\n" +
        "  z-index: 999999999 !important;\n" +
        "  background-color: gray !important;\n" +
        "  color: white !important;\n" +
        "}\n";
      doc.body.appendChild(style);


      var region, p, d, moving, square, size;
      function mouse(e){
        return {
          x: e.clientX,
          y: e.clientY
        };
      }

      function onMouseMove(e){
        var to = mouse(e);

        if(moving){
          var px = to.x - d.w, py = to.y - d.h;
          if(px > window.innerWidth)
            px = window.innerWidth;
          if(py > window.innerHeight)
            py = window.innerHeight;
          p.x = Math.max(px, 0);
          p.y = Math.max(py, 0);
        }

        d = {
          w: to.x - p.x,
          h: to.y - p.y
        };

        var minusW = (d.w < 0), minusH = (d.h < 0);

        if(square){
          var s = Math.min(Math.abs(d.w), Math.abs(d.h));
          d.w = (minusW)? -(s) : s;
          d.h = (minusH)? -(s) : s;

        }
        var d2 = update({}, d), p2 = update({}, p);

        if(minusW || minusH){
          // 反転モード
          if(d2.w < 0){
            p2.x = p.x + d2.w;
            d2.w = -d2.w;
            if(p2.x < 0){
              d2.w += p2.x;
              p2.x = 0;
            }
          }
          if(d2.h < 0){
            p2.y = p.y + d2.h;
            d2.h = -d2.h;
            if(p2.y < 0){
              d2.h += p2.y;
              p2.y = 0;
            }
          }
          d.w = (minusW)? -(d2.w) : d2.w;
          d.h = (minusH)? -(d2.h) : d2.h;
        }

        var rx = p2.x + d2.w;
        if(rx > window.innerWidth){
          rx = (rx - window.innerWidth);
          d.w -= rx;
          d2.w -= rx;
        }
        var ry = p2.y + d2.h;
        if(ry > window.innerHeight){
          ry = (ry - window.innerHeight);
          d.h -= ry;
          d2.h -= ry;
        }

        if(square){
          if(d2.w < d2.h){
            var s = d2.w;
            if(minusH){
              p2.y += d2.h - s
              d.h = -(s);
            } else {
              d.h = s;
            }
            d2.h  = s
          } else {
            var s = d2.h;
            if(minusW){
              p2.x += d2.w - s
              d.w = -(s);
            } else {
              d.w = s;
            }
            d2.w  = s
          }
        }

        setElementPosition(region, p2);
        setElementDimensions(region, d2);
        $D(size);
        size.appendChild($T(d2.w + ' × ' + d2.h));
        // Sketch Switch
        // size.appendChild($T('× / _ / ×'));

        setStyle(size, {
          'top'  : to.y+10+'px',
          'left' : to.x+10+'px'
        });
      }

      function onMouseDown(e){
        cancel(e);

        p = mouse(e);
        region = doc.createElement('div');
        setStyle(region, {
          'background': '#888',
          'opacity'   : '0.5',
          'position'  : 'fixed',
          'zIndex'    : '999999999',
          'top'       : p.y+'px',
          'left'      : p.x+'px'
        });
        doc.body.appendChild(region);
        size = $N('div', {
          'class' : 'taberareloo_capture_size'
        });
        doc.body.appendChild(size);

        doc.addEventListener('mousemove', onMouseMove, true);
        doc.addEventListener('mouseup', onMouseUp, true);
        win.addEventListener('keydown', onKeyDown, true);
        win.addEventListener('keyup', onKeyUp, true);
      }

      function onKeyDown(e){
        cancel(e);

        switch(keyString(e)){
        case 'SHIFT': square = true; return;
        case 'SPACE': moving = true; return;
        case 'ESCAPE':
          finalize();
          deferred.cancel();
          return;
        }
      }

      function onKeyUp(e){
        cancel(e);

        switch(keyString(e)){
        case 'SHIFT': square = false; return;
        case 'SPACE': moving = false; return;
        }
      }

      function onMouseUp(e){
        cancel(e);

        var rect = region.getBoundingClientRect();
        p = {x: Math.round(rect.left), y: Math.round(rect.top)};
        finalize();

        // FIXME: 暫定/左上方向への選択不可/クリックとのダブルインターフェース未実装
        if(!d){
          deferred.cancel();
          return;
        }
        d.w = Math.abs(d.w), d.h = Math.abs(d.h);

        deferred.callback({
          position: p,
          dimensions: d
        });
      }

      function onClick(e){
        // リンククリックによる遷移を抑止する
        cancel(e);

        // mouseupよりも後にイベントが発生するため、ここで取り除く
        doc.removeEventListener('click', onClick, true);
      }

      function finalize(){
        doc.removeEventListener('mousedown', onMouseDown, true);
        doc.removeEventListener('mousemove', onMouseMove, true);
        doc.removeEventListener('mouseup', onMouseUp, true);
        win.removeEventListener('keydown', onKeyDown, true);
        win.removeEventListener('keyup', onKeyUp, true);

        doc.documentElement.style.cursor = '';

        removeElement(region);
        removeElement(size);
        removeElement(style);
      }

      doc.addEventListener('mousedown', onMouseDown, true);
      doc.addEventListener('click', onClick, true);
      doc.defaultView.focus();

      return deferred;
    }