function(constructor, stack) {
  if (!this.currentProducerProfile_) return;
  if (stack.length == 0) return;
  var first = stack.shift();
  var processedStack =
      this.profile_.resolveAndFilterFuncs_(this.processStack(first, 0, stack));
  processedStack.unshift(constructor);
  this.currentProducerProfile_.addPath(processedStack);
}