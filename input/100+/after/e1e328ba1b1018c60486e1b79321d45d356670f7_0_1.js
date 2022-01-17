function() {
      if ( i >= svgSlideIds.length ) {
        clearInterval( addSlideInterval );

        return;
      }

      var svgSlideId = svgSlideIds[ i ],
          svgSlide = root.cloneNode( true );

      // We only want embedded fonts to be included in the first slide, because from there it will be
      // usable from the others, so we remove them from the root after the first slide is cloned.
      if ( i === 0 ) {
        $( "font, font-face, missing-glyph", root ).remove();
      }

      var j, candidate, cruftsAndSlide = svgSlide.querySelectorAll( ".libreoffice-slide" );

      for ( j = 0; j < cruftsAndSlide.length; j++ ) {
        candidate = cruftsAndSlide[ j ];

        if ( candidate.getAttribute( "id" ) !== svgSlideId ) {
          candidate.parentNode.removeChild( candidate );
        } else {
          candidate.setAttribute( "visibility", "visibile" );
        }
      }

      var hiddenElements = svgSlide.querySelectorAll( "[visible=hidden]" );

      // Remove hidden elements - they're of no interest to us.
      for ( j = 0; j < hiddenElements.length; j++ ) {
        hiddenElements[ j ].parentNode.removeChild( hiddenElements[ j ] );
      }

      stripSVGCruft( svgSlide );

      var container = document.querySelector( ".deck-container" );

      var slideEl = document.createElement( "section" ),
          transEl = document.createElement( "div" );

      slideEl.setAttribute( "class", "slide" );
      slideEl.setAttribute( "data-popcorn-slideshow", start + i * 1 ); // TODO better start times

      transEl.setAttribute( "class", "transcript" );

      slideEl.appendChild( transEl );
      
      slideEl.appendChild( svgSlide );

      container.appendChild( slideEl );

      jQuery(".com\\.sun\\.star\\.drawing\\.LineShape mask", svgSlide).remove();

      // Need to do this after adding to document or overlaySelectableSpans's
      // will get confused about the geometry.
      var svgContainerEl = SVGContainer( svgSlide )
        .padTextViewports()
        .overlaySelectableSpans() // fix text selection in Firefox
        .joinAdjacentTextEls() // fix text selection in Chrome
        .fixXlinkAttrs() // fix serialization in Chrome
        // .scaleTo( "height" )
        .containerEl;

      // svgContainerEl.style.height = "100%";

      track.addTrackEvent({
        type: "slidedrive",
        popcornOptions: SlideButterOptions( slideEl )
      });

      cumulativeDuration += 5;

      initDeck();

      i++;
    }