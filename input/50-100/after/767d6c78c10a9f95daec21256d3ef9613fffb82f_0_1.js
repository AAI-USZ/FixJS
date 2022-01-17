function act_choose(choice) {
    var event = document.createEvent('CustomEvent');
    var returnedChoice = {
      id: this._id,
      type: 'activity-choice'
    };

    // If the user cancels, the choice is -1
    returnedChoice.value = choice || '-1';

    event.initCustomEvent('mozContentEvent', true, true, returnedChoice);
    window.dispatchEvent(event);

    delete this._id;
  }