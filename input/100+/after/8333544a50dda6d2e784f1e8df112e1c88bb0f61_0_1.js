function(node) {
        if(node.style.display == 'none'){
            node.style.display = 'block';
            dojo.byId('plus_div_'+rowType+'_'+domainType+'_'+goalid).innerHTML = '[-]';
        }else {
            if(goalid == 0 && rowType == 3){
                var allSubMinorGoals = dojo.query('.effort_row_4_'+domainType);

                allSubMinorGoals.forEach(function(node1) {
                    node1.style.display='none';
                })
            }
            node.style.display = 'none';
            dojo.byId('plus_div_'+rowType+'_'+domainType+'_'+goalid).innerHTML = '[+]';
        }
    }