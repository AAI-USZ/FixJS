function() {
    equal(realModifiers('BUGFOO LINUX LION WIN DEBUG SLOW'), 'SLOW');
    equal(realModifiers('BUGFOO LUCID MAC XP RELEASE SKIP'), 'SKIP');
    equal(realModifiers('BUGFOO'), '');
}