function createManifestItem ( name, manifestEntry, data, trackEvent ) {
      var elem = manifestEntry.elem || "default",
          propertyArchetype = __defaultLayouts.querySelector( ".trackevent-property." + elem ).cloneNode( true ),
          input,
          select,
          itemLabel = manifestEntry.label || name;

      if ( itemLabel === "In" ) {
        itemLabel = "Start (seconds)";
      } else if ( itemLabel === "Out" ) {
        itemLabel = "End (seconds)";
      }

      propertyArchetype.querySelector( ".property-name" ).innerHTML = itemLabel;
      if ( manifestEntry.elem === "select" ) {
        select = propertyArchetype.querySelector( "select" );
        select.setAttribute( "data-manifest-key", name );
        attachSelectChangeHandler( select, trackEvent, name );
      }
      else {
        input = propertyArchetype.querySelector( "input" );
        if ( data ) {
          // Don't print "undefined" or the like
          if ( data === undefined || typeof data === "object" ) {
            if ( manifestEntry.default ) {
              data = manifestEntry.default;
            } else {
              data = manifestEntry.type === "number" ? 0 : "";
            }
          }
          input.value = data;
        }
        input.type = manifestEntry.type;
        input.setAttribute( "data-manifest-key", name );
        if ( [ "start", "end" ].indexOf( name ) > -1 ) {
          attachStartEndHandler( input, trackEvent, name );
        }
        else {
          if ( input.type === "checkbox" ) {
            attachCheckboxChangeHandler( input, trackEvent, name );
          }
          else {
            attachInputChangeHandler( input, trackEvent, name );
          }
          
        }
      }

      return propertyArchetype;
    }