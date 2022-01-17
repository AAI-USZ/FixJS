function() {
    //this.id = additional_N_submit
    //id for element to clone = additional_N_clone
    //id for element to append to = additional_N_elements
    var cloneId = this.id.replace("submit", "clone");
    var newId = this.id.replace("submit", "elements");
    var cloneElem = $('#'+cloneId).clone();

    //remove the button before adding the input
    //we don't want a button on each element being appended
    cloneElem.find('#'+this.id).remove();
    cloneElem.find('.formHelp').remove();

    //clear out the value for the element being appended
    //so the new element has a blank value
    cloneElem.find('input[type=text]').attr("value", "");

    // should we attach an auto complete based on the input
    if (this.id == 'additional_based_near_submit') {
      cloneElem.find('input[type=text]').autocomplete(cities_autocomplete_opts);
    }
    else if ( (index = $.inArray(this.id, autocomplete_vocab.add_btn_id)) != -1 ) {
      cloneElem.find('input[type=text]').autocomplete(get_autocomplete_opts(autocomplete_vocab.url_var[index]));
    }

    $('#'+newId).append(cloneElem);
    cloneElem.find('input[type=text]').focus();
    return false;
  }