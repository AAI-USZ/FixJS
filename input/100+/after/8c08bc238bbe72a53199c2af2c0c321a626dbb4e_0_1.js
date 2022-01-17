function(expect, complete) {
  var requirerPath = fixtures.resolve('a', 'main.js');
  var requirerType = 'local';
  var findPath = fixtures.resolve('JETPACK_PATH', '1.8', 'packages',
                                  'addon-kit', 'lib', 'tabs.js');
  var searchTerm = 'tabs';

  var actual = search(searchTerm, requirerPath, requirerType, {
    rootPath: fixtures.resolve('a'),
    jetpackPath: fixtures.resolve('JETPACK_PATH', '1.8'),
    packageDescriptors: makePackageDescriptors(fixtures.resolve('a')),
    backwardsCompatible: true
  });

  expect(actual).to.be(makeDep('tabs', findPath, 'core')).then(complete);
}