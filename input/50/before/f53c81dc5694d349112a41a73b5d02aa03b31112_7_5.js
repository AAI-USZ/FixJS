function( $newAtoms ) {
        console.log( $newAtoms )
        instance._addHideAppended( $newAtoms );
        instance.layout( $newAtoms );
        instance._revealAppended( $newAtoms, callback );
      }