function set(value) {
    if (value === this.value) return;
    ASSERT(!this.isChanged(), "overlapping writes");
    this.changeEvent = { set: true,
      log : "set " + this + " : " + 
        ((typeof this.value === "function")
         ? "<function>" : JSON.stringify(this.value)) + " ==> " +
        ((typeof value === "function")
         ? "<function>" : JSON.stringify(value))
    };
    this.value = value;
  }