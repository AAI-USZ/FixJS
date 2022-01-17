function(numclasses){
        for(var i=numclasses.length; i--;){
            var numclass = numclasses[i];
            var spans = byClassName(this.selectable, numclass);
            var anchor = lastWithClass(spans[spans.length-1], 'anchor');
            anchor.parentNode.removeChild(anchor);

            this.removeTextSelection(spans);
            delete this.ranges[numclass];
        }
    }