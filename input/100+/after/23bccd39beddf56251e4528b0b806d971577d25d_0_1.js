function(clss, posi){
        var p = {};
        p.prev = canvas.cur;
        p.cur = false;
        p.div = $('<div class="panel ' + clss + '"/>');

        // Append it to canvas
        p.add = function(){
            canvas.append(p.div);

            // Make sure we have enough margin on the right
            var pos = p.div.position();
            if(canvas.innerWidth() - pos.left < 1000) canvas.width(canvas.width() + 1000);
        };

        // Add a chunk of text
        p.chunk = function(clss, text){
            var c = {};
            c.panel = p;
            c.prev = p.cur;
            c.div = $('<div class="' + clss + '">' + text + '</div>');

            // Append it to panel
            c.add = function(){
                p.div.append(c.div);
            };

            canvas.buffer.push(c);
            p.cur = c;
            return c;
        }

        canvas.buffer.push(p);
        canvas.cur = p;
        return p;
    }