function () {
    var z = new VIE();
    z.entities.add({
        '@subject': 'http://example.org/EricClapton'
    });
    var clapton = z.entities.get('http://example.org/EricClapton');
    clapton.setOrAdd('plays', 'guitar');
    equals(typeof z.entities.get('http://example.org/EricClapton').get('plays'), "string", "Single values are stored as they are");

    clapton.setOrAdd('plays', 'vocals');
    ok(z.entities.get('http://example.org/EricClapton').get('plays') instanceof Array, "Multiple values are stored as Arrays");

    clapton.unset('plays');
    ok(!clapton.get('plays'), "Property unset");

    clapton.setOrAdd({'plays': 'guitar'});
    equals(typeof clapton.get('plays'), "string", "Single values are stored as they are");

    clapton.setOrAdd({'plays': 'vocals'});
    ok(clapton.get('plays') instanceof Array, "Multiple values are stored as Arrays");
    equals(clapton.get('plays').length, 2);

    clapton.setOrAdd({'plays': 'vocals'});
    equals(clapton.get('plays').length, 3, "Same value twice is the same value and needs to be added twice.");
}