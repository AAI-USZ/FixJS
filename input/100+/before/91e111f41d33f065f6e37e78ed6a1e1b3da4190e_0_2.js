function() {
    this._element = this.makeElement('li');
    //add open adder link
    var trigger = this.makeElement('a');
    this._trigger = trigger;
    trigger.html(gettext('add category'));
    this._element.append(trigger);
    //add input box and the add button
    var input = this.makeElement('input');
    this._input = input;
    input.addClass('add-category');
    this._element.append(input);
    //add save category button
    var save_button = this.makeElement('button');
    this._save_button = save_button;
    save_button.html(gettext('save'));
    this._element.append(save_button);

    var cancel_button = this.makeElement('button');
    this._cancel_button = cancel_button;
    cancel_button.html('x');
    this._element.append(cancel_button);

    this.setState(this._state);

    var me = this;
    setupButtonEventHandlers(
        trigger,
        function(){ me.setState('editable'); }
    )
    setupButtonEventHandlers(
        save_button,
        function() { 
            me.startAdding();
            return false;//prevent form submit
        }
    );
    setupButtonEventHandlers(
        cancel_button,
        function() {
            me.setState('waiting');
            return false;//prevent submit
        }
    );
    //create input box, button and the "activate" link
}