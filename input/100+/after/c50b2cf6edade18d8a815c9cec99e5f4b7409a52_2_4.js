function (){
            that.model.keys.white.notes = [];
            that.model.keys.black.notes = [];
            for (var i = that.model.firstNote; i < (that.model.firstNote + (that.model.octaves * that.model.octaveNotes)); i+=1){
                that.model.keys[that.model.pattern[i % that.model.octaveNotes]].notes.push(i);
            }
        
            that.model.whiteNotes = that.model.keys.white.notes.length;
            that.model.blackNotes = that.model.keys.black.notes.length;
        
            that.model.viewbox = {
                width: (that.model.keys.white.width * that.model.whiteNotes) + that.model.padding,
                height: that.model.keys.white.height + that.model.padding
            };
            
            // Calculate to create string neccesary to generate viewbox (should be in JSON?)
            that.model.viewbox.dim = "0 0 " + that.model.viewbox.width + " " + that.model.viewbox.height;
        }