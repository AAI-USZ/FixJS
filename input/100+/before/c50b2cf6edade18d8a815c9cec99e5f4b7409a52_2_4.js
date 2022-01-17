function (that) {
        that.setup = function (){
            that.model.keys.white.notes = [];
            that.model.keys.black.notes = [];
            for (i = that.model.firstNote; i < (that.model.firstNote + (that.model.octaves * that.model.octaveNotes)); i+=1){
                that.model.keys[that.model.pattern[i % that.model.octaveNotes]].notes.push(i);
            }
        
            that.model.whiteNotes = that.model.keys.white.notes.length;
            that.model.blackNotes = that.model.keys.black.notes.length;
        
            that.model.viewbox = {
                width: (that.model.keys.white.width * that.model.whiteNotes) + that.model.padding,
                height: that.model.keys.white.height + that.model.padding,
            };
            
            // Calculate to create string neccesary to generate viewbox (should be in JSON?)
            that.model.viewbox.dim = "0 0 " + that.model.viewbox.width + " " + that.model.viewbox.height;
        };
        
        
        // Automation of drawing all the keys on the canvas
        that.drawNote = function(noteType, x, y, id){
            var r = that.noteGroup.append("rect");
            r.style("stroke", noteType.stroke);
            r.style("fill", noteType.fill);
            r.attr("x", x);
            r.attr("y", y);
            r.attr("width", noteType.width);
            r.attr("height", noteType.height);
            r.attr("id", id);
            r.attr("class", "note");
            r.attr("noteType", noteType.fill)
        };
        
        // Automation of drawing all the keys on the canvas
        that.render = function(){
            var blackX = 0 - (that.model.keys.black.width / 2),
                prevNote,
                blackCount = 0;
            
            if (that.model.keys.white.notes[0] > that.model.keys.black.notes[0]){
                blackX = blackX - that.model.keys.white.width + (that.model.keys.black.width / 2);
            }
            // Draw White Keys
            for (i = 0; i < that.model.keys.white.notes.length; i+=1){
                if (that.model.keys.white.notes[0] > that.model.keys.black.notes[0]){
                    that.drawNote(that.model.keys.white, (i * that.model.keys.white.width) + that.model.keys.black.width / 2, 0, that.model.keys.white.notes[i]);
                }
                else{
                    that.drawNote(that.model.keys.white, i * that.model.keys.white.width, 0, that.model.keys.white.notes[i]);
                }
            }
            
            // Draw Black Keys
            for (i = that.model.firstNote; i < (that.model.octaves * that.model.octaveNotes) + that.model.firstNote; i+=1){
                //get width going
                
                // If the current key in the pattern is black then draw it!
                if (that.model.pattern[i%that.model.octaveNotes] === "black") {
                    blackX = blackX + that.model.keys.white.width; 
                    that.drawNote(that.model.keys.black, blackX, 0, that.model.keys.black.notes[blackCount]);
                    blackCount = blackCount + 1;
                }
                
                // If it is white, but the previous key was white, skip the key
                if (that.model.pattern[i%that.model.octaveNotes] === prevNote){
                    blackX = blackX + that.model.keys.white.width;
                }
                
                // Keep track of previous key
                prevNote = that.model.pattern[i%that.model.octaveNotes]
            }
        };
        
        that.draw = function(){
            // Calculate it all
            that.setup();
            // Draw viewbox and subsequent group to draw keys into
            that.d3container = d3.select("#piano");  // ??????
            var svg = that.d3container.append("svg");
            svg.attr("viewBox", that.model.viewbox.dim)
            svg.attr("id", "viewbox")
            
            that.noteGroup = svg.append("g")
            that.noteGroup.attr("transform", "translate(" + that.model.padding / 2 + "," + that.model.padding / 2 + ")");
            
            // Draw the keys
            that.render();
        };
        
        that.update = function (param, value) {
            that.applier.requestChange(param, value);
            that.container.html('');
            that.draw();
            return that;
        };
    }