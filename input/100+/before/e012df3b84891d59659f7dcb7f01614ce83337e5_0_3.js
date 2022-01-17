function createSpecializedPartial(instance, subs, partials) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.ib();

    for (key in subs) {
      partial.subs[key] = subs[key];
    }

    for (key in partials) {
      partial.partials[key] = partials[key];
    }

    return partial;
  }