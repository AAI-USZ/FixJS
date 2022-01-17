function basename(p, ext){
  utils.assertString(p, 'path');
  return path.basename(p.val, ext && ext.val);
}