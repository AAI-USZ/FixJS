function(){
        this.contract = new ExprContract();
        this.argumentNames = undefined;
        this.expr = undefined;
        this.funcIDList = makeIDList(1);
        this.id = makeID();
}