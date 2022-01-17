function showEmitEvents(_obj,ev){
    var Emit = doc.getElementById('emit');
    var _div = doc.createElement('div');

    _div.innerHTML = '<h5>'+ev+'</h5>';

    if(!!_obj.params){
        for(var i in _obj.params){
            var _span = doc.createElement('span');
            _span.setAttribute('emitEvent',i);
            _span.innerHTML ='&nbsp;&nbsp;&nbsp;' + i + ':&nbsp;';

            var _text = doc.createElement('input');
            _text.setAttribute('type','text');

            _span.appendChild(_text);
            _div.appendChild(_span);
        }
    }


    var btn = doc.createElement('input');
    btn.value = 'sent';
    btn.setAttribute('type','button');

    var _emitObj = {};
    var _spans = _div.querySelectorAll('span');

    for(var n=0;n<_spans.length;n++){
        _emitObj[_spans[n].getAttribute('emitEvent')] = _spans[n].querySelector('input');
    }

    btn.addEventListener('click',function(){
        socket.emit(ev);
    });


    _div.appendChild(btn);

    Emit.appendChild(_div);

    Clear.addEventListener('click',function(){
        On.innerHTML = '';
    })
}