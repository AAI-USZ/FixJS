function(side, align){
    var align2, isInvalid;
    if(side === 'left' || side === 'right'){
        align2 = align && pvc.BasePanel.verticalAlign[align];
        if(!align2){
            align2 = 'middle';
            isInvalid = !!align;
        }
    } else {
        align2 = align && pvc.BasePanel.horizontalAlign[align];
        if(!align2){
            align2 = 'center';
            isInvalid = !!align;
        }
    }
    
    if(isInvalid && pvc.debug >= 2){
        pvc.log(def.format("Invalid alignment value '{0}'. Assuming '{1}'.", [align, align2]));
    }
    
    return align2;
}