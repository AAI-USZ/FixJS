function() {
        if (window && window.XMLHttpRequest) return new XMLHttpRequest(); 
        if (window && window.ActiveXObject) return new ActiveXObject("Microsoft.XMLHTTP"); 
        throw new Error("Request object is not available");
    }