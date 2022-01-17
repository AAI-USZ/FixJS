function chooseMap(){
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'application/json');
    input.addEventListener('change', applyMap, false);
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, false, false, false, false, 0, null);
    input.dispatchEvent(evt);
    return false;
}