function() {
        var val = decisionCalls.value;
        if (val) {
            var dec = traceDecision(val.substring(0, val.indexOf('-')));
            var call = dec.calls[parseInt(val.substring(val.indexOf('-')+1, val.length))];

            if (call.output != "wmtrace_not_exported") {
                callInput.style.color='#000000';
                callInput.innerHTML = call.input;
                if (call.output != null) {
                    callOutput.style.color = '#000000';
                    callOutput.innerHTML = call.output;
                } else {
                    callOutput.style.color = '#ff0000';
                    callOutput.textContent = 'Error: '+call.module+':'+call['function']+' never returned';
                }
            } else {
                callInput.style.color='#999999';
                callInput.textContent = call.module+':'+call['function']+' was not exported';
                callOutput.textContent = '';
            }
        } else {
            callInput.textContent = '';
            callOutput.textContent = '';
        }
    }