function(name, resolveNode, properDeclarationConfidence, kind) {
    var result;
    if (!this.vars['_'+name]) {
        result = this.vars['_'+name] = new Variable(resolveNode);
    }
    else if (resolveNode) {
        result = this.vars['_'+name];
        result.addDeclaration(resolveNode);
    }
    if (result) {
        result.markProperDeclaration(properDeclarationConfidence);
        result.kind = kind;
    }
    return result;
}