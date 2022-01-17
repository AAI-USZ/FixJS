function(Y) {
        var object = Y.one('object'),
        doc = object.get('contentDocument');
        
        var status = Y.Node.getDOMNode(doc.one('#Status'));
        status.value = str;
    }