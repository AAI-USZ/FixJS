function(context)
    {
        return (!this.isInOtherPanel(context) && Firebug.commandEditor) ? 
                this.getCommandEditor():
                this.getSingleRowCommandLine();
    }