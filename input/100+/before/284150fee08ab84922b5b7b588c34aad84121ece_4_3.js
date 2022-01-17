function(side, align){
    if(side === 'left' || side === 'right'){
        switch(align){
            case 'top':
            case 'bottom':
            case 'middle':
                break;
            
            default:
                if(align && pvc.debug >= 2){
                    pvc.log(def.format("Invalid alignment value '{0}'.", [align]));
                }
                align = 'top';
        }
    } else {
        switch(align){
            case 'left':
            case 'right':
            case 'center':
                break;
            
            default:
                if(align && pvc.debug >= 2){
                    pvc.log(def.format("Invalid alignment value '{0}'.", [align]));
                }
                align = 'left';
        }
    }
    
    return align;
}