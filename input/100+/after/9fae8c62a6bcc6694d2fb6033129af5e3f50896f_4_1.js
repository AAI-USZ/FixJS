function(element){
    this._element = element;
    //read messages for all states
    var messages = {};
    messages['on-state'] =
        element.attr('data-on-state-text') || gettext('enabled');
    messages['off-state'] = 
        element.attr('data-off-state-text') || gettext('disabled');
    messages['on-prompt'] =
        element.attr('data-on-prompt-text') || messages['on-state'];
    messages['off-prompt'] = 
        element.attr('data-off-prompt-text') || messages['off-state'];
    this._state_messages = messages;

    this.toggleUrl = element.attr('data-toggle-url');

    //detect state and save it
    if (this.isCheckBox()) {
        this._state = element.attr('checked') ? 'state-on' : 'state-off';
    } else {
        var text = $.trim(element.html());
        for (var i = 0; i < this._states.length; i++){
            var state = this._states[i];
            if (text === messages[state]){
                this._state = state;
                break;
            }
        }
    }

    //set mouseover handler
    var me = this;
    element.mouseover(function(){
        var is_on = me.isOn();
        if (is_on){
            me.setState('off-prompt');
        } else {
            me.setState('on-prompt');
        }
        element.css('background-color', 'red');
        return false;
    });
    element.mouseout(function(){
        var is_on = me.isOn();
        if (is_on){
            me.setState('on-state');
        } else {
            me.setState('off-state');
        }
        element.css('background-color', 'white');
        return false;
    });

    setupButtonEventHandlers(element, this.getHandler());
}