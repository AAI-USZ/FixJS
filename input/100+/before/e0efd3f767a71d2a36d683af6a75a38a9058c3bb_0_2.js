function(text){

    // The text gets parsed, lazily, each line when it's needed. The parsed instructions are stored as the story, so they do not need to be parsed again if you go to and fro.
    canvas.story = {};

    // Commands are put in a queue, and only executed after a draw command (empty line).
    canvas.buffer = [];

    // We save the index of the current line
    canvas.idx = -1;
    // and a reference to the current panel which, at this early point, , is initialized to a dummy panel that always returns position and size of 0 (this is done so that we have a starting position).
    canvas.cur = {
        position: function(){return posit(0, 0);},
        outerWidth: function(){return 0;},
        outerHeight: function(){return 0;},
        point: function(){return {left: 0, top: 0};},
        chunk: function(clss, text){return canvas.panel('','','',[]).chunk(clss, text);}
    };

    // We also maintain a dictionary of labeled panels, which can be referenced later for all sorts of cool stuff.
    canvas.labels = {};

    // When it's time to draw a panel, we use this function which takes a string of space separated classes, which defines how the panel looks, and an array of up to four numbers which determines where it will be drawn (x offset, y offset, origin and destination).
    canvas.panel = function(labl, clss, posi, ancr){

        // The panel object is a jquery div which we append to the canvas
        var p = $('<div class="panel ' + clss + '"/>').appendTo(canvas);
        // with a reference to its predecessor
        p.prev = canvas.cur;
        // and its current chunk of text.
        p.cur = false;

        // If it is labeled, we should keep it in the dictionary.
        if('undefined' !== typeof labl) canvas.labels[labl] = p;

        // Panels are positioned relative to an anchor panel. By default this is the previous panel.
        p.anchor = ancr && canvas.labels[ancr] || p.prev;

        // But the anchor doesn't have to be the top-left corner of the panel (as is the CSS default). Instead, the corners are numbered clockwise from 0 to 3 starting at the top-left. Fractions are used to refer to points between the corners and all negative numbers refer to the center of the panel, just in case you ever wanna go there. Since this corner annotation is used both on the anchor panel and on the panel that is anchored to it (AKA "buoy panel"), we supply a function that translates it into CSS compatible coordinates.
        p.point = function(corner) {

            // First we need the size of the panel.
            var w = p.outerWidth();
            var h = p.outerHeight();

            // Now we start with the base CSS location (top-left corner, which we call 0) and work from there.
            var o = {left: 0, top: 0};

            // Just remember a rectangle has 4 corners and you will be OK.
            corner %= 4;

            // Negative numbers denote the middle of the element.
            if(corner < 0){
                o.left += w / 2;
                o.top += h / 2;

            // 0 to 1 is the top edge.
            }else if(corner < 1){
                o.left += corner * w;

            // 1 to 2 is the right edge.
            }else if(corner < 2){
                o.left += w;
                o.top += (corner - 1) * h;

            // 2 to 3 is the bottom edge.
            }else if(corner < 3){
                o.left += (1 - corner + 2) * w;
                o.top += h;

            // 3 to 4 is the left edge.
            }else if(corner < 4){
                o.top += (1 - corner + 3) * h;
            }

            return o;
        };

        // By default, the new panel will be 3 pixels (FIXME this should be measured in ems, really) to the left of the anchor point
        p.left = 3;
        // while keeping the same height.
        p.top = 0;
        // The default anchor point is 1, which is the top-right corner,
        p.o = 1;
        // and the default destination point on the new ("buoy", remember?) panel defaults to 0, which is the top-left corner.
        p.d = 0;

        // But we override those defaults if we are supplied with arguments.
        if('undefined' !== typeof posi[0]){
            p.left = posi[0];
            if('undefined' !== typeof posi[1]){
                p.top = posi[1];
                if('undefined' !== typeof posi[2]){
                    p.o = posi[2];
                    if('undefined' !== typeof posi[3]){
                        p.d = posi[3];
                    }
                }
            }
        }

        // Now we can calculate the desired left and top properties of the panel. This is a function because we will do it again every time the involved panels change, but don't worry, we will also call it as soon as we finish defining it.
        p.place = function(){

            // We get the position of the anchor panel,
            var o = p.anchor.position();
            // the position on that panel
            var a = p.anchor.point(p.o);
            // and the offset between the destination point and the 0 point (top-left corner) of the new panel.
            var d = p.point(p.d);
            // and we can set the position of the panel.
            p.css({
                'left': (o.left + a.left + p.left - d.left) + 'px',
                'top': (o.top + a.top + p.top - d.top) + 'px'
            });
        }
        p.place();

        // When we want to add a chunk of text to the panel we use this function, which takes a string of space separated classes, which define how the chunk looks, and a string of text.
        p.chunk = function(clss, text){

            // The chunk is a jquery div which we add to the panel
            var c = $('<div class="' + clss + '">' + text + '</div>').appendTo(p);
            // with a reference to its containing panel
            c.panel = p;
            // and the chunk that preceded it.
            c.prev = p.cur;

            // We tell the containing panel to reposition itself. TODO This should probably be propageted to a chain of buoy panels.
            p.place();

            // And all that remains it to set the new panel as the current chunk and return it.
            p.cur = c;
            return c;
        }

        // All that remains it to set the chunk we created as the current panel and return it.
        canvas.cur = p;
        return p;
    };

    // The canvas has effects you can call. Most basic of which is this animation that slides the canvas to a new position (given as left and top CSS properties - the canvas is relatively positioned within the frame).
    canvas.pan = function(l, t){
        canvas.animate(posit(l,t), {queue: false});
    }

    // Only slightly more complex is this animation, which centers the current panel. This is the default effect.
    canvas.center = function(anchor){

        console.log(typeof anchor, anchor);
        // If an anchor was given, we try to get it,
        if('string' === typeof anchor){
            anchor = canvas.labels[anchor];
        }
        // then we default to the current panel.
        if('undefined' === typeof anchor){
            anchor = canvas.cur;
        }

        console.log(anchor);

        // We obtain the position of the current panel in the frame
        var p = anchor.position();
        var l = p.left;
        var t = p.top;
        // and subtract it from half a frame minus half a panel.
        l = (0.5 * (frame.innerWidth() - anchor.outerWidth())) - l;
        t = (0.5 * (frame.innerHeight() - anchor.outerHeight())) - t;
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
                    canvas.panel(l.labl, l.clss, l.posi, l.ancr);
                // if it's a chunk, create a chunk,
                }else if('chunk' === l.type){
                    canvas.cur.chunk(l.clss, l.text);
                // and if it's an effect, execute it
                }else if('effect' === l.type){
                    if('pan' === l.command){
                        canvas.pan(l.arguments[0], l.arguments[1]);
                    }else if('center' === l.command){
                        canvas.center(l.arguments[0]);
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
                // (which means it could change size, so we better reposition it - TODO this should really be in some resize event)
                canvas.cur.place();
                // and set the previous chunk as current
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