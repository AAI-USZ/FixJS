function click(e){
    console.log([e.latLng.$a, e.latLng.ab]);
    $("#rooms-descriptions").val($("#rooms-descriptions").val() + 
        "\n" + JSON.stringify([e.latLng.$a, e.latLng.ab]));
    inputChanged();
}