function() {
    this.sandbox.setTransformOrigin("30% 50%");
    if (q.env.get("css.transform") != null) {
      this.assertEquals("30% 50%", this.sandbox.getTransformOrigin());
    }
  }