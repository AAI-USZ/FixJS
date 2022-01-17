function(thoonkobject, instance, event_handler) {
    EventEmitter.call(this);
    this.thoonk = thoonkobject.thoonk;
    this.instance = instance;
    this.objtype = thoonkobject.objtype;
    this.thoonkobject = thoonkobject;
    this.sub = this.objtype + '::' + this.instance;
    this.subscribables = thoonkobject.subscribables;
    this.init_subscribe(event_handler);
}