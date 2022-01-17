function record_rp() {
    document.VimasVideoApplet.RECORD_VIDEO();
    document.getElementById('rec').disabled=true;
    document.getElementById('play').disabled=true;
    document.getElementById('stop').disabled=false;
    document.getElementById('pause').disabled=false;
    return false;
}