function(m){
    if (typeof console != "undefined"){
        console.log("[pvChart ERROR]: " + m);
    } else {
        throw new Error("[pvChart ERROR]: " + m);
    }
}