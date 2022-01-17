function layoutChildII(child) {
            child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
            
            checkChildLayout(child);
            
            positionChild.call(this, 'fill', child);
        }