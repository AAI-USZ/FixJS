function isUnique(item, i, arr){
        return indexOf(arr, item, i+1) === -1;
    }