function () {
    var db = start();

    var lax = new Schema({
        name: { last: String }
    });

    var strict = new Schema({
        name: { last: String }
    }, { strict: true });

    var Lax = db.model('NestedLax', lax, 'nestdoc'+random());
    var Strict = db.model('NestedStrict', strict, 'nestdoc'+random());

    db.close();

    var l = new Lax;
    l.set('name', { last: 'goose', hack: 'xx' });
    l = l.toObject();
    l.name.last.should.equal('goose');
    l.name.hack.should.equal('xx');

    var s = new Strict;
    s.set({ name: { last: 'goose', hack: 'xx' }});
    s = s.toObject();
    s.name.last.should.equal('goose');
    s.name.should.not.have.property('hack');
    should.not.exist(s.name.hack);

    s = new Strict;
    s.set('name', { last: 'goose', hack: 'xx' });
    s.set('shouldnt.exist', ':(');
    s = s.toObject();
    s.name.last.should.equal('goose');
    s.name.should.not.have.property('hack');
    should.not.exist(s.name.hack);
    should.not.exist(s.shouldnt);
  }