function(text){

    // The text gets parsed, lazily, each line when it's needed. The parsed instructions are stored as the story, so they do not need to be parsed again if you go to and fro.
    canvas.story = {};

    // Commands are put in a queue, and only executed after a draw command (empty line).
    canvas.buffer = [];

    // We save the index of the current line
    canvas.idx = -1;
    // and a reference to the current panel.
    canvas.cur = false;

    // When it's time to draw a panel, we use this function which takes a string of space separated classes, which defines how the panel looks, and an array of up to four numbers which determines where it will be drawn (x offset, y offset, origin and destination).
    canvas.panel = function(clss, posi){

        // The panel object is a jquery div
        var p = $('<div class="panel ' + clss + '"/>');
        // with a reference to its predecessor
        p.prev = canvas.cur;
        // and its current chunk of text.
        p.cur = false;
        //And it gets appended to the canvas.
        canvas.append(p);

        // We make sure the panel has enough margin on the right. TODO This will be replaced with the positioning bit.
        var pos = p.position();
        if(canvas.innerWidth() - pos.left < 1000) canvas.width(canvas.width() + 1000);

        // When we want to add a chunk of text to the panel we use this function, which takes a string of space separated classes, which define how the chunk looks, and a string of text.
        p.chunk = function(clss, text){

            // The chunk is also a jquery div
            var c = $('<div class="' + clss + '">' + text + '</div>');
            // with a reference to its containing panel
            c.panel = p;
            // and the chunk that preceded it.
            c.prev = p.cur;
            // And it gets appended to the panel.
            p.append(c);

            // All that remains it to set the chunk we created as the current chunk and return it.
            p.cur = c;
            return c;
        }

        // All that remains it to set the panel we created as the current panel and return it.
        canvas.cur = p;
        return p;
    };

    // The canvas has effects you can call. Most basic of which is this animation that slides the canvas to a new position (given as left and top CSS properties - the canvas is relatively positioned within the frame).
    canvas.pan = function(l, t){
        canvas.animate(posit(l,t), {queue: false});
    }

    // Only slightly more complex is this animation, which centers the current panel. This is the default effect.
    canvas.center = function(){

        // We obtain the current position of the canvas in the frame
        var p = canvas.cur.position();
        var l = p.left;
        var t = p.top;
        // add to it the size of the frame minus the size of the current panel both divided in two. TODO Maybe in the future this should center on the current chunk, if there is one.
        var w = frame.innerWidth() - canvas.cur.width();
        var h = frame.innerHeight() - canvas.cur.height();
        l += w / 2;
        t += h / 2;
        canvas.pan(l, t);
    };

    // The canvas can move the story forward till the next draw command
    canvas.forward = function(){
        // taking care not advance the story past the end
        if(1 === text.length - canvas.idx) return;

        // First we get the next line in the story, parsing it if hasn't been parsed yet.
        if('undefined' === typeof canvas.story[++canvas.idx]){
            canvas.story[canvas.idx] = parseLine(text[canvas.idx]);
        }
        var l = canvas.story[canvas.idx];

        // Then we buffer all commands
        if('draw' !== l.type){
            canvas.buffer.push(l);
            canvas.forward();
        // till it's time to draw.
        }else{

            // We keep a flag that sets when pans occur. If none were explicitly stated, we center the current panel as a default effect.
            var pan = false;

            // As long as there are command in the queue
            while(canvas.buffer.length > 0){
                // pop the first command out of it.
                l = canvas.buffer.shift();
                // If it's a panel, create a panel,
                if('panel' === l.type){
                    canvas.panel(l.clss, l.posi);
                // if it's a chunk, create a chunk,
                }else if('chunk' === l.type){
                    canvas.cur.chunk(l.clss, l.text);
                // and if it's an effect, execute it
                }else if('effect' === l.type){
                    if('pan' === l.command){
                        canvas.pan(l.arguments[0], l.arguments[1]);
                    }else if('center' === l.command){
                        canvas.center();
                    }
                    // and don't forget to set the flag.
                    pan = true;
                }
            }

            // If the flag was not set, we center the current panel.
            if(!pan) canvas.center();
        }
    };

    // The canvas can also move story backward
    canvas.backward = function(){
        // taking care not go back past the beginning.
        if(1 > canvas.idx){
            canvas.idx = -1;
            return;
        }

        // First we decrement the index and check the previous command.
        canvas.idx--;
        var l = canvas.story[canvas.idx];

        // If it's a draw command
        if('draw' === l.type){
            // we center the current panel.
            canvas.center();

        }else{
            // If it's an effect, we ignore it. TODO In the future we will undo it, if it's an effect worth undoing.
            if('effect' === l.type){
                ;

            // If it's a chunk,
            }else if('chunk' === l.type){
                // we remove it
                canvas.cur.cur.remove();
                // and set the previous chunk as current.
                canvas.cur.cur = canvas.cur.cur.prev;
            // And if it's a panel
            }else if('panel' === l.type){
                // we remove it
                canvas.cur.remove();
                // and set the previous panel as current.
                canvas.cur = canvas.cur.prev;
            }

            // And since it wasn't a draw command, we keep going back till we hit one or reach the start of the story.
            canvas.backward();
        }
    };
}