function (agentOptions, optionsArg) {
  var options = {}
  if (agentOptions) {
    for (option in optionsArg) {
      options[option] = optionsArg[option]
    }
  }
  options.agent = new ForeverAgent(agentOptions)
  return request.defaults(options)
}