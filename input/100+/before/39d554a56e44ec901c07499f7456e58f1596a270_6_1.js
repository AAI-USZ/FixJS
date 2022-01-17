function(){
    
        for (var i in gamedata.ships){
            var ship = gamedata.ships[i];
            
            for (var a in ship.fireOrders){
                var fire = ship.fireOrders[a];
                var target = gamedata.getShip(fire.targetid);
                var weapon = shipManager.systems.getSystem(ship, fire.weaponid);
                var damages = weaponManager.getDamagesCausedBy(fire);
                
                var html = '<div class="logentry"><span class="fire">FIRE: </span><span>';
                html += '<span class="shiplink" data-id="'+ship.id+'" >' + ship.name + '</span>';
                
                if (fire.rolled <= fire.needed){
                    html += ' hitting ';
                }else{
                    html += ' missing ';
                }
                
                html += '<span class="shiplink" data-id="'+target.id+'" >' + target.name + '</span>';
                html += ' with ' + weapon.displayName + ' (rolled: '+fire.rolled+'/'+fire.needed+')';
                html += '<span class="notes"> '+fire.notes+'</span>';
                for (var b in damages){
                    var d = damages[b];
                    var des = "";
                    if (d.destroyed)
                        des = " DESTROYED";
                        
                    if (d.damage-d.armour<0)
                        continue;
                    
                    var system = shipManager.systems.getSystem(target, d.systemid);
                    
                    html += '<span class="damage"> '+shipManager.systems.getDisplayName(system)+des+ ' '+(d.damage-d.armour)+'(A:'+d.armour+') </span>'
                    
                }
                html+='</span></div>';
                
                $(html).prependTo("#log");
                
            
            }
        
        }
    
    }