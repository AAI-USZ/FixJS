function TickProcessor(
    cppEntriesProvider, separateIc, ignoreUnknown, stateFilter, snapshotLogProcessor) {
  devtools.profiler.LogReader.call(this, {
      'shared-library': { parsers: [null, parseInt, parseInt],
          processor: this.processSharedLibrary },
      'code-creation': {
          parsers: [null, this.createAddressParser('code'), parseInt, null],
          processor: this.processCodeCreation, backrefs: true },
      'code-move': { parsers: [this.createAddressParser('code'),
          this.createAddressParser('code-move-to')],
          processor: this.processCodeMove, backrefs: true },
      'code-delete': { parsers: [this.createAddressParser('code')],
          processor: this.processCodeDelete, backrefs: true },
      'function-creation': { parsers: [this.createAddressParser('code'),
          this.createAddressParser('function-obj')],
          processor: this.processFunctionCreation, backrefs: true },
      'function-move': { parsers: [this.createAddressParser('code'),
          this.createAddressParser('code-move-to')],
          processor: this.processFunctionMove, backrefs: true },
      'function-delete': { parsers: [this.createAddressParser('code')],
          processor: this.processFunctionDelete, backrefs: true },
      'snapshot-pos': { parsers: [this.createAddressParser('code'), parseInt],
          processor: this.processSnapshotPosition, backrefs: true },
      'tick': { parsers: [this.createAddressParser('code'),
          this.createAddressParser('stack'),
          this.createAddressParser('func'), parseInt, 'var-args'],
          processor: this.processTick, backrefs: true },
      'heap-sample-begin': { parsers: [null, null, parseInt],
          processor: this.processHeapSampleBegin },
      'heap-sample-end': { parsers: [null, null],
          processor: this.processHeapSampleEnd },
      'heap-js-prod-item': { parsers: [null, 'var-args'],
          processor: this.processJSProducer, backrefs: true },
      // Ignored events.
      'profiler': null,
      'heap-sample-stats': null,
      'heap-sample-item': null,
      'heap-js-cons-item': null,
      'heap-js-ret-item': null,
      // Obsolete row types.
      'code-allocate': null,
      'begin-code-region': null,
      'end-code-region': null });

  this.cppEntriesProvider_ = cppEntriesProvider;
  this.ignoreUnknown_ = ignoreUnknown;
  this.stateFilter_ = stateFilter;
  this.snapshotLogProcessor_ = snapshotLogProcessor;
  this.deserializedEntriesNames_ = [];
  var ticks = this.ticks_ =
    { total: 0, unaccounted: 0, excluded: 0, gc: 0 };

  Profile.prototype.handleUnknownCode = function(
      operation, addr, opt_stackPos) {
    var op = devtools.profiler.Profile.Operation;
    switch (operation) {
      case op.MOVE:
        print('Code move event for unknown code: 0x' + addr.toString(16));
        break;
      case op.DELETE:
        print('Code delete event for unknown code: 0x' + addr.toString(16));
        break;
      case op.TICK:
        // Only unknown PCs (the first frame) are reported as unaccounted,
        // otherwise tick balance will be corrupted (this behavior is compatible
        // with the original tickprocessor.py script.)
        if (opt_stackPos == 0) {
          ticks.unaccounted++;
        }
        break;
    }
  };

  this.profile_ = new Profile(separateIc);
  this.codeTypes_ = {};
  // Count each tick as a time unit.
  this.viewBuilder_ = new devtools.profiler.ViewBuilder(1);
  this.lastLogFileName_ = null;

  this.generation_ = 1;
  this.currentProducerProfile_ = null;
}