function setComplete(exitcode) {
      setClass(exitcode === 0 ? 'complete' : 'failed');
      removeInput();
      removeVTOutput();
    }