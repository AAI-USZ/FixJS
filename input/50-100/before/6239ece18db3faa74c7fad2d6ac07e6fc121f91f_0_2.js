function createSpace(name, base, definition){
    if(def.isFun(base)){
        definition = base;
        base = null;
    }
    
    var namespace = getNamespace(name, base);
    
    if(definition){
        namespaceStack.push(currentNamespace);
        try{
            definition(namespace);
        } finally {
            currentNamespace = namespaceStack.pop();
        }
    }

    return namespace;
}