function() {



var lat,lng;

var g = google.maps;

var infowindow = new g.InfoWindow();

var ls = "Total,poly,'English Bilingual','English Only','Other African',Arabic,Armenian,Chinese,French,'Haitian Creole',German,Greek,Gujarati,Hebrew,Hindi,Hmong,Hungarian,Italian,Japanese,Korean,Laotian,Cambodian,'Other Misc','Other Asian','Other Indic','Other Indo-European','Other Native','Other Pacific Island','Other Slavic','Other West Germanic',Persian,Polish,Portuguese,Russian,'Other Scandinavian','Serbo-Croatian',Spanish,Tagalog,Thai,Urdu,Vietnamese,Yiddish"

var base ="https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20"+ls+"%20FROM%201Nmn4ITGyXRucIE52dt55mEhy7RWKm_s55f3dOhg+WHERE%20ST_INTERSECTS(poly,%20CIRCLE(LATLNG(";



var end ="),5))&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ";

uiStuff();

function getTract(lat,lng){

    var latlng =[lat,lng].join(",");

$.get(base+latlng+end,dc,"JSONP");

}

function dc(data){

    var d={};

   $.each(data.rows[0],function(i,v){

    if(v>0){

     d[data.columns[i]]=v   

    }

   });

 makeChart(d);

 sMap(data.rows[0][1]);

}

function gc(a){



var geoc = new g.Geocoder();

geoc.geocode( { 'address': a}, function(results, status) {

     if (status == g.GeocoderStatus.OK) {

          cb(results[0]);

     }

});

};

function cb(r){

lat = r.geometry.location.lat();

lng = r.geometry.location.lng();

getTract(lat,lng);

makeMap();

}





function makeChart(d){

    var r = new google.visualization.DataTable();

r.addColumn('string','Language');

r.addColumn('number','Speakers');



$.each(d,function(k,v){

   if((k!="Total")&&(k!=="poly")){

    r.addRow([k,parseInt(v)]);  

   

   } 

});

var t= new google.visualization.Table(document.getElementById('tabs-1'));

var c= new google.visualization.PieChart(document.getElementById('tabs-2'));

t.draw(r,{sortColumn:1,sortAscending:false});

var o = {'width':900,

                      'height':400,

                       'chartArea':{'left':0,

                       'width':'100%',

                       'height':'80%'},

                      'titleTextStyle':{

                      'fontSize':20

                      },

                       'is3D':true};

c.draw(r,o);

}

function makeMap(){

    var center = new g.LatLng(lat,lng)

   $('#tabs').bind('tabsshow', function(event, ui) {

    if (ui.panel.id == "map") {

       g.event.trigger(m,"resize");

       m.setCenter(center);

    }

});

    

    m = new g.Map(document.getElementById('map'), {

    center: center,

    zoom: 14,

    mapTypeId: 'roadmap'

});

  marker = new g.Marker({

     map:m,

 position:center,

 title:"address"

     

     });

    

}

function sMap(j){

    poly= new g.Polygon({

        paths: $.map(j.geometry.coordinates[0],function(v){

            return new g.LatLng(v[1],v[0]);}),

    map:m

    });

     g.event.addListener(poly, 'click',function(event){

         var content = "The Census Tract In Question";

          infowindow.setContent(content);

          infowindow.setPosition(event.latLng);



  infowindow.open(m);

     });

}

function uiStuff(){

 $( "input:submit" ).button();

$('input, textarea').placeholder();

$( "#tabs" ).tabs();

$("#srch").click(function(){

    gc(

        $("#adr").val()

        )

    });   

}

}