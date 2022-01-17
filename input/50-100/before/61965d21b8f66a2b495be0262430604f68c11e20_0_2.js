function(Y) {
        var object = Y.one('object'),
        doc = object.get('contentDocument');
        
        var timer = Y.Node.getDOMNode(doc.one('#Timer'));
        timer.value = str;
    }