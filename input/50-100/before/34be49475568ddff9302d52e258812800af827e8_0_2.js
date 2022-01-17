function(){
        $(authCodeElement).value = '';
        $(fbPageIdElement).value = '';
        $(accessTokenElement).value = '';
        setButtonHref();
        $(accessTokenElement).fireEvent('change');
    }