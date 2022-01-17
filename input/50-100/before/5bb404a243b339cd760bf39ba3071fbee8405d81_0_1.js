function (opts, callback) {
  opts.stream = new PortAudioStream();
  opts.stream.buffer = new Buffer(1 * 1024 * 1024); // 1MB
  opts.channelCount = opts.channelCount || 2;
  opts.sampleFormat = opts.sampleFormat || portAudio.SampleFormat8Bit;
  opts.sampleRate = opts.sampleRate || 44100;
  portAudioBindings.open(opts, callback);
}