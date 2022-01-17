function click(e){
    console.log(e.latLng);
    console.log([e.latLng.$a, e.latLng.Za]);
    $("#rooms-descriptions").val($("#rooms-descriptions").val() + 
        "\n" + JSON.stringify([e.latLng.lat(), e.latLng.lng()]));
    inputChanged();
}