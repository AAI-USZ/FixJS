function publishChange() {
    ASSERT(this.isChanged(), "expected a change to publish");
    LOG(this.changeEvent.log);
    this.publish("value", this.changeEvent);
    delete this.changeEvent;
  }