function (latLng) {
    if (!latLng) return null;
    return [latLng.lat(), latLng.lng()];
}