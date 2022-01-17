function() {
    expect(2);

    var member = 'a';
    var nonmember = 'b';
    var obj = new Exhibit.Set([member]);

    ok(obj.contains(member), "Exhibit.Set(['a']).contains('a')");
    ok(!obj.contains(nonmember), "Exhibit.Set(['a']).contains('b')");
}