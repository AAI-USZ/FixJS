function(options) {
    var self = this;
    events.EventEmitter.call(self);
    options = options || {};

    self.log = options.logger;
    self.worker = options.worker;
    self.paths = options.paths;
    self.backup = options.backup;
    self.worlds = options.worlds;
    self.ramWorlds = options.ramWorlds;

    self._defineGetters();
    self._defineSetters();

    self._setupBackupCrons();
}