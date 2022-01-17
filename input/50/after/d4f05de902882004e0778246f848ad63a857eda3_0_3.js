function geolocationFailure(error) {
    alert('GPS bad');
    remoteCmd('geolocationError', error.message);
}