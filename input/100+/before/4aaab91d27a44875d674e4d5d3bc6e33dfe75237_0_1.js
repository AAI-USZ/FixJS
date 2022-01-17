function createTargetsList ( trackEvent ) {
      var propertyRootElement = __defaultLayouts.querySelector( ".trackevent-property.targets" ).cloneNode( true ),
          selectElement = propertyRootElement.querySelector( "select" ),
          mediaOptionElement = selectElement.firstChild,
          optionElement;

      for ( var i=1; i<_targets.length; ++i ) {
        optionElement = document.createElement( "option" );
        optionElement.value = _targets[ i ].element.id;
        optionElement.innerHTML = _targets[ i ].element.id;
        selectElement.insertBefore( optionElement, mediaOptionElement );
      }

      attachSelectChangeHandler( selectElement, trackEvent, "target" );

      return propertyRootElement;
    }