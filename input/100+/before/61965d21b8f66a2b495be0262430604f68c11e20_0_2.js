function(Y) {
        var object = Y.one('object'),
        doc = object.get('contentDocument');
        
        Y.Node.getDOMNode(doc.one('applet')).RECORD_VIDEO();
        InitializeTimer();
        Y.Node.getDOMNode(doc.one('#rec')).disabled = true;
        Y.Node.getDOMNode(doc.one('#play')).disabled=true;
        Y.Node.getDOMNode(doc.one('#stop')).disabled=false;
        Y.Node.getDOMNode(doc.one('#pause')).disabled=false;
    }