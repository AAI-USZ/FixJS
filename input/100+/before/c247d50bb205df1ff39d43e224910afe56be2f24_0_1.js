function() {
    console.log('hello')
    window.ary = new Uint8Array(wav)
    window.sample = parseWav(ary)
    window.samples = sample.samples
    var before = JSON.stringify(sample.samples)
    FS = sample.sampleRate
    _instantiateAutotalentInstance(FS)
    _initializeAutotalent(CONCERT_A, KEY, FIXED_PITCH, FIXED_PULL, CORR_STR, CORR_SMOOTH, PITCH_SHIFT, SCALE_ROTATE, LFO_DEPTH, LFO_RATE, LFO_SHAPE, LFO_SYMM, LFO_QUANT, FORM_CORR, FORM_WARP, MIX)
    _processSamples(samples, samples.length)
    var after = JSON.stringify(samples)
    console.log("EQUAL:", (before === after))
    playHTMLAudioElement(ary)
  }