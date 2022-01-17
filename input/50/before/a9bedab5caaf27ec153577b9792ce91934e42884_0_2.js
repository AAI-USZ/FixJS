function(funcName, args){
        this.funcName = funcName;
        this.funcIDList = makeIDList(args.length);
        this.args = args;
        this.outputType = getOutput(funcName);
        this.id = makeID();
}