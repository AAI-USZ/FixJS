function(){
draw();
function center(){
    if(!window.map || !window.map.map || !window.map.map.center)
        return [52.20531805547327, 0.10361167127326709];
    return [map.map.center.lat(), map.map.center.lng()];
}
function draw(){
    var c = center();
    window.map = new GMaps({
        div: '#map',
        lat: c[0],
        lng: c[1],
        maxZoom: 21,
        zoom:17,
        click:click,
        dragend:updateBounds
    });
    $("#map")[0].style.height = "";
    $("#map")[0].style.width = "";
}

var bottomright = [52.202589349841794, 0.11149736577705127];
var topright =    [52.2087632179324,   0.11328908139899951];

var top = 52.208;
var bottom = 52.202;

function updateBounds(){
    /*var c = center();
    var bounds = map.map.getBounds();
    bounds = {left:bounds.ca.b, right:bounds.ca.j, top:bounds.ea.b, bottom:bounds.ea.j};
    var correctBounds = {
        left: 52.204732877295214,
        right: 52.20576515270808,
        top:0.10181995565130819,
        bottom:0.10566087896063436
    };
    if(bounds.right < correctBounds.left){
        map.setCenter(c[0] + (correctBounds.left - bounds.right), c[1]);
    }
    */
    var c = center();
    if(c[0] > 52.208){
        map.setCenter(52.208,c[1]);
    }
    if(c[0] < 52.203){
        map.setCenter(52.203,c[1]);
    }
    if(c[1] > 0.110){
        map.setCenter(c[0],0.110);
    }
    if(c[1] < 0.096){
        map.setCenter(c[0],0.096);
    }
}
console.warn = function(){};

var infoWindow = new google.maps.InfoWindow({});

var cntrlPressed = false;
document.onkeydown = function keyDown(e) {
    if (e.ctrlKey || e.keyCode === 17 || e.keyIdentifier === 'Control') cntrlPressed = true;
};
document.onkeyup = function keyDown(e) {
    if (e.ctrlKey || e.keyCode === 17 || e.keyIdentifier === 'Control') cntrlPressed = false;
};
function click(e){
    infoWindow.close();
    console.log(e.latLng);
    console.log([e.latLng.$a, e.latLng.Za]);
    $("#rooms-descriptions").val($("#rooms-descriptions").val() + 
        "\n" + JSON.stringify([e.latLng.lat(), e.latLng.lng()]));
    inputChanged();
}


function room(path, obj){
    var p = [], latlng, i;
    for(i in path){
        latlng = new google.maps.LatLng(path[i][0], path[i][1]);
        p.push(latlng);
    }

    var center = (function(){
        var p = [0,0]
        path.forEach(function(v){
            p[0] += (v[0]);
            p[1] += (v[1]);
        })
        var lat = p[0]/path.length;
        var lon = p[1]/path.length;
        return new google.maps.LatLng(lat, lon);
    }());
    function clickRoom(e){
        if (cntrlPressed) return click(e);

        infoWindow.setContent('<a href="http://www.rcsa.co.uk/rooms#'+obj.id+'">'
            +obj.name+'</a>');

        infoWindow.setPosition(e.latLng);
        infoWindow.open(map.map);
      }
    function poly(stroke, fill){
        return map.drawPolygon({
          paths: p,
          strokeColor: stroke,
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: fill,
          fillOpacity: 0.6,
          click:clickRoom
        });
    }
    var available = poly('#BBD8E9', '#BBD8E9');
    var unavailable = poly(/*'#6E6E6E'*/'#BBD8E9','#A4A4A4');
    var availability;
    obj.update = function(a){
        availability = a;
        available.setVisible(availability);
        unavailable.setVisible(!availability);
    };
    obj.update(Math.random()>0.5);
    obj.remove = function(){
        obj.update = function(){};
        available.setVisible(false);
        unavailable.setVisible(false);
    };
    return obj;
}
function commonRoom(path, name){

}

var rooms = [];

setInterval(function(){
    for(var i = 0; i<rooms.length; i++){
        rooms[i].update(Math.random()>0.5);
    }
},1000);


var timeout;
$("#rooms-descriptions").keyup(inputChanged);
$(inputChanged);
function inputChanged(){
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(process, 500);
}
var hidables = [];
function process(){
    while(hidables.length){
        hidables.pop()();
    }
    var text = $("#rooms-descriptions").val().split(/\n\r?/g);
    var input = [];
    var allclear = true;
    for(var i = 0; i<text.length; i++){
        if(text[i].length > 0 && text[i].substr(0,1) !== "#"){
            try{
                input.push(JSON.parse(text[i]));
            } catch (ex) {
                hidables.push(error("Line "+ (i+1) + " is not a valid array"));
                allclear = false;
            }
        }
    }
    if(!allclear) return;
    var parsed = [];
    for(var i = 0; i<input.length; i++){
        if(input[i].length === 2 && 
            typeof input[i][0] === "number" && 
            typeof input[i][1] === "number"){
            if(parsed.length === 0){
                return error("You must give the room id &amp; name before it's path");
            } else {
                parsed[parsed.length-1].path.push(input[i]);
            }
        }else{
            parsed.push({id:input[i][0], name:input[i][1], path:[]});
        }
    }

    while(rooms.length > 0){
        rooms.pop().remove();
    }
    for(var i = 0; i<parsed.length; i++){
        rooms.push(room(parsed[i].path, parsed[i]));
    }
}
var errno = 0;
function error(message){
    $(".alerts").append('<div class="alert" id="err'+(++errno)+'">'
        +message+
      '</div>');
    var no = errno;
    $('#err'+no).fadeIn();
    var hidden = false;
    function hide(){
        if(!hidden){
            $('#err'+no).fadeOut(function() { $(this).remove(); });
            hidden = true;
        }
    }
    setTimeout(hide, 5000);
    return hide;
}
}