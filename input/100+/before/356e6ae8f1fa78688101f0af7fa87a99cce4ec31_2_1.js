function(Pd){


/************************** Basic objects ******************************/

    Pd.objects = {
	// null placeholder object for objects which don't exist
        'null': {},
        'cnv': {}
    };

    Pd.objects['loadbang'] = Pd.Object.extend({

        outletTypes: ['outlet'],

        load: function() {
            this.outlets[0].message('bang');
        }

    });

    Pd.objects['print'] = Pd.Object.extend({

		inletTypes: ['inlet'],

        init: function(printName) {
            this.printName = (printName || 'print');
        },

        message: function(inletId) {
            var msg = Array.prototype.slice.call(arguments, 1);
            Pd.log(this.printName + ': ' + msg.join(' '));
        }

    });

    Pd.objects['table'] = Pd.Object.extend({

        init: function(name, size) {
            this.name = name || null;
            this.size = size;
            this.data = new Pd.arrayType(size);
        }

    });

    Pd.objects['message'] = Pd.Object.extend({

        inletTypes: ['inlet'],
        outletTypes: ['outlet'],

        init: function() {
            this.setFilterMsg(Array.prototype.slice.call(arguments));
        },

        // Sets the message template, with constant values or $-vars that
        // will be replaced when a message is received.
        setFilterMsg: function(filterMsg) {
            if (!Pd.isArray(filterMsg)) filterMsg = [filterMsg];
            this.filterMsg = filterMsg;
            this.filter = Pd.makeMsgFilter(filterMsg);
        },

		message: function(inletId) {
			if (inletId === 0) {
                var msg = Array.prototype.slice.call(arguments, 1);
                var filtered;
                if (!Pd.isArray(msg)) msg = [msg];

                // Do the filtering of input message :
                // if a 'bang' is received $-vars don't work
                if (msg.length == 1 && msg[0] == 'bang') filtered = this.filter([]);
                else filtered = this.filter(msg);

                // outputs the filtered message
                var outlet = this.outlets[0]; 
                outlet.message.apply(outlet, filtered);
            }
		}

    });

/************************** DSP objects ******************************/
	
	// basic oscillator
	Pd.objects['osc~'] = Pd.Object.extend({

		inletTypes: ['inlet~', 'inlet'],
		outletTypes: ['outlet~'],

		init: function(freq) {
            this.setFreq(freq || 0);
			this.phase = 0;
            this.dspTick = this.dspTickConstFreq;
            this.on('inletConnect', this._onInletConnect, this);
            this.on('inletDisconnect', this._onInletDisconnect, this);
		},

        load: function() {
			this.setFreq(this.freq);
            // TODO: this needs to be recalculated on sampleRate change
            this.J = 2 * Math.PI / this.patch.sampleRate;
        },

        // Sets the frequency for the constant frequency dspTick method.
        setFreq: function(freq) {
            this.freq = freq;
            // TODO: this needs to be recalculated on sampleRate change
            if (this.patch) this.K = 2 * Math.PI * this.freq / this.patch.sampleRate;
        },

        // Calculates the cos taking the frequency from dsp inlet
		dspTickVariableFreq: function() {
            var inBuff = this.inlets[0].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
            var J = this.J;

		    for (var i=0; i<outBuff.length; i++) {
                this.phase += J * inBuff[i];
			    outBuff[i] = Math.cos(this.phase);
		    }
		},

        // Calculates the cos with a constant frequency from first inlet
        dspTickConstFreq: function() {
            var outBuff = this.outlets[0].getBuffer();
            var K = this.K;

		    for (var i=0; i<outBuff.length; i++) {
                this.phase += K;
			    outBuff[i] = Math.cos(this.phase);
		    }
        },

        // TODO : reset phase takes float and no bang
		message: function(inletId, msg) {
			if (inletId === 0) {
                this.assertIsNumber(msg, 'frequency must be a number');
                this.setFreq(msg);
            } else if (inletId === 1 && msg === 'bang') this.phase = 0;
		},

        // On inlet connection, we change dspTick method if appropriate
        _onInletConnect: function() {
            if (this.inlets[0].hasDspSources()) {
                this.dspTick = this.dspTickVariableFreq;
            }
        },

        // On inlet disconnection, we change dspTick method if appropriate
        _onInletDisconnect: function() {
            if (!this.inlets[0].hasDspSources()) {
                this.dspTick = this.dspTickConstFreq;
            }
        }

	});


	// digital to analogue converter (sound output)
	Pd.objects['dac~'] = Pd.Object.extend({

		endPoint: true,
		inletTypes: ['inlet~', 'inlet~'],

		dspTick: function() {
			var inBuff1 = this.inlets[0].getBuffer();
			var inBuff2 = this.inlets[1].getBuffer();
            var output = this.patch.output;
			// copy interleaved data from inlets to the graph's output buffer
			for (var i=0; i<output.length; i++) {
				output[i * 2] += inBuff1[i];
				output[i * 2 + 1] += inBuff2[i];
			}
		}
	});


	// creates simple dsp lines
	Pd.objects['line~'] = Pd.Object.extend({

		inletTypes: ['inlet'],
		outletTypes: ['outlet~'],

		init: function() {
			// what the value was at the start of the line
			this.y0 = 0;
			// the destination value we are aiming for
			this.y1 = 0;
            // this stores the current index 
            this.n = 0;
			// this stores the index max the line must reach
			this.nMax = 0;
			// we want to use the dsptick method that returns a constant value for now
			this.toDspConst(this.y0);
		},

		// write a constant value to our output buffer for every sample
		dspTickConst: function() {
            var outBuff = this.outlets[0].getBuffer();
			for (var i=0; i<outBuff.length; i++) outBuff[i] = this.y0;
		},

		// write this correct value of the line at each sample
		dspTickLine: function() {
            var outBuff = this.outlets[0].getBuffer();
            var outBuffLength = outBuff.length;
            var slope = this.slope;
			for (var i=0; i<outBuffLength; i++, this.n++) {
				// if we've reached the end of our line, we fill-in the rest of the buffer,
                // break, and switch back to the constant method.
				if (this.n >= this.nMax) {
                    for (var j=i; j<outBuffLength; j++) outBuff[j] = this.y1;
                    this.toDspConst(this.y1);
                    this.trigger('end');
                    break;
				} else {
					outBuff[i] = this.n * slope + this.y0;
				}
			}
		},

		message: function(inletId, y1, duration) {
			if (inletId === 0) {
				// if this is a single valued message we want line~ to output a constant value,
                // otherwise the message is taken as [targetY duration(
                this.assertIsNumber(y1, 'invalid value ' + y1);
				if (duration != undefined) {
                    this.assertIsNumber(duration, 'invalid duration ' + duration);
					this.toDspLine(y1, duration)
				} else {
					this.toDspConst(y1);
				}
			}
		},

        toDspConst: function(val) {
            this.y0 = val;
			this.dspTick = this.dspTickConst;
        },

        toDspLine: function(val, duration) {
			this.y1 = val;
            this.n = 0;
			this.nMax = duration * this.patch.sampleRate / 1000;
            this.slope = (this.y1 - this.y0) / this.nMax;
			this.dspTick = this.dspTickLine;
        }
	});	


/************************** DSP arithmetics ******************************/

    var DSPArithmBase = Pd.Object.extend({

		inletTypes: ['inlet~', 'inlet~'],
		outletTypes: ['outlet~'],

		init: function(val) {
			this.val = (val || 0);
            this.dspTick = this.dspTickConstant;
            this.on('inletConnect', this._onInletConnect, this);
            this.on('inletDisconnect', this._onInletDisconnect, this);
		},

        message: function(inletId, val) {
            if (inletId === 1) {
                this.assertIsNumber(val, 'invalid constant value ' + val);
                this.val = val;
            } 
        },

        // This is the dspTick method used when there is a dsp connection in inlet 1
        dspTickVariable: Pd.notImplemented,

        // This is the dspTick method used when there is NO dsp connection in inlet 1
        dspTickConstant: Pd.notImplemented,

        // On inlet connection, we change dspTick method if appropriate
        _onInletConnect: function() {
            if (this.inlets[1].hasDspSources()) {
                this.dspTick = this.dspTickVariable;
            }
        },

        // On inlet disconnection, we change dspTick method if appropriate
        _onInletDisconnect: function() {
            if (!this.inlets[1].hasDspSources()) {
                this.dspTick = this.dspTickConstant;
            }
        }
    });


	// dsp multiply object
	Pd.objects['*~'] = DSPArithmBase.extend({

        dspTickVariable: function() {
            var inBuff1 = this.inlets[0].getBuffer();
            var inBuff2 = this.inlets[1].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
		    for (var i=0; i < outBuff.length; i++) {
			    outBuff[i] = inBuff1[i] * inBuff2[i];
		    }
        },

        dspTickConstant: function() {
            var inBuff1 = this.inlets[0].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
            var val = this.val;
		    for (var i=0; i < outBuff.length; i++) {
			    outBuff[i] = inBuff1[i] * val;
		    }
        }

	});


	// dsp divide object (d_arithmetic.c line 454 - over_perform() )
	Pd.objects['/~'] = DSPArithmBase.extend({

        dspTickVariable: function() {
            var inBuff1 = this.inlets[0].getBuffer();
            var inBuff2 = this.inlets[1].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
            var val2;
		    for (var i=0; i < outBuff.length; i++) {
                val2 = inBuff2[i];
			    outBuff[i] = (val2 ? inBuff1[i] / val2 : 0);
		    }
        },

        dspTickConstant: function() {
            var inBuff1 = this.inlets[0].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
            var val = this.val;
		    for (var i=0; i < outBuff.length; i++) {
			    outBuff[i] = (val ? inBuff1[i] / val : 0);
		    }
        }

	});
	

	// dsp addition object
	Pd.objects['+~'] = DSPArithmBase.extend({

        dspTickVariable: function() {
            var inBuff1 = this.inlets[0].getBuffer();
            var inBuff2 = this.inlets[1].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
		    for (var i=0; i < outBuff.length; i++) {
			    outBuff[i] = inBuff1[i] + inBuff2[i];
		    }
        },

        dspTickConstant: function() {
            var inBuff1 = this.inlets[0].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
            var val = this.val;
		    for (var i=0; i < outBuff.length; i++) {
			    outBuff[i] = inBuff1[i] + val;
		    }
        }

	});


	// dsp substraction object
	Pd.objects['-~'] = DSPArithmBase.extend({

        dspTickVariable: function() {
            var inBuff1 = this.inlets[0].getBuffer();
            var inBuff2 = this.inlets[1].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
		    for (var i=0; i < outBuff.length; i++) {
			    outBuff[i] = inBuff1[i] - inBuff2[i];
		    }
        },

        dspTickConstant: function() {
            var inBuff1 = this.inlets[0].getBuffer();
            var outBuff = this.outlets[0].getBuffer();
            var val = this.val;
		    for (var i=0; i < outBuff.length; i++) {
			    outBuff[i] = inBuff1[i] - val;
		    }
        }

	});

/************************** DSP tables ******************************/

    // Baseclass for tabwrite~, tabread~ and others ...
    var DSPTabBase = Pd.Object.extend({

        init: function(tableName) {
            this.tableName = tableName;
            this.table = null;
        },

        load: function() {
            this.setTableName(this.tableName);
        },

        setTableName: function(name) {
            this.tableName = name;
            if (this.patch) {
                var table = this.patch.getTableByName(name);
                if (!table) throw (new Error('table with name ' + name + ' doesn\'t exist'));
                this.table = table;
                this.tableChanged();
            }
        },

        // Hook for when a table was successfully loaded or changed
        tableChanged: function() {}
    });


    // read data from a table with no interpolation
    Pd.objects['tabread~'] = DSPTabBase.extend({

        inletTypes: ['inlet~'],
        outletTypes: ['outlet~'],

        init: function(tableName) {
            DSPTabBase.prototype.init.call(this, tableName);
            this.toDspTickZeros();
        },

        dspTickReading: function() {
            var outBuff = this.outlets[0].getBuffer();
            var inBuff = this.inlets[0].getBuffer();
            var tableMax = this.table.size - 1;
            var tableData = this.table.data;
            var s;
            // cf. pd : Incoming values are truncated to the next lower integer,
            // and values out of bounds get the nearest (first or last) point.
            for (var i=0; i<outBuff.length; i++) {
                s = Math.floor(inBuff[i]);
                outBuff[i] = tableData[(s >= 0 ? (s > tableMax ? tableMax : s) : 0)];
            }
        },

        tableChanged: function() {
            this.dspTick = this.dspTickReading;
        },

        message: function(inletId, method, arg) {
			if (inletId === 0) {
                if (method == 'set') this.setTableName(arg);
            }
        }
    });


    // play data from a table with no interpolation
    Pd.objects['tabplay~'] = DSPTabBase.extend({

        inletTypes: ['inlet'],
        outletTypes: ['outlet~'],

        init: function(tableName) {
            DSPTabBase.prototype.init.call(this, tableName);
            this.pos = 0;
            this.posMax = 0;        // the position after the last position to be read
            this.toDspTickZeros();
        },

        dspTickReading: function() {
            var outBuff = this.outlets[0].getBuffer();
            var iMax = Math.min(outBuff.length, this.posMax - this.pos); // +1 cause comparing length to position
            for (var i=0; i<iMax; i++, this.pos++) {
                outBuff[i] = this.table.data[this.pos];
            }
            // If we've reached the last position, that's it
            if (this.pos == this.posMax) {
                for (var j=i; j<outBuff.length; j++) outBuff[j] = 0;
                this.toDspTickZeros();
                this.trigger('end');
            }
        },

        message: function(inletId, arg1, arg2) {
			if (inletId === 0) {
                if (arg1 == 'set') {
                    this.setTableName(arg2);
                    this.toDspTickZeros();
                } else if (arg1 == 'bang') {
                    this.toDspTickReading(0);
                } else if (arg1 != undefined) {
                    this.assertIsNumber(arg1, 'not a valid start position ' + arg1);
                    if (arg2 != undefined) {
                        this.assertIsNumber(arg2, 'not a valid sample number ' + arg2);
                        this.toDspTickReading(arg1, arg2);
                    } else {
                        this.toDspTickReading(arg1);
                    }
                }
            }
        },

        toDspTickReading: function(startPos, sampleNum) {
            if (startPos >= this.table.size - 1) return;
            sampleNum = sampleNum || (this.table.size - startPos);
            this.pos = startPos;
            this.posMax = Math.min(startPos + sampleNum, this.table.size);
            this.dspTick = this.dspTickReading;
        }

    });


    // read data from a table with no interpolation
    Pd.objects['tabwrite~'] = DSPTabBase.extend({

        inletTypes: ['inlet~'],
        endPoint: true,

        init: function(tableName) {
            DSPTabBase.prototype.init.call(this, tableName);
            this.pos = 0;
            this.toDspTickNoOp();
        },

        dspTickWriting: function() {
            var inBuff = this.inlets[0].getBuffer();
            var iMax = Math.min(inBuff.length, this.table.size - this.pos);
            for (var i=0; i<iMax; i++, this.pos++) {
                this.table.data[this.pos] = inBuff[i];
            }
            // If we reached table size, that's it
            if (this.pos == this.table.size) {
                this.toDspTickNoOp();
                this.trigger('end');
            }
        },

        message: function(inletId, command, arg) {
			if (inletId === 0) {
                if (command == 'bang') {
                    this.toDspTickWriting(0);
                } else if (command == 'stop') {
                    this.toDspTickNoOp();
                } else if (command == 'set') {
                    this.setTableName(arg);
                    this.toDspTickNoOp();
                } else if (command == 'start') {
                    var pos = 0;
                    if (arg != undefined) {
                        this.assertIsNumber(arg, 'invalid start position ' + arg);
                        pos = Math.floor(arg);
                    }
                    this.toDspTickWriting(pos);
                }
            }
        },

        toDspTickWriting: function(start) { 
            this.dspTick = this.dspTickWriting;
            this.pos = start;
        }
    });


/************************** Misc non-DSP ******************************/

	//convert midi notes to frequency
	Pd.objects['mtof'] = Pd.Object.extend({

		inletTypes: ['inlet'],
		outletTypes: ['outlet'],
        maxMidiNote: 8.17579891564 * Math.exp(.0577622650 * 1499),

        // TODO: round output ?
		message: function(inletId, note) {
            if (inletId === 0) {
                this.assertIsNumber(note, 'invalid midi note ' + note);
			    var out = 0;
			    if (note <= -1500) out = 0;
                else if (note > 1499) out = this.maxMidiNote;
			    else out = 8.17579891564 * Math.exp(.0577622650 * note);
			    this.outlets[0].message(out);
            }
		}
	});


    // Let each object know of what type it is
    var proto;
    for (type in Pd.objects) {
        if (proto = Pd.objects[type].prototype) proto.type = type;
    }

}