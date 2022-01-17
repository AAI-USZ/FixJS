function(context)
    {
        return (!this.isInOtherPanel(context) && Firebug.commandEditor) ? 
                this.getCommandEditor().getCommands() :
                this.getSingleRowCommandLine().value;
    }