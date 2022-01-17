function resultList (target, where, parentId) {
  var nm = path.resolve(where, "node_modules")
    , targetFolder = path.resolve(nm, target.name)
    , prettyWhere = relativize(where, process.cwd() + "/x")

  if (prettyWhere === ".") prettyWhere = null

  if (!npm.config.get("global")) {
    // print out the folder relative to where we are right now.
    // relativize isn't really made for dirs, so you need this hack
    targetFolder = relativize(targetFolder, process.cwd()+"/x")
  }

  return [ target._id
         , targetFolder
         , prettyWhere && parentId
         , parentId && prettyWhere
         , target._from ]
}