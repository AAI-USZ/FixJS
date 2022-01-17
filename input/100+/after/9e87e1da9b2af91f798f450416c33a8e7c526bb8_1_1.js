function dispSelection(text) {
    var div = document.createElement('div');
    div.setAttribute('class', 'selected');
    div.setAttribute('id', 'selected');
    div.setAttribute('style','display:block');
    div.innerHTML = text;
    var p = document.createElement('p');
    p.setAttribute('id','snip-content');
    p = setStyleUrl(p);

    div.insertBefore(p, div.firstChild);
    document.body.appendChild(div);
}