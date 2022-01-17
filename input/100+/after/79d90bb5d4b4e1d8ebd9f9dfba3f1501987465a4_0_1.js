function() {
        var classActive = 'active';
        var countriesInput = document.getElementById('countries-input');
        var str = countriesInput.value;
        var countriesAutocompleteHTML = '<ul>';
        var ok = false;

        str = str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); // Escape regular expression special characters

        var reg = new RegExp("^"+str, "i");
        for( var i=0; i < countriesList.length; i++){
            var countryItem = countriesList[i];
            var countryWords = countryItem.country.toLowerCase().split(/\s+/);
            // Capture words starting with the entered pattern
            for(var cw = 0; cw < countryWords.length; cw++) {
                if(countryWords[cw].length > 2 && countryWords[cw].match(reg)) {
                    countriesAutocompleteHTML += buildItem(classActive, countryItem);
                    classActive = '';
                    ok = true;
                    break;
                }
            }
        }
        countriesAutocompleteHTML += '</ul>';
        if(ok) {
            document.getElementById('countries-autocomplete').innerHTML = countriesAutocompleteHTML;
        }
    }