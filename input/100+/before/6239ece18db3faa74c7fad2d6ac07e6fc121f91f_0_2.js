function asMethod(fun) {
        if(fun) {
            if(def.isFun(fun)) {
                return new Method({as: fun});
            }
            
            if(fun instanceof Method) {
                return fun;
            }
            
            if(def.isFun(fun.as)) {
                return new Method(fun);
            }
            
            if(fun.isAbstract) {
                return new Method({isAbstract: true, as: def.notImplemented });
            }
        }
        
        return null;
    }