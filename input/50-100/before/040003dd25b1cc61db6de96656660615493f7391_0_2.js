function (komooMap) {
    this.komooMap = komooMap;
    this.addrLatLngCache = {};
    this.loadedOverlays = {};
    this.tileSize = new google.maps.Size(256, 256);
    this.maxZoom = 32;
    this.name = "Wikimapia Data";
    this.alt = "Wikimapia Data Tile Map Type";
    this.key = "Add here your wikimapia key";
}