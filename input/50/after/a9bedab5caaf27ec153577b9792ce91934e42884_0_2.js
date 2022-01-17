function(funcName, args){
        this.funcName = funcName;
        this.id = makeID();
        this.funcIDList = makeIDList(args.length);
        this.args = args;
        this.outputType = getOutput(funcName);
}