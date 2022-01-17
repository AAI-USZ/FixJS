function(){
        this.contract = new ExprContract();
        this.argumentNames = undefined;
        this.expr = undefined;
        this.id = makeID();
        this.funcIDList = makeIDList(1);
}