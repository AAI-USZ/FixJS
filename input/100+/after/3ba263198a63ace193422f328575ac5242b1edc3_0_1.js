function onDeviceReady( event ) {
    console.log("deviceready");
    alert("Device ready");
    //initialize salesforce wrapper
    sfw = new SalesforceWrapper();
    
    //load Mousetache HTML templates
    for (var key in templates) {
        (function() {
            var _key = key.toString();
            if ( _key != "loaded" && _key != "requested" ){
                templates.requested ++;
         
                 var templateLoaded = function( template ){
                    onTemplateLoaded( template, _key );
                 }
                
                $.get( templates[ _key ], templateLoaded );
             }
         })();
    }
    alert("Mousetache templates loaded")
}