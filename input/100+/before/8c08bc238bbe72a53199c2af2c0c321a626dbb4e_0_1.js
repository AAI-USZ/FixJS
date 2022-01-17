function(expect, complete) {
  var requirerPath = fixtures.resolve('a', 'main.js');
  var requirerType = 'local';
  var findPath = fixtures.resolve('JETPACK_PATH', '1.8', 'packages',
                                  'addon-kit', 'lib', 'panel.js');
  var searchTerm = 'panel';

  var actual = search(searchTerm, requirerPath, requirerType, {
    rootPath: fixtures.resolve('a'),
    jetpackPath: fixtures.resolve('JETPACK_PATH', '1.8'),
    packageDescriptors: makePackageDescriptors(fixtures.resolve('a')),
    backwardsCompatible: true
  });

  expect(actual).to.be(makeDep('panel', findPath, 'core')).then(complete);
}