function layoutChildI(child) {
            var a = child.anchor;
            if(a && a !== 'fill') {
                /*jshint expr:true */
                def.hasOwn(aoMap, a) || def.fail.operationInvalid("Unknown anchor value '{0}'", [a]);
                
                child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
                if(child.isVisible){
                    // Only set the *anchor* position
                    // The other orthogonal position is dependent on the size of the other non-fill children
                    positionChildI(a, child);
                    
                    updateSide(a, child);
                }
            }
        }