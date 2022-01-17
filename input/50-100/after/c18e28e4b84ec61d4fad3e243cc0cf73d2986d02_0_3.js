function(step) {
  builder.selenium2.rcPlayback.send("POST", "/url", JSON.stringify({'url': step.url}));
}