function(layoutInfo){
        
        if(!this._children) {
            return;
        }
        
        var margins, remSize, fillChildren;
        
        // May be expanded, see checkChildLayout
        var clientSize = def.copyOwn(layoutInfo.clientSize);
        
        function initLayout(){
            
            fillChildren = [];
            
            // Objects we can mutate
            margins = new pvc.Sides(0);
            remSize = def.copyOwn(clientSize);
        }
        
        var aolMap = pvc.BasePanel.orthogonalLength,
            aoMap  = pvc.BasePanel.relativeAnchor;
        
        var childKeyArgs = {force: true};
        var childReferenceSize = clientSize;
        var needRelayout = false;
        var relayoutCount = 0;
        var allowGrow = true;
        
        initLayout.call(this);
        
        // Lays out non-fill child panels and collects fill children
        this._children.forEach(layoutChildI, this);
        
        // Lays out collected fill-child panels
        fillChildren.forEach(layoutChildII, this);
        
        while(needRelayout){
            needRelayout = false;
            relayoutCount++;
            allowGrow = relayoutCount <= 1;
            
            initLayout.call(this);
            
            this._children.forEach(layoutChildI, this);
            
            fillChildren.forEach(layoutChildII, this);
        }
        
        return clientSize;
        
        // --------------------
        
        function layoutChildI(child) {
            var a = child.anchor;
            if(a === 'fill') {
                // These are layed out on the second phase
                fillChildren.push(child);
            } else if(a) { // requires layout
                /*jshint expr:true */
                def.hasOwn(aoMap, a) || def.fail.operationInvalid("Unknown anchor value '{0}'", [a]);
                
                child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
                
                checkChildLayout.call(this, child);
                
                var align = pvc.parseAlign(a, child.align);
                
                positionChild.call(this, a, child, align);
                
                updateSide.call(this, a, child, align);
            }
        }
        
        function layoutChildII(child) {
            child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
            
            checkChildLayout(child);
            
            positionChild.call(this, 'fill', child);
        }
        
        function checkChildLayout(child){
            
            var addWidth = child.width - remSize.width;
            if(addWidth > 0){
                if(!allowGrow){
                    if(pvc.debug >= 2){
                        pvc.log("[Warning] Layout iterations limit reached.");
                    }
                } else {
                    needRelayout = true;
                    remSize.width += addWidth;
                    clientSize.width += addWidth;
                }
            }
            
            var addHeight = child.height - remSize.height;
            if(addHeight > 0){
                if(!allowGrow){
                    if(pvc.debug >= 2){
                        pvc.log("[Warning] Layout iterations limit reached.");
                    }
                } else {
                    needRelayout = true;
                    remSize.height += addHeight;
                    clientSize.height += addHeight;
                }
            }
        }
        
        function positionChild(side, child, align) {
            var sidePos;
            if(side === 'fill'){
                side = 'left';
                sidePos = margins.left + remSize.width / 2 - (child.width / 2);
                align = 'middle';
            } else {
                sidePos = margins[side];
            }
            
            var sideo, sideOPos;
            switch(align){
                case 'top':
                case 'bottom':
                case 'left':
                case 'right':
                    sideo = align;
                    sideOPos = margins[sideo];
                    break;
                
                case 'center':
                case 'middle':
                    if(side === 'left' || side === 'right'){
                        sideo    = 'top';
                        sideOPos = margins.top + (remSize.height / 2) - (child.height / 2);
                    } else {
                        sideo    = 'left';
                        sideOPos = margins.left + remSize.width / 2 - (child.width / 2);
                    }
                    break;
            }
            
            child.setPosition(
                    def.set({}, 
                        side,  sidePos, 
                        sideo, sideOPos));
        }
        
        // Decreases available size and increases margins
        function updateSide(side, child) {
            var sideol = aolMap[side];
            var olen   = child[sideol];
            
            margins[side]   += olen;
            remSize[sideol] -= olen;
        }
    }