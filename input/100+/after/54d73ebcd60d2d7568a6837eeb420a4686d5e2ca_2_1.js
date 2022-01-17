function($){

    var _knownElements = ['dialog','tabs','autocomplete','datePicker','slider','progressbar','inputNumeric','inputTime','inputMoney','inputMasked','form']

	$(document).ready(function(){
		_inspectScope();
	});

    /*
     * DOM Responders
     * ----------------------------------------------------------
     */
    App.EM.bind("UI:new", _inspectElement);
    App.EM.bind("UI:optionSet", function(event, elemType, elem, opt, val) {
        switch(elemType) {
            case 'dialog': {
                $(elem).dialog("option", opt, val);
                break;
            }
            case 'datePicker': {
                $(elem).datePicker("option", opt, val);
                break;
            }
            case 'tabs': {
                $(elem).tabs("option", opt, val);
                break;
            }
            case 'slider': {
                $(elem).slider("option", opt, val);
                break;
            }
            case 'progressbar': {
                $(elem).progressbar("option", opt, val);
                break;
            }
            case 'autocomplete': {
                $(elem).autocomplete("option", opt, val);
                break;
            }
        }
    });

    App.EM.bind("UI:injected", function(data) {
        _inspectElement(data.type, data.scope);
        _inspectScope(data.scope+' ');
    });

    /*
     * Scope Inspector
     * ----------------------------------------------------------
     */
    function _inspectScope(scope) {
        if(!scope)
            scope = 'body ';

        $.each(_knownElements, function(idx, elemClass){
            $(scope+'.'+elemClass).each(function(i){
                _inspectElement($(this));
            });
        });

        return this;
    }

    function _inspectElement(element, params) {

        var elementType = '';
        // Determine which element we got
        $.each(_knownElements, function(idx, elemClass){
            if($(element).hasClass(elemClass)) {
                elementType = elemClass;
            }
        });

        switch (elementType)
        {
            case 'dialog': {
                var h = new App.Ui.Dialog($(element), params);
                if(App.Collection.Dialogs[$(element).attr('id')]==undefined) {
                    App.Collection.Dialogs[$(element).attr('id')] = h;
                } else {
                    console.warn('Dialog with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
            case 'form': {
                var h = new App.Ui.FormHandler($(element), params||{}); h.Init();
                if(App.Collection.Forms[$(element).attr('id')]==undefined) {
                    App.Collection.Forms[$(element).attr('id')] = h;
                } else {
                    console.warn('Form with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
            case 'datePicker': {
                var h = new App.Ui.DatePicker($(element), params||{}); h.init();
                if(App.Collection.DatePickers[$(element).attr('id')]==undefined) {
                    App.Collection.DatePickers[$(element).attr('id')] = h;
                } else {
                    console.warn('DatePickers with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
            case 'tabs': {
                var h = new App.Ui.Tabs($(element), params||{}); h.init();
                if(App.Collection.Tabs[$(element).attr('id')]==undefined) {
                    App.Collection.Tabs[$(element).attr('id')] = h;
                } else {
                    console.warn('Tabs with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
            case 'autocomplete': {
                var h = new App.Ui.Input.Autocomplete($(element), params||{}); h.init();
                if(App.Collection.Inputs[$(element).attr('id')]==undefined) {
                    App.Collection.Inputs[$(element).attr('id')] = h;
                } else {
                    console.warn('Input with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
            case 'slider': {
                var h = new App.Ui.Slider($(element), params||{}); h.init();
                if(App.Collection.Sliders[$(element).attr('id')]==undefined) {
                    App.Collection.Sliders[$(element).attr('id')] = h;
                } else {
                    console.warn('Slider with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
            case 'inputNumeric':
            case 'inputMoney': {
                var h = new App.Ui.Input.Numeric($(element), params); h.init();
                if(App.Collection.Inputs[$(element).attr('id')]==undefined) {
                    App.Collection.Inputs[$(element).attr('id')] = h;
                } else {
                    console.warn('Input with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
            case 'inputTime': {
                var h = new App.Ui.Input.Time($(element), params); h.init();
                if(App.Collection.Inputs[$(element).attr('id')]==undefined) {
                    App.Collection.Inputs[$(element).attr('id')] = h;
                } else {
                    console.warn('Input with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
            case 'inputMasked': {
            	var h = new App.Ui.Input.Masked($(element), params); h.init();
                if(App.Collection.Inputs[$(element).attr('id')]==undefined) {
                    App.Collection.Inputs[$(element).attr('id')] = h;
                } else {
                    console.warn('Input with id `#'+$(element).attr('id')+'` is already exists.');
                }
                break;
            }
        }
        delete h;
    }

    return {
        reinspect: _inspectScope
    }

}