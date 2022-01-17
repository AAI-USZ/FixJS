function (a, cb) {
  a.string= "asdfaf";
  a.number = 38383838;
  a.date= new Date;
  a.bool = false;
  a.array.push(3);
  a.dates.push(new Date);
  a.bools.$pushAll([true, false]);
  a.docs.$addToSet({ title: 'woot' });
  a.strings.remove("three");
  a.numbers.$pull(72);
  a.objectids.$pop();
  a.docs.$pullAll(a.docs);
  a.s.nest = "aooooooga";

  if (i%2)
  a.toObject({ depopulate: true });
  else
  a._delta();

  cb();
}