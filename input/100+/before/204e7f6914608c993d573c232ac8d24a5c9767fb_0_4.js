function() {
        var _ = this._;
        
        var cmd = _.commands[_.index++];
        if (cmd === undefined) {
            return { type: EOM };
        }
        var value = cmd.length;
        
        if (cmd.type === STATUS) {
            switch (cmd.name) {
            case ">":
                if (_.octave > 0) _.octave -= 1;
                break;
            case "<":
                if (_.octave < 9) _.octave += 1;
                break;
            case "l":
                if (0 <= value && value <= 1920) {
                    _.length = value;
                    _.dot    = cmd.dot;
                }
                break;
            case "o":
                if (0 <= value && value <= 9) {
                    _.octave = value;
                }
                break;
            case "k":
                if (0 <= value && value <= 8192) {
                    if (cmd.sign === "-") {
                        _.detune = -value;
                    } else {
                        _.detune = +value;
                    }
                }
                break;
            case "q":
                if (0 <= value && value <= 8) {
                    _.quantize = value;
                }
                break;
            case "v":
                if (0 <= value && value <= 128) {
                    _.volume = cmd.length;
                }
                break;
            case "t":
                if (1 <= value && value <= 511) {
                    _.bpm = value;
                    timbre.fn.doEvent(this, "bpm", [value]);
                }
                break;
            }
            cmd = fetch.call(this);
        } else if (cmd.type === CONTROL) {
            var loopStack = _.loopStack;
            
            switch (cmd.name) {
            case "[": // loop begin
                if (value === undefined) value = 2;
                loopStack.push({
                    count:value, begin:_.index, end:null
                });
                break;
                
            case "]": // loop end
                if (loopStack.length !== 0) {
                    var stackTop = loopStack[loopStack.length - 1];
                    if (stackTop.end === null) {
                        stackTop.end = _.index;
                        if (typeof value === "number") {
                            stackTop.count = value|0;
                        }
                    }
                    if (stackTop.count <= 1) {
                        loopStack.pop();
                    } else {
                        --stackTop.count;
                        _.index = stackTop.begin;
                    }
                }
                break;
                
            case "|": // loop exit
                if (loopStack.length !== 0) {
                    var stackTop = loopStack[loopStack.length - 1];
                    if (stackTop.count <= 1) {
                        _.index = stackTop.end;
                        loopStack.pop();
                    }
                }
                break;
                
            case "$": // infinite loop
                if (value === undefined) value = 0;
                _.segnoIndex[value] = _.index;
                break;
            }
            cmd = fetch.call(this);
        }
        
        return cmd;
    }