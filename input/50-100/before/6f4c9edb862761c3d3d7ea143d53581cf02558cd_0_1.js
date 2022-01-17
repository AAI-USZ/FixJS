function ShowMap()
{
   map = new google.maps.Map(document.getElementById('map'), {
   zoom: 7,
   center: new google.maps.LatLng(50.009063, 14.407082),
   mapTypeId: google.maps.MapTypeId.ROADMAP});
    
}