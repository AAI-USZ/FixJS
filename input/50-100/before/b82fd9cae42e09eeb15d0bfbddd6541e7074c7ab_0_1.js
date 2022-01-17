function() {
      this.crateTexture = gl.createTexture();
      this.crateTexture.image = new Image();
      this.crateTexture.image.src = "model/wood_floor_parquet_.jpg";
      return this.crateTexture.image.onload = this.hmm(this.crateTexture);
    }