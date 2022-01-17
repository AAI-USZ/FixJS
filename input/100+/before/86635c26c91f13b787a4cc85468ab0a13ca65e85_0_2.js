function bailout () {
    var drain, message, vargs = __slice.call(arguments, 0);
    if (vargs.length == 1 && vargs[0] instanceof Error) {
      vargs = [ vargs[0].message, vargs[0].stack ];
    }
    if (typeof vargs[0] == "string" && !/\n/.test(vargs[0])) {
      message = "Bail out! " + vargs.shift() + "\n";
    } else {
      message = "Bail out!\n";
    }
    process.stdout.write(message);
    if (vargs.length) comment(util.format.apply(util.format, vargs));
    require("fs").writeSync(1, "", 0);
    process.exit(1);
  }