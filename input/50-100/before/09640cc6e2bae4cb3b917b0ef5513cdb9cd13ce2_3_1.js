function(type, elementType){
    if (typeof type === 'string')
        type = Container.resolveType(type);
        
    if (typeof elementType === 'string')
        elementType = Container.resolveType(elementType);

    return this.extend({
        returnType: type,
        elementType: elementType
    });
}