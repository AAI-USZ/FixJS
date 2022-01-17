function resultsLoaded()
{
    if (document.getElementById("center_col") !== null){
        if (document.getElementById("center_col").style.visibility === "visible") {
            return true;
        }
    }
    
    return false;
}