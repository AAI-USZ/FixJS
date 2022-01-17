function(){
        $(authCodeElement).value = '';
        $(fbPageIdElement).value = '';
        $(accessTokenElement).value = '';
        $(authorizeElement).innerHTML = 'Connect to FB';
        setButtonHref();
        $(accessTokenElement).fireEvent('change');
    }