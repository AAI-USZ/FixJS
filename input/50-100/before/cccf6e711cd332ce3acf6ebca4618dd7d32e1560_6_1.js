function(name, resolveNode) {
    if(!this.vars['_'+name]) 
        this.vars['_'+name] = new Variable(resolveNode);
    else if(resolveNode)
        this.vars['_'+name].addDeclaration(resolveNode);
    return this.vars['_'+name];
}