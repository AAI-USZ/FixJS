function() {
    this.sandbox.setTransformOrigin("30% 10%");
    if (q.env.get("css.transform") != null) {
      this.assertEquals("30% 10%", this.sandbox.getTransformOrigin());
    }
  }