function generate_checkin_listing(checkin){
   // var listing = '<div id="check-in-id{0}" class="newsfeed-item">'
   // 	+ '<div id="table-div">'
   // 	+ '<table class="table">'
   // 	+ '<tr>'
   // 	+ '<td>{1} is at {2}</td>'
   // 	+ '</tr>'
   // 	+ '<tr>'
   // 	+ '<td id="time-staying-id{3}"></td>'
   // 	+ '<td>${4}</td>'
   // 	+ '<td><button class="btn btn-primary order-button" data-toggle="modal" onClick="javascript:order_up({5})">OrderUp</button></td>'
   // 	+ '</tr>'
   // 	+ '</table>'
   // 	+ '</div>'
   // 	+ '</div>';

    var listing = '<div id="check-in-{0}" class="newsfeed-item">'
        + '<div id="json" class="hidden">'
        + '{6}'
        + '</div>'
        + '<span class="item-title">{1} is at {2}</span>'
        + '<br>'
        + '<br>'
        + '<span class="item-text item-time" id="time-staying-id{3}"></span>'
        + '<button class="btn btn-primary order-button" data-toggle="modal" onClick="javascript:order_up({5})">OrderUp</button>'
        + '<span class="item-text item-price">${4}</span>'
        + '</div>'

    return listing.format(checkin.id, checkin.user, checkin.name, checkin.id, checkin.fee, checkin.id, JSON.stringify(checkin));
}