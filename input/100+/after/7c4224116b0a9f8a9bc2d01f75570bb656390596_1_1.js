function() {
  var $, Browser, Events, IIMJobs, X, _;

  _ = require('underscore');

  $ = require('jquery');

  Browser = require('zombie');

  Events = require('events').EventEmitter;

  IIMJobs = (function() {

    IIMJobs.name = 'IIMJobs';

    _.extend(IIMJobs.prototype, Events.prototype);

    function IIMJobs() {
      this.initialize.apply(this, arguments);
    }

    IIMJobs.prototype.initialize = function(options) {
      console.log("Something here");
      return console.log(this);
    };

    return IIMJobs;

  })();

  X = new IIMJobs();

}