function() {
            window.location = ((typeof PhoneGap != 'undefined' && PhoneGap) ? 
            				  'maps:q=' : 'https://maps.google.com/maps?q=') + address;
        }