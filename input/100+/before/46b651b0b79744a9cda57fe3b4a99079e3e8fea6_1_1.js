function(T) {
  var quoteTests = [
    // - base/pathological cases
    {
      name: 'empty string',
      body: '',
      chunks: [],
    },
    {
      name: 'just whitespace: one newline',
      body: '\n',
      chunks: [],
    },
    {
      name: 'just whitespace: multiple newlines',
      body: '\n\n\n',
      chunks: [],
    },
    {
      name: 'just whitespace: newlines, nbsp',
      body: '\n\xa0\n\n\xa0\n',
      chunks: [],
    },
    // - quoting fundamentals
    {
      name: 'no quoting',
      body: j('Foo', 'bar', '', 'baz'),
      chunks: ['content', j('Foo', 'bar', '', 'baz')],
    },
    {
      name: 'simple bottom posting',
      body: j(
          'John wrote:',
          '> Foo', '>', '> Bar',
          '', 'Baz', '', 'Chaz'
        ),
      chunks: [
          'leadin', j('John wrote:'),
          'q1', j('Foo', '', 'Bar'),
          'content', j('Baz', '', 'Chaz')
        ]
    },
    {
      name: 'simple top posting',
      body: j(
          'Hats are where it is at.', '',
          'Jim Bob wrote:',
          '> I like hats', '> Yes I do!'
        ),
      chunks: [
          'content', 'Hats are where it is at.',
          'leadin', 'Jim Bob wrote:',
          'q1', j('I like hats', 'Yes I do!'),
        ],
    },
    {
      name: 'interspersed reply',
      body: j(
          'John wrote:', '> I like hats',
          'I concur with this point.',
          '> yes I do!',
          '', 'this point also resonates with me.', '',
          '> I like hats!', '> How bout you?',
          '', 'Verily!'
        ),
      chunks: [
          'leadin', 'John wrote:',
          'q1', 'I like hats',
          'content', 'I concur with this point.',
          'q1', 'yes I do!',
          'content', 'this point also resonates with me.',
          'q1', j('I like hats!', 'How bout you?'),
          'content', 'Verily!',
        ],
    },
    {
      name: 'german nbsp',
      body: j(
          'Bob Bob <foo@bob.bob> wrote:', '\xa0',
          '> Robots like to dance',
          'Hats!  Hats!',
          ''
        ),
      chunks: [
          'leadin', 'Bob Bob <foo@bob.bob> wrote:',
          'q1', 'Robots like to dance',
          'content', 'Hats!  Hats!',
        ],
    },
    {
      name: 'leadin fakeout paranoia',
      body: j(
          '> wrote', 'running all the time', '> wrote', 'cheese', ''
        ),
      chunks: [
          'q1', 'wrote',
          'content', 'running all the time',
          'q1', 'wrote',
          'content', 'cheese'
        ],
    },
    // - product boilerplate
    {
      name: 'simple product boilerplate',
      body: j('Foo', '', 'Sent from my iPhone'),
      chunks: [
          'content', 'Foo',
          'product', 'Sent from my iPhone',
        ],
    },
    {
      name: 'simple product boilerplate on top-posting',
      body: j(
          'Yes, dance time.', '', 'Sent from my iPad',
          'John wrote:', '> Dance time?'
        ),
      chunks: [
          'content', 'Yes, dance time.',
          'product', 'Sent from my iPad',
          'leadin', 'John wrote:',
          'q1', 'Dance time?',
        ],
    },
    {
      name: 'android product boilerplate',
      body: j(
          'Foo', '', 'Sent from my Android toaster runing ToastedBagelMail v2.3'
        ),
      chunks: [
          'content', 'Foo',
          'product', 'Sent from my Android toaster runing ToastedBagelMail v2.3',
        ],
    },
    // - legal boilerplate
    {
      name: 'simple legal boilerplate',
      body: j(
          'Foo',
           '________', 'This message is intended only for you.'
        ),
      chunks: [
          'content', 'Foo',
          'disclaimer', j('________', 'This message is intended only for you.'),
        ],
    },
    // - mailing list boilerplate
    {
      name: 'simple mailing list boilerplate',
      body: j(
          'Foo',
          '________', 'dev-b2g mailing list'
        ),
      chunks: [
        'content', 'Foo',
        'list', j('________', 'dev-b2g mailing list'),
      ],
    },
    // - multiple boilerplates at once
    {
      name: 'product, legal, and mailing list boilerplate',
      body: j(
          'Foo', '', 'Sent from Mobile',
          '________', 'dev-b2g mailing list',
          '________', 'This message is intended only for you.'
        ),
      chunks: [
          'content', 'Foo',
          'product', 'Sent from Mobile',
          'list', j('________', 'dev-b2g mailing list'),
          'disclaimer', j('________', 'This message is intended only for you.'),
        ],
    },
  ];

  var eCheck = T.lazyLogger('quoteCheck');
  quoteTests.forEach(function(tdef) {
    T.check(eCheck, tdef.name, function() {
      var i;
      for (i = 0; i < tdef.chunks.length; i += 2) {
        eCheck.expect_namedValue(tdef.chunks[i], tdef.chunks[i+1]);
      }
      eCheck.expect_event('done');

      var rep = $_quotechew.quoteProcessTextBody(tdef.body);
      for (i = 0; i < rep.length; i += 2) {
        var etype = rep[i]&0xf, rtype = null;
        switch (etype) {
          case 0x1:
            rtype = 'content';
            break;
          case 0x2:
            rtype = 'signature';
            break;
          case 0x3:
            rtype = 'leadin';
            break;
          case 0x4:
            rtype = 'q' + ((rep[i] >> 8)&0xff);
            break;
          case 0x5:
            rtype = 'disclaimer';
            break;
          case 0x6:
            rtype = 'list';
            break;
          case 0x7:
            rtype = 'product';
            break;
          case 0x8:
            rtype = 'ads';
            break;
          default:
            rtype = 'unknown:' + etype.toString(16);
            break;
        }
        eCheck.namedValue(rtype, rep[i+1]);
      }
      eCheck.event('done');
    });
  });
}