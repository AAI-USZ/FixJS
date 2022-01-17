function(seq_id) {
        var _ = this._;
        
        if (seq_id !== this.seq_id) {
            this.seq_id = seq_id;
            var keyons = _.keyons;
            
            while (_.samples <= 0) {
                
                // keyoff
                if (keyons.length > 0) {
                    sendkeyoff.call(this);
                    continue;
                }
                
                while (true) { // REDO
                    var cmd = fetch.call(this);
                    if (cmd.type === TONE) {
                        if (cmd.name !== "r") {
                            var m = atom(cmd.name, cmd.sign, _.octave);
                            _.keyons.push(m);
                            
                            var freq = mmtof((m << 13) + _.detune);
                            
                            // send keyon
                            timbre.fn.doEvent(this, "mml", [
                                { cmd : "keyon", freq  : freq,
                                  tnum: m      , volume: _.volume }
                            ]);
                        } else {
                            m = 0;
                        }
                        var dot = cmd.dot;
                        if (dot === 0 && cmd.length === undefined) {
                            dot = _.dot;
                        }
                        var length = cmd.length;
                        if (length === undefined) length = _.length;
                        if (length ===  0) continue; // REDO
                        
                        length = timbre.samplerate * (60 / _.bpm) * (4 / length);
                        length *= Dots[dot] || 1;
                        
                        if (m !== 0) {
                            var keyonlength    = (length * (_.quantize / 8))|0;
                            keyons.samples = (length - keyonlength);
                            _.samples += keyonlength;
                        } else {
                            _.samples += length|0;
                        }
                        
                    } else if (cmd.type === EXTERNAL) {
                        // send external
                        var value = cmd.length || 0;
                        if (cmd.sign === "-") value *= -1;
                        timbre.fn.doEvent(this, "external", [
                            { cmd:cmd.name, value:value }
                        ]);
                        
                    } else if (cmd.type === EOM) {
                        if (_.segnoIndex[0] === undefined) {
                            _.samples = Infinity;
                            timbre.fn.doEvent(this, "ended");
                            this.off();
                        } else {
                            _.index = _.segnoIndex[0];
                            timbre.fn.doEvent(this, "segno");
                        }
                    }
                    
                    break;
                }
            }
            _.samples -= timbre.cellsize;
            _.currentTime += (timbre.cellsize / timbre.samplerate) * 1000;
        }
        
        return this.cell;
    }