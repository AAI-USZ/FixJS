function updateTime() {
	var date = new Date();
	var seconds = date.getSeconds();
    var sdegree = seconds * 6 -1;
    var srotate = "rotate(" + sdegree + "deg)";
    var hours = date.getHours();
    var mins = date.getMinutes();
    var hdegree = hours * 30 + (mins / 2);
    var hrotate = "rotate(" + hdegree + "deg)";
    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    
    document.getElementById("cl_sec").setAttribute('style', "-moz-transform: " + srotate + "; -webkit-transform: " + srotate);
    document.getElementById("cl_hour").setAttribute('style', "-moz-transform: " + hrotate + "; -webkit-transform: " + hrotate);
    document.getElementById("cl_min").setAttribute('style', "-moz-transform: " + mrotate + "; -webkit-transform: " + mrotate);
}