function clear_map() {
    // Remove pointer layers from map.
    for (var marker in ProfilesLib.markers_array) {
        ProfilesLib.map.removeLayer(ProfilesLib.markers_array[marker]);
    }
    ProfilesLib.markers_array = [];
}