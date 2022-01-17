function initDetailPanels() {
    var windowWidth = document.getElementById('sizetest').clientWidth;
    var infoPanel = document.getElementById('infopanel');
    var panelWidth = windowWidth-infoPanel.offsetLeft;

    var panels = {
        'request': document.getElementById('requestdetail'),
        'response': document.getElementById('responsedetail'),
        'decision': document.getElementById('decisiondetail')
    };

    var tabs = {
        'request': document.getElementById('requesttab'),
        'response': document.getElementById('responsetab'),
        'decision': document.getElementById('decisiontab')
    };

    var decisionId = document.getElementById('decisionid');
    var decisionCalls = document.getElementById('decisioncalls');
    var callInput = document.getElementById('callinput');
    var callOutput = document.getElementById('calloutput');

    var lastUsedPanelWidth = windowWidth-infoPanel.offsetLeft;

    var setPanelWidth = function(width) {
        infoPanel.style.left = (windowWidth-width)+'px';
        canvas.style.marginRight = (width+20)+'px';
        panelWidth = width;
    };
    setPanelWidth(panelWidth);

    var ensureVisible = function() {
        if (windowWidth-infoPanel.offsetLeft < 10)
            setPanelWidth(lastUsedPanelWidth);
    };

    var decChoices = '';
    for (var i = 0; i < trace.length; i++) {
        decChoices += '<option value="'+trace[i].d+'">'+trace[i].d+'</option>';
    }
    decisionId.innerHTML = decChoices;
    decisionId.selectedIndex = -1;

    decisionId.onchange = function() {
        detailPanels.setDecision(traceDecision(decisionId.value));
    }

    detailPanels.setDecision = function(dec) {
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
    };

    detailPanels.show = function(name) {
        for (p in panels) {
            if (p == name) {
                panels[p].style.display = 'block';
                tabs[p].className = 'selectedtab';
            }
            else {
                panels[p].style.display = 'none';
                tabs[p].className = '';
            }
        }
        ensureVisible();
    };

    detailPanels.hide = function() {
        setPanelWidth(0);
    }

    decisionCalls.onchange = function() {
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
    };

    var headersList = function(headers) {
        var h = '';
        for (n in headers) h += '<li>'+n+': '+headers[n];
        return h;
    };

    document.getElementById('requestmethod').innerHTML = request.method;
    document.getElementById('requestpath').innerHTML = request.path;
    document.getElementById('requestheaders').innerHTML = headersList(request.headers);
    document.getElementById('requestbody').innerHTML = request.body;

    document.getElementById('responsecode').innerHTML = response.code;
    document.getElementById('responseheaders').innerHTML = headersList(response.headers);
    document.getElementById('responsebody').innerHTML = response.body;


    var infoControls = document.getElementById('infocontrols');
    var md = false;
    var dragged = false;
    var msoff = 0;
    infoControls.onmousedown = function(ev) {
        md = true;
        dragged = false;
        msoff = ev.clientX-infoPanel.offsetLeft;
    };

    infoControls.onclick = function(ev) {
        if (dragged) {
            lastUsedPanelWidth = panelWidth;
        }
        else if (panelWidth < 10) {
            switch(ev.target.id) {
            case 'requesttab': detailPanels.show('request'); break;
            case 'responsetab': detailPanels.show('response'); break;
            case 'decisiontab': detailPanels.show('decision'); break;
            default: ensureVisible();
            }
        } else {
            var name = 'none';
            switch(ev.target.id) {
            case 'requesttab': name = 'request'; break;
            case 'responsetab': name = 'response'; break;
            case 'decisiontab': name = 'decision'; break;
            }

            if (panels[name] && panels[name].style.display != 'block')
                detailPanels.show(name);
            else
                detailPanels.hide();
        }

        return false;
    };

    document.onmousemove = function(ev) {
        if (md) {
            dragged = true;
            panelWidth = windowWidth-(ev.clientX-msoff);
            if (panelWidth < 0) {
                panelWidth = 0;
                infoPanel.style.left = windowWidth+"px";
            }
            else if (panelWidth > windowWidth-21) {
                panelWidth = windowWidth-21;
                infoPanel.style.left = '21px';
            }
            else
                infoPanel.style.left = (ev.clientX-msoff)+"px";

            canvas.style.marginRight = panelWidth+20+"px";
            return false;
        }
    };

    document.onmouseup = function() { md = false; };

    window.onresize = function() {
        windowWidth = document.getElementById('sizetest').clientWidth;
        infoPanel.style.left = windowWidth-panelWidth+'px';
    };
}