function(seq_id) {
            var _ = this._;
    
            if (seq_id !== this.seq_id) {
                this.seq_id = seq_id;
                
                var keyons = _.keyons;
                
                _.sentinel = false;
                while (_.samples <= 0) {
                    
                    // keyoff
                    if (keyons.length > 0 && !_.tie) {
                        sendkeyoff.call(this);
                        continue;
                    }
                    while (true) { // REDO
                        var track = _.tracks[_.selected];
                        if (track === undefined) break;
                        
                        var cmd = track.fetch();
                        
                        if (cmd.type === TONE) {
                            var dot = cmd.dot;
                            if (dot === 0 && cmd.length === undefined) {
                                dot = track.dot;
                            }
                            var length = cmd.length;
                            if (length === undefined) length = track.length;
                            
                            if (cmd.name !== "r") {
                                var m    = atom(cmd.name, cmd.sign, track.octave);
                                var freq = mmtof((m << 6) + track.detune);
                                if (_.tie) {
                                    m = _.keyons[_.keyons.length - 1];
                                } else {
                                    _.keyons.push(m);
                                }
                                
                                // send keyon
                                timbre.fn.doEvent(this, "mml", [{
                                    cmd   : "keyon", freq  : freq,
                                    tnum  : m      , volume: track.volume,
                                    length: length , tie   : _.tie
                                }]);
                                _.tie = cmd.tie;
                                
                            } else {
                                m = 0;
                                _.tie = false;
                            }
                            if (length ===  0) continue; // REDO
                            
                            var samples = timbre.samplerate * (60 / _.bpm) * (4 / length);
                            samples *= Dots[dot] || 1;
                            
                            if (m !== 0 && !_.tie) {
                                var keyonsamples = (samples * (track.quantize / 8))|0;
                                keyons.samples = (samples - keyonsamples);
                                _.samples += keyonsamples;
                            } else {
                                _.samples += samples|0;
                            }
                            
                        } else if (cmd.type === EXTERNAL) {
                            // send external
                            var value = null;
                            if (cmd.length !== undefined) {
                                value = cmd.length;
                                if (cmd.sign === "-") value *= -1;
                            }
                            timbre.fn.doEvent(this, "external", [
                                { cmd:cmd.name, value:value }
                            ]);
                            
                        } else if (cmd.type === EOM) {
                            if (_.sentinel) {
                                _.samples = Infinity;
                            } else {
                                _.sentinel   = true;
                                _.endedEvent = true;                            
                                if (track.segnoIndex[0] === undefined) {
                                    timbre.fn.doEvent(this, "ended");
                                    if (_.endedEvent) _.samples = Infinity;
                                } else {
                                    track.index = track.segnoIndex[0];
                                    timbre.fn.doEvent(this, "segno");
                                }
                                _.endedEvent = false;
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