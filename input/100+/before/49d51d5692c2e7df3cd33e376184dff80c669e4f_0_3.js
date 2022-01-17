function(dec) {
        decisionId.value = dec.d;

        var calls = [];
        for (var i = 0; i < dec.calls.length; i++) {
            calls.push('<option value="'+dec.d+'-'+i+'">');
            calls.push(dec.calls[i].module+':'+dec.calls[i]['function']);
            calls.push('</option>');
        }
        decisionCalls.innerHTML = calls.join('');
        decisionCalls.selectedIndex = 0;

        decisionCalls.onchange();
    }