function clear_map() {
    // Remove pointer layers from map.
    for (var marker in window.markers_array) {
        window.map.removeLayer(window.markers_array[marker]);
    }
    markers_array = [];
}