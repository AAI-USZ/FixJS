function(htmlWebFile, externalWebFiles)

{

    try

    {

        this.htmlWebFile = htmlWebFile;

        this.externalWebFiles = externalWebFiles;



        this.hostDocument = Firecrow.getDocument();

        this.documentFragment = this.hostDocument.createDocumentFragment();



        this.globalObject = new GlobalObject(this, this.documentFragment);



        this.nodeCreatedCallbacks = [];

        this.nodeInsertedCallbacks = [];

        this.interpretJsCallbacks = [];



        this.dataDependencyEstablishedCallbacks = [];

        this.controlDependencyEstablishedCallbacks = [];

        this.interpreterMessageGeneratedCallbacks = [];

        this.controlFlowConnectionCallbacks = [];

        this.importantConstructReachedCallbacks = [];

        this.slicingCriteria = [];

        this.errorMessages = [];



        if(!Firecrow.IsDebugMode)

        {

            var errorMessages = this.errorMessages



            Firecrow.Interpreter.Commands.CommandGenerator.notifyError = function(message) { errorMessages.push("CommandGenerator - " + message); };

            Firecrow.Interpreter.Commands.Command.notifyError = function(message) { errorMessages.push("Command - " + message); };

            Firecrow.CodeTextGenerator.notifyError = function(message) { errorMessages.push("CodeTextGenerator - " + message); }

            Firecrow.DependencyGraph.DependencyGraph.notifyError = function(message) { errorMessages.push("DependencyGraph - " + message); }

            Firecrow.Interpreter.Model.GlobalObject.notifyError = function(message) { errorMessages.push("GlobalObject - " + message); }

            Firecrow.DependencyGraph.DependencyPostprocessor.notifyError = function(message) { errorMessages.push("DependencyPostprocessor - " + message); }

            Firecrow.DependencyGraph.Edge.notifyError = function(message) { errorMessages.push("Edge - " + message); }

            Firecrow.DependencyGraph.InclusionFinder.notifyError = function(message) { errorMessages.push("InclusionFinder - " + message); }

            Firecrow.DependencyGraph.Node.notifyError = function(message) { errorMessages.push("Node - " + message); }

            Firecrow.DoppelBrowser.Browser.notifyError = function(message) { errorMessages.push("Browser - " + message); }

            Firecrow.Interpreter.Model.RegEx.notifyError = function(message) { errorMessages.push("RegEx - " + message); }

            Firecrow.Interpreter.Model.String.notifyError = function(message) { errorMessages.push("String - " + message); }

            Firecrow.Interpreter.Model.Array.notifyError = function(message) { errorMessages.push("Array - " + message); }

            Firecrow.Interpreter.Model.Attr.notifyError = function(message) { errorMessages.push("Attr - " + message); }

            Firecrow.Interpreter.Model.Identifier.notifyError = function(message) { errorMessages.push("Identifier - " + message); }

            Firecrow.Interpreter.Model.JsValue.notifyError = function(message) { errorMessages.push("JsValue - " + message); }

            Firecrow.Interpreter.Model.Object.notifyError = function(message) { errorMessages.push("Object - " + message); }

            Firecrow.Interpreter.Model.Math.notifyError = function(message) { errorMessages.push("Math - " + message); }

            Firecrow.Interpreter.Simulator.Evaluator.notifyError = function(message) { errorMessages.push("Evaluator - " + message); }

            Firecrow.Interpreter.Simulator.ExecutionContext.notifyError = function(message) { errorMessages.push("ExecutionContext - " + message); }

            Firecrow.Interpreter.Simulator.InternalExecutor.notifyError = function(message) { errorMessages.push("InternalExecutor - " + message); }

            Firecrow.Interpreter.Simulator.VariableObject.notifyError = function(message) { errorMessages.push("VariableObject - " + message); }

            Firecrow.Interpreter.InterpreterSimulator.notifyError = function(message) { errorMessages.push("InterpreterSimulator - " + message); }



            Firecrow.DependencyGraph.Node.LAST_ID = 0;

            Firecrow.Interpreter.Model.JsValue.LAST_ID = 0;

            Firecrow.Interpreter.Commands.Command.LAST_COMMAND_ID = 0;

            Firecrow.Interpreter.Model.Identifier.LAST_ID = 0;

            Firecrow.Interpreter.Model.Object.LAST_ID = 0;

        }

    }

    catch(e) { Firecrow.DoppelBrowser.Browser.notifyError("Error when initialising Doppel Browser.Browser: " + e); }

}