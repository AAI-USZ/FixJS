function resultsLoaded()
{
        if(options.dev) console.log(document.getElementById("center_col"), document.getElementById("center_col").style.visibility);
    
    if (document.getElementById("center_col") !== null){
        if (document.getElementById("center_col").style.visibility === "visible") {
            return true;
        }
    }
    
    return false;
}