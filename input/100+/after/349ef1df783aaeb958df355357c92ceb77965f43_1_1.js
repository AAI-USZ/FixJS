function(test) {
    test.expect(11);
    
    var now = +new Date / 1000,
        tester,
        data;

    var originalHtml = '<h1>the time is now</h1>';
    tester = $('<div data-livestamp="' + now + '">' + originalHtml + '</div>').appendTo('#test-area');
    $.livestamp.update();
    data = tester.data('livestampdata');
    test.notEqual(data, undefined, 'The internal data is stored in "livestampdata"');
    test.ok(data.original instanceof jQuery, 'A jQuery object is stored in the "original" property');
    test.equal(data.original.clone().wrap('<div>').parent().html().toLowerCase(), originalHtml, 'The original HTML is stored in the jQuery object');
    test.ok(moment.isMoment(data.moment), 'A Moment object is stored in the "moment" property');
    test.equal(data.moment.valueOf(), now * 1000, 'The timestamp is stored in the Moment object');
    test.equal(tester.attr('data-livestamp'), undefined, 'The data-livestamp attribute is removed');
    test.equal(tester.data('livestamp'), undefined, 'The jQuery "livestamp" data property is removed');

    tester = $('<div data-livestamp=""></div>').appendTo('#test-area');
    $.livestamp.update();
    data = tester.data('livestampdata');
    test.equal(data, undefined, 'Empty data-livestamp doesn\'t store data');
    test.notEqual(tester.attr('data-livestamp'), undefined, 'Empty data-livestamp doesn\'t remove data-livestamp');

    tester = $('<div data-livestamp="foo"></div>').appendTo('#test-area');
    $.livestamp.update();
    data = tester.data('livestampdata');
    test.equal(data, undefined, 'Invalid data-livestamp doesn\'t store data');
    test.notEqual(tester.attr('data-livestamp'), undefined, 'Invalid data-livestamp doesn\'t remove data-livestamp');
    
    $('#test-area').empty();
    test.done();
  }