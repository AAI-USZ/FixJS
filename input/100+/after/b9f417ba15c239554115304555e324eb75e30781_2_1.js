function (data) {
  this.data = data;

  // Add output structure to data.
  data.beat = {
    permanence: 0,
    confidence: 0,
    missed: false,
    predicted: false,
    maybe: false,
    is: false,
    was: 0,
    bpm: 0//,
  };

  //this.initDebug();

  // Sample buffers
  this.n = 512;
  this.history = [[],[],[]];
  this.buffer = new Float32Array(this.n);
  this.spectrum = new Float32Array(this.n);
  this.fft = new FFT(this.n, 44100);
  this.sample = 0;
  this.energy = 0;
  this.background = 0;
  this.last = 0;
  this.measure = 0;
  this.debounceMaybe = 0;
  this.debouncePredict = 0;
  this.missed = 3;
  this.decay = 0;

  // Acceptable range 50-300 bpm
  this.fMin = Math.floor(this.bpmToOffset(50));
  this.fMax = Math.ceil(this.bpmToOffset(400));

  // Histogram of autocorrelation peaks seen
  this.histogram = {};
  this.histogramSorted = [];
  this.beat = null;
}