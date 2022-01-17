function getSelectedRadio() {
        var radios = document.forms[0].urgency;
        for(var i=0; i<radios.length; i++) {
            if(radios[i].checked) {
              var  urgencyValue = radios[i].value;
            }
        }
    }