function createRecursive(instance){
    for(var p in instance){
        var vObj = def.object.asNative(instance[p]);
        if(vObj){
            createRecursive( (instance[p] = Object.create(vObj)) );
        }
    }
}