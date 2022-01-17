function(el, options) {
    options = options || {};
    var el = baidu.dom.g(el),
        optData = parseSelectOptions(el),
        newItemOpt = null;
    baidu.object.extend(optData, {
        'width' : el.offsetWidth + 10,
        'disabled' : el.disabled
    });
    options = baidu.object.extend(optData, options);
    var instance = magic.setup(el, magic.ComboBox, options);
    
    baidu.dom.insertHTML(el, 'beforeBegin', '<span id="' + instance.guid + '-host" class="magic-combobox-host"></span>');
    
    var host = baidu.dom.g(instance.guid + '-host');
    host.appendChild(el);
    instance.select = el;
    el.style.width = (el.offsetWidth + 15) + 'px';
    el.style.visibility = 'hidden';
    instance.render(host, 'afterBegin');
    baidu.dom.addClass(instance.getElement('container'), 'magic-combobox-container-setup');
    instance.on('change', function(event) {
        if (event.from == 'confirm') {
            el.options[event.result.index].selected = true;
        } else if (event.from == 'blur') {
            var content = this.getElement('input').value;
            if (!newItemOpt) {
                newItemOpt = document.createElement('OPTION');
                newItemOpt.selected = true;
                el.add(newItemOpt);
            }
            newItemOpt.value = newItemOpt.text = content;
        }
        
    });
    
    return instance;
}