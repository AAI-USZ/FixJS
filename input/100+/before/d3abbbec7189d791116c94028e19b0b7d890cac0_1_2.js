function() {
    equals(doc.escape('title'), 'The Tempest');
    doc.set({audience: 'Bill & Bob'});
    equals(doc.escape('audience'), 'Bill &amp; Bob');
    doc.set({audience: 'Tim > Joan'});
    equals(doc.escape('audience'), 'Tim &gt; Joan');
    doc.set({audience: 10101});
    equals(doc.escape('audience'), '10101');
    doc.unset('audience');
    equals(doc.escape('audience'), '');
  }