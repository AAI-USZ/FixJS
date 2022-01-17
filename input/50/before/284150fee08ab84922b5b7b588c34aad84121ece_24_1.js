function(scene){
                var value = scene.acts[roleName].value;
                if(value == null){
                    if(!nullToZero){
                        return value;
                    }
                    value = 0;
                }
                return scale(value);
            }