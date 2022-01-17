function (config, modules) {
  "use strict";
  this.connectedPzh   = {}; // Stores PZH server details
  this.connectedPzp   = {}; // Stores connected PZP information
  this.connectedWebApp = {}; // List of connected apps i.e session with browser
  this.sessionWebApp   = 0;
  this.config         = {}//Configuration details of Pzp (certificates, file names)
  this.tlsId           = ""; // Used for session reuse
  this.serviceListener;   // For a single callback to be registered via addRemoteServiceListener.
  this.state          = global.states[0]; // State is applicable for hub mode but for peer mode, we need to check individually
  this.mode          = global.modes[0]; //  4 modes a pzp can be, for peer mode, each PZP needs to be checked if it is connected
  this.initializePzp(config, modules);
}