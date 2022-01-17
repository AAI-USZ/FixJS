function() {
        var MMLTrack = function() {
            initialize.apply(this, arguments);
        }, $this = MMLTrack.prototype;

        var initialize = function(parent, mml) {
            this.parent = parent;
            this.mml = mml;
            
            this.octave   = 5;   // (0 .. 9)
            this.length   = 4;   // (1 .. 1920)
            this.dot      = 0;   // (0 .. 3)
            this.detune   = 0;   // (-8192 .. 8191)
            this.quantize = 6;   // (0 .. 8)
            this.volume   = 8;   // (0 .. 128)
            
            this.compile(mml);
        };
        
        $this.compile = function(mml) {
            var _ = this._;
            
            var m, re = ReMML, commands = [];
            while ((m = re.exec(mml)) !== null) {
                commands.push(new Command(m[1], m[2], m[3], m[4]));
            }
            this.commands = commands;
            
            this.index      =  0;
            this.segnoIndex = {};
            this.loopStack  = [];
            
            var prev_tone = null, tie_cancel = false;
            var segnoIndex = this.segnoIndex;
            for (var i = 0, imax = commands.length; i < imax; ++i) {
                var cmd = commands[i];
                if (cmd.name === "$") {
                    var value = cmd.length;
                    if (value === undefined) value = 0;
                    segnoIndex[value] = i;
                } else if (cmd.type === TONE) {
                    prev_tone  = cmd;
                    tie_cancel = false;
                } else if (cmd.type === CONTROL) {
                    tie_cancel = true;
                } else if (cmd.name === "&") {
                    if (prev_tone && !tie_cancel) prev_tone.tie = true;
                }
            }
            
            sendkeyoff.call(this.parent);
        };
        
        $this.bang = function() {
            this.index     =  0;
            this.loopStack = [];
        };

        $this.segno = function(index) {
            index = this.segnoIndex[index];
            if (index !== undefined) this.index = index;
        };
        
        $this.fetch = function() {
            var cmd = this.commands[this.index++];
            
            if (cmd === undefined) {
                return { type: EOM };
            }
            
            var value = cmd.length;
            
            if (cmd.type === STATUS) {
                switch (cmd.name) {
                case ">":
                    if (this.octave > 0) this.octave -= 1;
                    break;
                case "<":
                    if (this.octave < 9) this.octave += 1;
                    break;
                case "l":
                    if (0 <= value && value <= 1920) {
                        this.length = value;
                        this.dot    = cmd.dot;
                    }
                    break;
                case "o":
                    if (0 <= value && value <= 9) {
                        this.octave = value;
                    }
                    break;
                case "k":
                    if (0 <= value && value <= 8192) {
                        if (cmd.sign === "-") {
                            this.detune = -value;
                        } else {
                            this.detune = +value;
                        }
                    }
                    break;
                case "q":
                    if (0 <= value && value <= 8) {
                        this.quantize = value;
                    }
                    break;
                case "v":
                    if (0 <= value && value <= 128) {
                        this.volume = cmd.length;
                    }
                    break;
                case "t":
                    if (1 <= value && value <= 511) {
                        this.parent._.bpm = value;
                        timbre.fn.doEvent(this.parent, "bpm", [value]);
                    }
                    break;
                }
                cmd = this.fetch();
                
            } else if (cmd.type === CONTROL) {
                
                var loopStack = this.loopStack;
                
                switch (cmd.name) {
                case "[": // loop begin
                    if (value === undefined) value = 2;
                    loopStack.push({
                        count:value, begin:this.index, end:null
                    });
                    break;
                    
                case "]": // loop end
                    if (loopStack.length !== 0) {
                        var stackTop = loopStack[loopStack.length - 1];
                        if (stackTop.end === null) {
                            stackTop.end = this.index;
                            if (typeof value === "number") {
                                stackTop.count = value|0;
                            }
                        }
                        if (stackTop.count <= 1) {
                            loopStack.pop();
                        } else {
                            --stackTop.count;
                            this.index = stackTop.begin;
                        }
                    }
                    break;
                    
                case "|": // loop exit
                    if (loopStack.length !== 0) {
                        var stackTop = loopStack[loopStack.length - 1];
                        if (stackTop.count <= 1) {
                            this.index = stackTop.end;
                            loopStack.pop();
                        }
                    } else {
                        return { type: EOM };
                    }
                    break;
                }
                cmd = this.fetch();
            }
            
            return cmd;
        };
        
        return MMLTrack;
    }