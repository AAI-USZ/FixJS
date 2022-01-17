function() {
    var Class = makeCtor(), proto;
    Class.ClassMixin = Ember.Mixin.create(this.ClassMixin);
    Class.PrototypeMixin = Ember.Mixin.create(this.PrototypeMixin);

    Class.ClassMixin.ownerConstructor = Class;
    Class.PrototypeMixin.ownerConstructor = Class;

    reopen.apply(Class.PrototypeMixin, arguments);

    Class.superclass = this;
    Class.__super__  = this.prototype;

    proto = Class.prototype = o_create(this.prototype);
    proto.constructor = Class;
    Ember.generateGuid(proto, 'ember');
    meta(proto).proto = proto; // this will disable observers on prototype

    Class.ClassMixin.apply(Class);
    return Class;
  }