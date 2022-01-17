function identify(location, type, rootPath, jetpackPath) {
  return stripExtension(
    type === 'local' ? relativify(path.relative(rootPath, location)) :
    type === 'external' ? relativify(path.relative(rootPath, location)) :
    type === 'std' ? path.relative(path.join(rootPath, 'lib'), location) :
    type === 'system' ? location :
    type === 'deprecated' ? location :
    null);
}