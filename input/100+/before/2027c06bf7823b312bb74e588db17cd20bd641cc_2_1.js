function ArgumentsProcessor(args) {
  this.args_ = args;
  this.result_ = ArgumentsProcessor.DEFAULTS;

  this.argsDispatch_ = {
    '-j': ['stateFilter', TickProcessor.VmStates.JS,
        'Show only ticks from JS VM state'],
    '-g': ['stateFilter', TickProcessor.VmStates.GC,
        'Show only ticks from GC VM state'],
    '-c': ['stateFilter', TickProcessor.VmStates.COMPILER,
        'Show only ticks from COMPILER VM state'],
    '-o': ['stateFilter', TickProcessor.VmStates.OTHER,
        'Show only ticks from OTHER VM state'],
    '-e': ['stateFilter', TickProcessor.VmStates.EXTERNAL,
        'Show only ticks from EXTERNAL VM state'],
    '--call-graph-size': ['callGraphSize', TickProcessor.CALL_GRAPH_SIZE,
        'Set the call graph size'],
    '--ignore-unknown': ['ignoreUnknown', true,
        'Exclude ticks of unknown code entries from processing'],
    '--separate-ic': ['separateIc', true,
        'Separate IC entries'],
    '--unix': ['platform', 'unix',
        'Specify that we are running on *nix platform'],
    '--windows': ['platform', 'windows',
        'Specify that we are running on Windows platform'],
    '--mac': ['platform', 'mac',
        'Specify that we are running on Mac OS X platform'],
    '--nm': ['nm', 'nm',
        'Specify the \'nm\' executable to use (e.g. --nm=/my_dir/nm)'],
    '--snapshot-log': ['snapshotLogFileName', 'snapshot.log',
        'Specify snapshot log file to use (e.g. --snapshot-log=snapshot.log)']
  };
  this.argsDispatch_['--js'] = this.argsDispatch_['-j'];
  this.argsDispatch_['--gc'] = this.argsDispatch_['-g'];
  this.argsDispatch_['--compiler'] = this.argsDispatch_['-c'];
  this.argsDispatch_['--other'] = this.argsDispatch_['-o'];
  this.argsDispatch_['--external'] = this.argsDispatch_['-e'];
}