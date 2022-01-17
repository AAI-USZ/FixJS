function() {
    var valueAt = priv.get( this ).value;

    if ( (direction > 0 && valueAt === 255) ||
          (direction < 0 && valueAt === 0) ||
            valueAt === val ) {

      clearInterval( this.interval );
    } else {
      this.brightness( valueAt + direction );
    }
  }