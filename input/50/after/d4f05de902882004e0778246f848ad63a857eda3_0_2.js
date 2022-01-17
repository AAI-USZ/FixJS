function geolocationSuccess(position) {
    alert('GPS good');
    remoteCmd('geolocationSuccess', position);
}