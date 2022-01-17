function(e, el) {
    var stats;
    stats = model.at('_user.stats');
    stats.set('hp', 50);
    stats.set('lvl', 1);
    stats.set('exp', 0);
    stats.set('money', 0);
    model.set('_user.items.armor', 0);
    model.set('_user.items.weapon', 0);
    model.set('_items.armor', content.items.armor[1]);
    return model.set('_items.weapon', content.items.weapon[1]);
  }