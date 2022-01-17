function(e){
    if(e && typeof e === 'object' && e.message){
        e = e.message;
    }
    
    if (typeof console != "undefined"){
        console.log("[pvChart ERROR]: " + e);
    } else {
        throw new Error("[pvChart ERROR]: " + e);
    }
}