function(line){
        var p = {};
        p.prev = canvas.cur;
        p.cur = false;
        p.div = $('<div class="panel ' + line.cls + '"/>');

        // Append it to canvas
        p.add = function(){
            canvas.append(p.div);

//            // Anchored location
//            var acls = p.div.attr('class').match(/\bbuoy-([^ ]*)/);
//            if(acls && acls[1]){
//                var a = p.prev;
//                while(a){
//                    if(a.div.hasClass('anchor-' + acls[1])){
//                        break;
//                    }else{
//                        a = a.prev;
//                    }
//                }
//                if(a){
//                    var offset = p.div.css('top');
//                    if('auto' !== offset){
//                        console.log('top');
//                    }
//                }
//            }

            // Make sure we have enough margin on the right
            var pos = p.div.position();
            if(canvas.innerWidth() - pos.left < 1000) canvas.width(canvas.width() + 1000);
        };

        // Add a chunk of text
        p.chunk = function(line){
            var c = {};
            c.panel = p;
            c.prev = p.cur;
            p
            p
            c.div = $('<div class="' + line.cls + '">' + line.txt + '</div>');

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