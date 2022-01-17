function() {
        var val = decisionCalls.value;
        if (val) {
            var dec = traceDecision(val.substring(0, val.indexOf('-')));
            var call = dec.calls[parseInt(val.substring(val.indexOf('-')+1, val.length))];

          if (call.call.indexOf("(default)") !== 0) {
                callInput.style.color='#000000';
                callInput.textContent = call.input;
                if (call.output != null) {
                    callOutput.style.color = '#000000';
                    callOutput.textContent = call.output;
                } else {
                  if(call.exception !== null){
                    callOutput.style.color = '#ff0000';
                    callOutput.textContent = 'Exception raised!\n\n' + call.exception['class'] + ': ' +
                      call.exception.message + '\n  ' + call.exception.backtrace.split('\n').join('\n  ');
                  }
                }
            } else {
                callInput.style.color='#999999';
                callInput.textContent = call.call.replace('(default)', '') + " was not overridden by the resource";
                callOutput.textContent = '';
            }
        } else {
            callInput.textContent = '';
            callOutput.textContent = '';
        }
    }