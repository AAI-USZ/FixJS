function updateMosaic() {  
    $.getScript('/dashboard/mosaic.js');  
    setTimeout(updateMosaic, 10000);  
}