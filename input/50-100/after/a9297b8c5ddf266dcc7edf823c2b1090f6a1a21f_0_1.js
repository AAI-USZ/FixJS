function(spans){
        for (var i=spans.length; i--;){
            var span = spans[i];
            for (var j=0; j<span.childNodes.length;j++){
                // this function call actually removes the child, so the index that we are removing is always 0.
                span.parentNode.insertBefore(span.childNodes[0], span);
            }
            span.parentNode.removeChild(span);
        }
    }