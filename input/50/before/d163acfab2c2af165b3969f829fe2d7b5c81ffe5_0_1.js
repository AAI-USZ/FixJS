function basename(p){
  utils.assertString(p, 'path');
  return path.basename(p.val);
}