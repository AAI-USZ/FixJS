function(dir, mode){
    wrench.mkdirSyncRecursive(dir, mode || '0777');
}