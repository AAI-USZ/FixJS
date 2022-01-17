function publishChange() {
    ASSERT(this.isChanged(), "expected a change to publish");
    this.publish("value");
  }