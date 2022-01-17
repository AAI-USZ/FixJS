function act_choose(choice) {
    var event = document.createEvent('CustomEvent');
    var returnedChoice = {
      id: this._id,
      type: 'activity-choice'
    };

    if (choice !== null)
      returnedChoice.value = choice;

    event.initCustomEvent('mozContentEvent', true, true, returnedChoice);
    window.dispatchEvent(event);

    delete this._id;
  }