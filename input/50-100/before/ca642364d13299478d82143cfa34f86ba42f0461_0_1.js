function persist(data) {
  thedrawing.push(data);
  fs.writeFile('persist.json', JSON.stringify(thedrawing));
}