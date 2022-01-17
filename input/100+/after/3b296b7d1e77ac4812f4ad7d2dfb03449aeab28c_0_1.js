function(numclasses){
        for(var i=numclasses.length; i--;){
            var numclass = numclasses[i];
            var spans = byClassName(this.selectable, numclass);
            if (spans.length < 1) {
                console.warn("Couldn't delete selection for " + numclass);
                return;
            }

            var anchor = lastWithClass(spans[spans.length-1], 'anchor');
            if (anchor === undefined || anchor === null ){
                console.warn("Couldn't delete selection for " + numclass);
                return;
            }
            anchor.parentNode.removeChild(anchor);

            this.removeTextSelection(spans);
            delete this.ranges[numclass];
        }
    }