function SetLatLog(event)
{
    document.getElementById('latitude').value = event.latLng.lat().toFixed(8);
    document.getElementById('longitude').value = event.latLng.lng().toFixed(8);
    
}