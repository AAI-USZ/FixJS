function createManifestItem ( name, manifestEntry, data, trackEvent ) {
      var elem = manifestEntry.elem || "default",
          propertyArchetype = __defaultLayouts.querySelector( ".trackevent-property." + elem ).cloneNode( true ),
          input,
          select;

      propertyArchetype.querySelector( ".property-name" ).innerHTML = manifestEntry.label || name;
      if ( manifestEntry.elem === "select" ) {
        select = propertyArchetype.querySelector( "select" );
        select.setAttribute( "data-manifest-key", name );
        attachSelectChangeHandler( select, trackEvent, name );
      }
      else {
        input = propertyArchetype.querySelector( "input" );
        if ( data ) {
          input.value = data;  
        }
        input.type = manifestEntry.type;
        input.setAttribute( "data-manifest-key", name );
        attachInputChangeHandler( input, trackEvent, name );
      }

      return propertyArchetype;
    }