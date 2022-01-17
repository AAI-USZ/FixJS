function centerPopup(){
//request data for centering
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var popupHeight = $("#popupContact").height();
var popupWidth = $("#popupContact").width();
//centering
$("#popupContact").css({
"position": "absolute",
"top": windowHeight/2-popupHeight/2,
"left": windowWidth/2-popupWidth/2
});
//only need force for IE6

$("#backgroundPopup").css({
"height": windowHeight
});

}