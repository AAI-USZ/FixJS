function(element){
    this._element = element;
    var add_link = element.find('#add-group');
    var adder = new GroupAdderWidget();
    adder.decorate(add_link);

    var groups_container = new GroupsContainer();
    groups_container.decorate(element.find('ul'));
    adder.setGroupsContainer(groups_container);
    //todo - add group deleters
}