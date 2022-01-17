function() {
        var classActive = 'active';
        var countriesInput = document.getElementById('countries-input');
        var str = countriesInput.value;
        var countriesAutocompleteHTML = '<ul>';
        var ok = false;

        str = str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        var reg = new RegExp(str, "g");
        for( var i=0; i < countriesList.length; i++){
            var country = countriesList[i];
            if(country.country.toLowerCase().match(reg)) {
                countriesAutocompleteHTML += buildItem(classActive, country);
                classActive = '';
                ok = true;
            }
        }
        countriesAutocompleteHTML += '</ul>';
        if(ok) {
            document.getElementById('countries-autocomplete').innerHTML = countriesAutocompleteHTML;
        }
    }