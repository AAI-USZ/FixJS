function(comment){
      for( var i = 0; i < comment.length; ++i ){
        if( comment[i] === this.tagMarker && comment[i-1] !== '\\' ){
          break;
        }
      } // read until next @. respect escaped @: \@
      return comment.substring(0, i);
    }