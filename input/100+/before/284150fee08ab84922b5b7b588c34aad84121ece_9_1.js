function(availableSize, referenceSize, keyArgs){
        if(!this._layoutInfo || def.get(keyArgs, 'force', false)) {
            
            if(!referenceSize && availableSize){
                referenceSize = def.copyOwn(availableSize);
            }
            
            // Does this panel have a **desired** fixed size specified?
            
            // * size may have no specified components 
            // * referenceSize may be null
            var desiredSize = this.size.resolve(referenceSize);
            var sizeMax     = this.sizeMax.resolve(referenceSize);
            
            if(!availableSize) {
                if(desiredSize.width == null || desiredSize.height == null){
                    throw def.error.operationInvalid("Panel layout without width or height set.");
                }
                
                availableSize = def.copyOwn(desiredSize);
            }
            
            if(!referenceSize && availableSize){
                referenceSize = def.copyOwn(availableSize);
            }
            
            // Apply max size to available size
            if(sizeMax.width != null && availableSize.width > sizeMax.width){
                availableSize.width = sizeMax.width;
            }
            
            if(sizeMax.height != null && availableSize.height > sizeMax.height){
                availableSize.height = sizeMax.height;
            }
            
            var margins  = this.margins .resolve(referenceSize);
            var paddings = this.paddings.resolve(referenceSize);
            var spaceWidth  = margins.width  + paddings.width;
            var spaceHeight = margins.height + paddings.height;
            
            var availableClientSize = new pvc.Size(
                        Math.max(availableSize.width  - spaceWidth,  0),
                        Math.max(availableSize.height - spaceHeight, 0)
                    );
            
            var desiredClientSize = def.copyOwn(desiredSize);
            if(desiredClientSize.width != null){
                desiredClientSize.width = Math.max(desiredClientSize.width - spaceWidth, 0);
            }
            
            if(desiredClientSize.height != null){
                desiredClientSize.height = Math.max(desiredClientSize.height - spaceHeight, 0);
            }
            
            var layoutInfo = 
                this._layoutInfo = {
                referenceSize:       referenceSize,
                margins:             margins,
                paddings:            paddings,
                desiredClientSize:   desiredClientSize,
                clientSize:          availableClientSize
            };
            
            var clientSize = this._calcLayout(layoutInfo);
            
            var size;
            if(!clientSize){
                size = availableSize; // use all available size
            } else {
                layoutInfo.clientSize = clientSize;
                size = {
                    width:  clientSize.width  + spaceWidth,
                    height: clientSize.height + spaceHeight
                };
            }
            
            delete layoutInfo.desiredClientSize;
            
            this.width = size.width;
            this.height = size.height;
        }
    }