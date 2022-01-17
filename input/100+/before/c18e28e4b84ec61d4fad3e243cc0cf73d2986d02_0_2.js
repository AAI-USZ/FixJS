function() {
  builder.selenium2.rcPlayback.currentStepIndex++;
  if (!builder.selenium2.rcPlayback.requestStop &&
    builder.selenium2.rcPlayback.currentStepIndex < builder.selenium2.rcPlayback.script.steps.length)
  {
    builder.selenium2.rcPlayback.currentStep = builder.selenium2.rcPlayback.script.steps[builder.selenium2.rcPlayback.currentStepIndex];
    builder.selenium2.rcPlayback.types[builder.selenium2.rcPlayback.currentStep.type.getName()](builder.selenium2.rcPlayback.currentStep);
  } else {
    builder.selenium2.rcPlayback.shutdown();
  }
}