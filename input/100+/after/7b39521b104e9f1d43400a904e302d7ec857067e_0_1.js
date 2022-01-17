function definePseudo(loader, id, exports) {
  let uri = resolveURI(id, loader.mapping);
  loader.modules[uri] = { exports: exports };
}