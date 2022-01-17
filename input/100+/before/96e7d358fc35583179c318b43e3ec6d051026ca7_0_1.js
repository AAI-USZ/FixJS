function (t) {
  client = restify.createClient({
    url: 'http://127.0.0.1:' + PORT,
    type: 'string'
  });
  t.ok(client);
  t.ok(client instanceof restify.StringClient);
  t.end();
}