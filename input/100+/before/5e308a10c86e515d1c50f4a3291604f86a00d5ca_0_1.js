function(side, align){
    var align2, isInvalid;
    if(side === 'left' || side === 'right'){
        align2 = pvc.BasePanel.verticalAlign[align];
        if(!align2){
            align2 = 'top';
            isInvalid = true;
        }
    } else {
        align2 = pvc.BasePanel.horizontalAlign[align];
        if(!align2){
            align2 = 'left';
            isInvalid = true;
        }
    }
    
    if(isInvalid && pvc.debug >= 2){
        pvc.log(def.format("Invalid alignment value '{0}'. Assuming '{1}'.", [align, align2]));
    }
    
    return align2;
}