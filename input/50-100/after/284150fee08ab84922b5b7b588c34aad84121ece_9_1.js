function layoutChildII(child) {
            child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
            if(child.isVisible){
                checkChildLayout(child);
                if(!needRelayout){
                    positionChild.call(this, 'fill', child);
                }
            }
        }