function( dialog, exportData ) {

    var rootElement = dialog.rootElement;

    var jsonButton = rootElement.querySelector( ".json-button" ),
        htmlButton = rootElement.querySelector( ".html-button" ),
        jsonExport = rootElement.querySelector( ".json-export" ),
        htmlExport = rootElement.querySelector( ".html-export" ),
        title = rootElement.querySelector( ".title" );

    title.innerHTML = "HTML Export";

    jsonButton.addEventListener( "click", function( e ){
      title.innerHTML = "Project JSON Data";
      htmlExport.style.display = "none";
      jsonExport.style.display = "block";
      dialog.disableElements( ".json-button" );
      dialog.enableElements( ".html-button" );
    }, false );

    htmlButton.addEventListener( "click", function( e ){
      title.innerHTML = "HTML Export";
      htmlExport.style.display = "block";
      jsonExport.style.display = "none";
      dialog.disableElements( ".html-button" );
      dialog.enableElements( ".json-button" );
    }, false );

    try{
      jsonExport.value = JSON.stringify( exportData.json, null, 2 );
    }
    catch( e ){
      jsonExport.value = "There was an error trying to parse the JSON blob for this project. Please file a bug at https://webmademovies.lighthouseapp.com/projects/65733-butter/ and let us know.";
    }

    htmlExport.value = exportData.html;
    dialog.enableCloseButton();
    dialog.assignEscapeKey( "default-close" );
    dialog.assignEnterKey( "default-close" );
    dialog.disableElements( ".html-button" );
  }