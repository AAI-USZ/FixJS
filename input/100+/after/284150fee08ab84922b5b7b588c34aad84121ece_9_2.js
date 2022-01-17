function layoutChildI(child) {
            var a = child.anchor;
            if(a === 'fill') {
                // These are layed out on the second phase
                fillChildren.push(child);
            } else if(a) { // requires layout
                /*jshint expr:true */
                def.hasOwn(aoMap, a) || def.fail.operationInvalid("Unknown anchor value '{0}'", [a]);
                
                child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
                
                if(child.isVisible){
                    checkChildLayout.call(this, child);
                    
                    var align = pvc.parseAlign(a, child.align);
                    
                    if(!needRelayout){
                        positionChild.call(this, a, child, align);
                    }
                    
                    updateSide.call(this, a, child, align);
                }
            }
        }