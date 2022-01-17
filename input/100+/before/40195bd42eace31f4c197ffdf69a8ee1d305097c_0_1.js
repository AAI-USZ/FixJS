function () {
  report('foo should be fresh', env.findAsset('foo').isFresh(env));

  write('bar.js', '/*' + Date.now() + '*/');
  report('foo should be stale', !env.findAsset('foo').isFresh(env));

  env.findAsset('foo').compile(function () {
    report('foo should be fresh', env.findAsset('foo').isFresh(env));

    write('foo.js', '/*' + Date.now() + '*/\n//= require bar');
    report('foo should be stale', !env.findAsset('foo').isFresh(env));
  });
}