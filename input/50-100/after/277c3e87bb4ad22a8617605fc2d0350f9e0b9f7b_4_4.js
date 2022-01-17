function() {
    var valueAt = this.value;

    if ( (direction > 0 && valueAt === 255) ||
          (direction < 0 && valueAt === 0) ||
            valueAt === val ) {

      this.stop();
    } else {
      this.brightness( valueAt + direction );
    }
  }