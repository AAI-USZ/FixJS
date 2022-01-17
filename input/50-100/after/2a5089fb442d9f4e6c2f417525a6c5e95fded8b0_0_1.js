function() {
        var bangElements = Array.prototype.slice.call(document.getElementsByClassName('bang'));
        for(var i = 0; i < bangElements.length; i++) {
            var el = bangElements[i];
            var src = el.dataset.source;
            var id = el.id || 'bang_'+i;
            el.id = id;
            var context = initElementWithSrcImage(el, src);
        }
    }