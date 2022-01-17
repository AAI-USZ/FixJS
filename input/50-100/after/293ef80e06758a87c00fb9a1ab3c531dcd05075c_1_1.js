function() {
    expect(3);

    var member = 'a';
    var member2 = false;
    var nonmember = 'b';
    var obj = new Exhibit.Set([member, member2]);

    ok(obj.contains(member), "Exhibit.Set(['a', false]).contains('a')");
    ok(!obj.contains(nonmember), "Exhibit.Set(['a', false]).contains('b')");
    ok(obj.contains(member2), "Exhibit.Set['a', false]).contains(false)");
}