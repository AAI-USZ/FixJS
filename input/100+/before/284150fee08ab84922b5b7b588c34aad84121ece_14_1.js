function layoutChildII(child) {
            var a = child.anchor;
            if(a === 'fill') {
                child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
                
                positionChildI (a, child);
                positionChildII(child, a);
            } else if(a) {
                var al  = alMap[a];
                var aol = aolMap[a];
                var length      = remSize[al];
                var olength     = child[aol];
                var childSizeII = new pvc.Size(def.set({}, al, length, aol, olength));
                
                child.layout(childSizeII, childReferenceSize, childKeyArgs);
                
                var align = pvc.parseAlign(a, child.align);
                
                positionChildII(child, align);
            }
        }