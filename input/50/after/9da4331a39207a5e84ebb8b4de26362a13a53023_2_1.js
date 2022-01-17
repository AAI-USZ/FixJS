function setup(options, imports, register) {
    ProcessManager = imports["process-manager"];
    EventBus = imports.eventbus;
    Fs = imports["sandbox.fs"];
    
    imports.ide.register(name, NpmRuntimePlugin, register);
}