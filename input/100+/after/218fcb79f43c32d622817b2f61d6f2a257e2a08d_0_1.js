function writeShim_ (from, to, prog, args, cb) {
  var shTarget = path.relative(path.dirname(to), from)
    , target = shTarget.split("/").join("\\")
    , longProg
    , shProg = prog && prog.split("\\").join("/")
    , shLongProg
  shTarget = shTarget.split("\\").join("/")
  args = args || ""
  if (!prog) {
    prog = "\"%~dp0\\" + target + "\""
    shProg = "\"$basedir/" + shTarget + "\""
    args = ""
    target = ""
    shTarget = ""
  } else {
    longProg = "\"%~dp0\\" + prog + ".exe\""
    shLongProg = "\"$basedir/" + prog + "\""
    target = "\"%~dp0\\" + target + "\""
    shTarget = "\"$basedir/" + shTarget + "\""
  }

  // @IF EXIST "%~dp0\node.exe" (
  //   "%~dp0\node.exe" "%~dp0\.\node_modules\npm\bin\npm-cli.js" %*
  // ) ELSE (
  //   node "%~dp0\.\node_modules\npm\bin\npm-cli.js" %*
  // )
  var cmd
  if (longProg) {
    cmd = "@IF EXIST " + longProg + " (\r\n"
        + "  " + longProg + " " + args + " " + target + " %*\r\n"
        + ") ELSE (\r\n"
        + "  " + prog + " " + args + " " + target + " %*\r\n"
        + ")"
  } else {
    cmd = prog + " " + args + " " + target + " %*\r\n"
  }

  cmd = ":: Created by npm, please don't edit manually.\r\n" + cmd

  // #!/bin/sh
  // basedir=`dirname "$0"`
  //
  // case `uname` in
  //     *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
  // esac
  //
  // if [ -x "$basedir/node.exe" ]; then
  //   "$basedir/node.exe" "$basedir/node_modules/npm/bin/npm-cli.js" "$@"
  //   ret=$?
  // else
  //   node "$basedir/node_modules/npm/bin/npm-cli.js" "$@"
  //   ret=$?
  // fi
  // exit $ret

  var sh = "#!/bin/sh\n"

  if (shLongProg) {
    sh = sh
        + "basedir=`dirname \"$0\"`\n"
        + "\n"
        + "case `uname` in\n"
        + "    *CYGWIN*) basedir=`cygpath -w \"$basedir\"`;;\n"
        + "esac\n"
        + "\n"

    sh = sh
       + "if [ -x "+shLongProg+" ]; then\n"
       + "  " + shLongProg + " " + args + " " + shTarget + " \"$@\"\n"
       + "  ret=$?\n"
       + "else \n"
       + "  " + shProg + " " + args + " " + shTarget + " \"$@\"\n"
       + "  ret=$?\n"
       + "fi\n"
       + "exit $ret\n"
  } else {
    sh = shProg + " " + args + " " + shTarget + " \"$@\"\n"
       + "exit $?\n"
  }

  fs.writeFile(to + ".cmd", cmd, "utf8", function (er) {
    if (er) {
      log.warn("cmdShim", "Could not write "+to+".cmd")
      return cb(er)
    }
    fs.writeFile(to, sh, "utf8", function (er) {
      if (er) {
        log.warn("shShim", "Could not write "+to)
        return cb(er)
      }
      fs.chmod(to, 0755, cb)
    })
  })
}