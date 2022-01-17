function(result) {
        navigator.notification.confirm(result.text, confirmCallback, "Scanned", "Ok,Cancel");
        
        //alert("Scanned Code: " + result.text);
        
        // @seealso result.format, result.cancelled
    }