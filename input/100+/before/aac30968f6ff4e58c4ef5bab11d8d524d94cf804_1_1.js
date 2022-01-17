function () {
    var z = new VIE();
    z.entities.add({
        '@subject': 'http://example.org/EricClapton'
    });
    var clapton = z.entities.get('http://example.org/EricClapton');
    clapton.setOrAdd('plays', 'guitar');
    equal(typeof z.entities.get('http://example.org/EricClapton').get('plays'), "string", "Single values are stored as they are");

    clapton.setOrAdd('plays', 'vocals');
    ok(z.entities.get('http://example.org/EricClapton').get('plays') instanceof Array, "Multiple values are stored as Arrays");
	equal(z.entities.get('http://example.org/EricClapton').get('plays').length, 2);
	
    clapton.unset('plays');
    ok(!clapton.get('plays'), "Property unset");

    clapton.setOrAdd({'plays': 'guitar'});
    equal(typeof clapton.get('plays'), "string", "Single values are stored as they are");

    clapton.setOrAdd({'plays': 'vocals'});
    ok(clapton.get('plays') instanceof Array, "Multiple values are stored as Arrays");
    equal(clapton.get('plays').length, 2);

    clapton.setOrAdd({'plays': 'vocals'});
    equal(clapton.get('plays').length, 3, "Same value twice is the same value and needs to be added twice.");
}