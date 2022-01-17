function InspectorExtensionAPI()
{
    this.audits = new Audits();
    this.inspectedWindow = new InspectedWindow();
    this.panels = new Panels();
    this.network = new Network();
    defineDeprecatedProperty(this, "webInspector", "resources", "network");
    this.timeline = new Timeline();
    this.console = new ConsoleAPI();

    this.onReset = new EventSink(events.Reset);
}