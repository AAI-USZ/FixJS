function(e, choice, autocomplete) {
        console.log(choice, autocomplete.hilightClass)
        choice.addClass(autocomplete.hilightClass);
    }