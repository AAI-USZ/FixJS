function(rowNumber) {
        this.currentRow = rowNumber;
        this.currentFrame = 0;
        this.doBreak = false;
        this.breakPos = 0;
        this.breakRow = 0;

        for (var chan = 0; chan < this.channelCount; chan++) {
            var channel = this.channels[chan];
            var prevNote = channel.prevNote;
            var note = this.currentPattern[this.currentRow][chan];
            if (channel.sampleNum == undefined) {
                    channel.sampleNum = 0;
            }
            if (note.period != 0 || note.sample != 0) {
                channel.playing = true;
                channel.samplePosition = 0;
                channel.ticksSinceStartOfSample = 0; /* that's 'sample' as in 'individual volume reading' */
                if (note.sample != 0) {
                    channel.sample = this.samples[note.sample - 1];
                    channel.sampleNum = note.sample - 1;
                    channel.volume = channel.sample.volume;
                    channel.finetune = channel.sample.finetune;
                }
                if (note.period != 0) { // && note.effect != 0x03
                    //the note specified in a tone porta command is not actually played
                    if (note.effect != 0x03) {
                        channel.noteNumber = MODDecoder.modPeriodToNoteNumber[note.period];
                        channel.ticksPerSample = MODDecoder.modPeriodTable[channel.finetune][channel.noteNumber] * 2;
                    } else {
                        channel.noteNumber = MODDecoder.modPeriodToNoteNumber[prevNote.period]
                        channel.ticksPerSample = MODDecoder.modPeriodTable[channel.finetune][channel.noteNumber] * 2;
                    }
                }
            }
            channel.finePeriodDelta = 0;
            channel.fineVolumeDelta = 0;
            channel.cut = false;
            channel.delay = false;
            channel.retrigger = false;
            channel.tonePortaActive = false;
            if (note.effect != 0 || note.effectParameter != 0) {
                channel.volumeDelta = 0; /* new effects cancel volumeDelta */
                channel.periodDelta = 0; /* new effects cancel periodDelta */
                channel.arpeggioActive = false;
                switch (note.effect) {
                    case 0x00: /* arpeggio: 0xy */
                        channel.arpeggioActive = true;
                        channel.arpeggioNotes = [
                            channel.noteNumber,
                            channel.noteNumber + (note.effectParameter >> 4),
                            channel.noteNumber + (note.effectParameter & 0x0f)
                        ]
                        channel.arpeggioCounter = 0;
                        break;
                    case 0x01: /* pitch slide up - 1xx */
                        channel.periodDelta = -note.effectParameter;
                        break;
                    case 0x02: /* pitch slide down - 2xx */
                        channel.periodDelta = note.effectParameter;
                        break;
                    case 0x03: /* slide to note 3xy - */
                        channel.tonePortaActive = true;
                        channel.tonePortaTarget = (note.period != 0) ? note.period : channel.tonePortaTarget;
                        var dir = (channel.tonePortaTarget < prevNote.period) ? -1 : 1;
                        channel.tonePortaDelta = (note.effectParameter * dir);
                        channel.tonePortaVolStep = (note.effectParameter * dir);
                        channel.tonePortaDir = dir;
                        break;
                    case 0x05: /* portamento to note with volume slide 5xy */
                        channel.tonePortaActive = true;
                        if (note.effectParameter & 0xf0) {
                            channel.volumeDelta = note.effectParameter >> 4;
                        } else {
                            channel.volumeDelta = -note.effectParameter;
                        }
                        channel.tonePortaDelta = channel.tonePortaVolStep;
                        break;
                    case 0x09: /* sample offset - 9xx */
                        channel.samplePosition = 256 * note.effectParameter;
                        break;
                    case 0x0A: /* volume slide - Axy */
                        if (note.effectParameter & 0xf0) {
                            /* volume increase by x */
                            channel.volumeDelta = note.effectParameter >> 4;
                        } else {
                            /* volume decrease by y */
                            channel.volumeDelta = -note.effectParameter;
                        }
                        break;
                    case 0x0B: /* jump to order */
                        doBreak = true;
                        breakPos = note.effectParameter;
                        breakRow = 0;
                        break;
                    case 0x0C: /* volume */
                        if (note.effectParameter > 64) {
                            channel.volume = 64;
                        } else {
                            channel.volume = note.effectParameter;
                        }
                        break;
                    case 0x0D: /* pattern break; jump to next pattern at specified row */
                        doBreak = true;
                        breakPos = this.currentPosition + 1;
                        //Row is written as DECIMAL so grab the high part as a single digit and do some math
                        breakRow = ((note.effectParameter & 0xF0) >> 4) * 10 + (note.effectParameter & 0x0F);
                        break;

                    case 0x0E:
                        switch (note.extEffect) {    //yes we're doing nested switch
                            case 0x01: /* fine pitch slide up - E1x */
                                channel.finePeriodDelta = -note.extEffectParameter;
                                break;
                            case 0x02: /* fine pitch slide down - E2x */
                                channel.finePeriodDelta = note.extEffectParameter;
                                break;
                            case 0x05: /* set finetune - E5x */
                                channel.finetune = note.extEffectParameter;
                                break;
                            case 0x09: /* retrigger sample - E9x */
                                channel.retrigger = note.extEffectParameter;
                                break;
                            case 0x0A: /* fine volume slide up - EAx */
                                channel.fineVolumeDelta = note.extEffectParameter;
                                break;
                            case 0x0B: /* fine volume slide down - EBx */
                                channel.fineVolumeDelta = -note.extEffectParameter;
                                break;
                            case 0x0C: /* note cute - ECx */
                                channel.cut = note.extEffectParameter;
                                break;
                            case 0x0D: /* note delay - EDx */
                                channel.delay = note.extEffectParameter;
                                break;
                            case 0x0E: /* pattern delay EEx */
                                delayRows = note.extEffectParameter;
                                break;
                            case 0x06:
                                //set loop start with E60
                                if (note.extEffectParameter == 0) {
                                    this.exLoopStart = this.currentRow;
                                } else {
                                    //set loop end with E6x
                                    this.exLoopEnd = this.currentRow;
                                    //activate the loop only if it's new
                                    if (!this.exLoop) {
                                        this.exLoop = true;
                                        this.exLoopCount = note.extEffectParameter;
                                    }
                                }
                                break;
                        }

                        break;

                    case 0x0F: /* tempo change. <=32 sets ticks/row, greater sets beats/min instead */
                        var newSpeed = (note.effectParameter == 0) ? 1 : note.effectParameter; /* 0 is treated as 1 */
                        if (newSpeed <= 32) {
                            framesPerRow = newSpeed;
                        } else {
                            this.setBpm(newSpeed);
                        }
                        break;
                }
            }

            //for figuring out tone portamento effect
            if (note.period != 0) { channel.prevNote = note; }
            // FIXME: channel.prevNote isn't always defined before it's needed. See Ode to Protracker.

            if (channel.tonePortaActive == false) {
                channel.tonePortaDelta = 0;
                channel.tonePortaTarget = 0;
                channel.tonePortaVolStep = 0;
            }
        }
    }