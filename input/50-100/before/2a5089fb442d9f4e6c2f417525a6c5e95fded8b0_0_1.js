function (el,ndx) {
            var src = el.dataset.source;
            var id = el.id || 'bang_'+ndx;
            el.id = id;
            var context = initElementWithSrcImage(el, src);
        }