function asMethod(fun) {
        if(fun) {
            if(def.fun.is(fun)) {
                return new Method({as: fun});
            }
            
            if(fun instanceof Method) {
                return fun;
            }
            
            if(def.fun.is(fun.as)) {
                return new Method(fun);
            }
            
            if(fun.isAbstract) {
                return new Method({isAbstract: true, as: def.fail.notImplemented });
            }
        }
        
        return null;
    }