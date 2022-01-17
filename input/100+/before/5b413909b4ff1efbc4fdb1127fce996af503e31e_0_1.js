function (obj, x, y) {
                    if(obj == me.roles.get('rio_tang')) {
                        var crab = me.roles.get('crab');
                        if(!crab) return;
                        var crabpos = crab.getPos();
                        if(crabpos.x-x>0)
                            crab.moveTo(x+100,y+50);
                        else if(crabpos.x-x<0)
                            crab.moveTo(x-100,y+50);
                    }

                    var rio = me.roles.get('rio_tang');
                    var crab = me.roles.get('crab');
                    var crabpos = crab.getPos();
                    var riopos = rio.getPos();
                    if(riopos.x-crab.x<120 && riopos.x-crab.x>0 && Math.abs(riopos.y-crab.y)<60) {
                        crab.faceRight();
                        crab.normalAttack();
                    }
                   if(riopos.x-crab.x>-120 && riopos.x-crab.x<0 && Math.abs(riopos.y-crab.y)<60) {
                        crab.faceLeft();
                        crab.normalAttack();
                    }
                }