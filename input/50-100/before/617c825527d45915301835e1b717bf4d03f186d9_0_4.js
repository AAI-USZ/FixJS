function createRecursive(instance){
    for(var p in instance){
        var vObj = asNativeObject(instance[p]);
        if(vObj){
            createRecursive( (instance[p] = Object.create(vObj)) );
        }
    }
}