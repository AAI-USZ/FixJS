function (root, ignoreDirs) {
  if (!ignoreDirs.length) { return false }
  ignoreDirs.forEach(function (dir) {
    if (root.indexOf(dir) > -1) {
      return true 
    }
  })
  return false 
}