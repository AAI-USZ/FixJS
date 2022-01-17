function savePolygon(polygon, callback)
{
    var vertices = polygon.getPath();
    var res = {};
    var id = polygon.id != undefined ? polygon.id : 0;

    for (var i = 0; i < vertices.length; i++)
    {
        var xy = vertices.getAt(i);
        res['polygons[' + id + '][' + i + '][lat]'] = xy.lat();
        res['polygons[' + id + '][' + i + '][lng]'] = xy.lng();
    }
    if (polygon.id == undefined)
    {
        res.title = $('#new_sector_title').val();
        res.square_id = $('#new_sector_square_id').val();
    }
    $.post('/region/save', res, callback);
}