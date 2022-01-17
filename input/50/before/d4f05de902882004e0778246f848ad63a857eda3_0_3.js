function geolocationFailure(error) {
    remoteCmd('geolocationError', error.message);
}