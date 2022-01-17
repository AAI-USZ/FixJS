function(variableObject, scopeChain, thisObject, globalObject, contextCreationCommand)

{

    try

    {

        this.variableObject = variableObject || globalObject.globalVariableObject;

        this.thisObject = thisObject || globalObject;



        this.globalObject = globalObject;



        this.scopeChain = ValueTypeHelper.createArrayCopy(scopeChain);

        this.scopeChain.push(this.variableObject);



        this.contextCreationCommand = contextCreationCommand;



        this.codeConstructValuesMapping = {};

    }

    catch(e) { this.notifyError("Error when constructing execution context: " + e); }

}