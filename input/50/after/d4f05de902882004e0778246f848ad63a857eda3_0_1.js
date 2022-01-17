function() {
    if (typeof document.watch_id !== 'undefined') {
        navigator.geolocation.clearWatch(document.watch_id);
        alert('Cleared watch');
    } else {
        alert('No watch to clear');
    }
}