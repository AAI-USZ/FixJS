function showEmitEvents(_obj,ev){
    var Emit = doc.getElementById('emit');
    var _div = doc.createElement('div');

    _div.innerHTML = '<h5>'+ev+'</h5>';

    if(!!_obj.params){
        if('object' === typeof(_obj.params)){
            for(var i in _obj.params){
                var _span = doc.createElement('span');
                _span.setAttribute('emitEvent',i);
                _span.innerHTML ='&nbsp;&nbsp;&nbsp;' + i + ':&nbsp;';

                var _text = doc.createElement('input');
                _text.setAttribute('type','text');
                _text.setAttribute('rule',_obj.params[i]);

                _span.appendChild(_text);
                _div.appendChild(_span);
            }
        }else if('string' === typeof(_obj.params)){
            var _span = doc.createElement('span');
            var _text = doc.createElement('input');
            _text.setAttribute('type','text');

            _span.appendChild(_text);
            _div.appendChild(_span);
        }
    }


    var btn = doc.createElement('input');
    btn.value = 'sent';
    btn.setAttribute('type','button');


    var _emitThing;
    if('object' === typeof(_obj.params)){
        _emitThing = {};
        var _spans = _div.querySelectorAll('span');
        for(var n=0;n<_spans.length;n++){
            _emitThing[_spans[n].getAttribute('emitEvent')] = _spans[n].querySelector('input').getAttribute('value') == 'number' ? ~~_spans[n].querySelector('input').value : _spans[n].querySelector('input').value;
        }
    }else{
        _emitThing = !!_obj.params == 'number' ? ~~_div.querySelector('input').value : _div.querySelector('input').value;
    }

    btn.addEventListener('click',function(){
        socket.emit(ev,_emitThing);
    });

    _div.appendChild(btn);

    Emit.appendChild(_div);

    Clear.addEventListener('click',function(){
        On.innerHTML = '';
    })
}