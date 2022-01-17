function(text){

    // The text gets parsed, lazily, each line when it's needed. The parsed instructions are stored as the story, so they do not need to be parsed again if you go to and fro.
    canvas.story = {};

    // Commands are put in a queue, and only executed after a draw command (empty line).
    canvas.buffer = [];

    // We save the index of the current line
    canvas.idx = -1;

    // And a reference to the current panel.
    canvas.cur = false;

    // This function draws a panel. It takes a string of space separated classes, which defines how it looks, and an array of up to four numbers which determines where it will be drawn (x offset, y offset, origin and destination).
    canvas.panel = function(clss, posi){

        // The panel is a div with a reference to its predecessor and its current chunk of text.
        var p = $('<div class="panel ' + clss + '"/>');
        p.prev = canvas.cur;
        p.cur = false;

        // We append the panel and make sure it has enough margin on the right. TODO This will be replaced with the positioning bit.
        canvas.append(p);
        var pos = p.position();
        if(canvas.innerWidth() - pos.left < 1000) canvas.width(canvas.width() + 1000);

        // This function adds a chunk of text to the panel. It takes a string of space separated classes, which defines how it looks, and a string of text.
        p.chunk = function(clss, text){

            // The chunk is also a div with a reference to its predecessor.
            var c = $('<div class="' + clss + '">' + text + '</div>');
            c.panel = p;
            c.prev = p.cur;

            p.append(c);

            p.cur = c;
            return c;
        }

        canvas.cur = p;
        return p;
    };

    // This function pans the canvas, for effects.
    canvas.pan = function(l, t){
        canvas.animate(posit(l,t), {queue: false});
    }

    // This function centers the current panel, which is the most basic effects.
    canvas.center = function(){

        // The current position of the canvas in the frame
        var p = canvas.cur.position();
        var l = p.left;
        var t = p.top;

        // plus half the size of the frame minus half the size of the current panel. TODO Maybe in the future this should center on the current chunk if possible.
        var w = frame.innerWidth() - canvas.cur.width();
        var h = frame.innerHeight() - canvas.cur.height();
        l += w / 2;
        t += h / 2;
        canvas.pan(l, t);
    };

    // Move the story forward till the next draw command.
    canvas.forward = function(){

        // Do not advance story past the end
        if(1 === text.length - canvas.idx) return;

        // Get the next line in the story. Parse it if needed.
        if('undefined' === typeof canvas.story[++canvas.idx]){
            canvas.story[canvas.idx] = parseLine(text[canvas.idx]);
        }
        var l = canvas.story[canvas.idx];

        // Buffer all commands till it's time to draw.
        if('draw' !== l.type){
            canvas.buffer.push(l);
            canvas.forward();

        // Draw the buffer, FIFO style.
        }else{

            // We need to keep track of pans. If none were executed this draw, we should center the current panel as a default.
            var pan = false;

            while(canvas.buffer.length > 0){
                l = canvas.buffer.shift();
                if('panel' === l.type){
                    canvas.panel(l.clss, l.posi);
                }else if('chunk' === l.type){
                    canvas.cur.chunk(l.clss, l.text);
                }else if('effect' === l.type){
                    if('pan' === l.command){
                        canvas.pan(l.arguments[0], l.arguments[1]);
                        pan = true;
                    }else if('center' === l.command){
                        canvas.center();
                        pan = true;
                    }
                }
            }

            if(!pan) canvas.center();
        }
    };

    // Move story backward
    canvas.backward = function(){

        // Do not go back past the beginning
        if(0 === canvas.idx) return;

        // We need to jump over the latest draw command. TODO In the future we will also undo it, if it's an effect worth undoing.
        canvas.idx -= 2;

        // Remove and relink
        var l = canvas.story[canvas.idx];
        if(canvas.cur.cur){
            canvas.cur.cur.remove();
            canvas.cur.cur = canvas.cur.cur.prev;
        }else if(canvas.cur){
            canvas.cur.remove();
            canvas.cur = canvas.cur.prev;
        }

        // Keep going back till we hit a draw command
        // TODO undo effects
        if('draw' !== l.type){
            canvas.backward();
        }else{
            canvas.center();
        }
    };
}