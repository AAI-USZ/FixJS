function centerPopup1(){
//request data for centering
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var popupHeight = $("#popupContact1").height();
var popupWidth = $("#popupContact1").width();
//centering
$("#popupContact1").css({
"position": "absolute",
"top": windowHeight/2-popupHeight/2.5,
"left": windowWidth/2-popupWidth/2
});
//only need force for IE6

$("#backgroundPopup").css({
"height": windowHeight
});

}