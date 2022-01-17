function(x){
    return typeof x == "function" ? x(): x;
}