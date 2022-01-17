function (err) {
    if (err) throw new Error(err);

    --pending;
    process.stdout.write('\033[2K');
    process.stdout.write('\033[0G');
    process.stdout.write('pending ' + pending);
    if (pending) return;

    process.stdout.write('\033[?25h');
    process.stdout.write('\033[2K');
    process.stdout.write('\033[0G');
    var leaks = gleak.detect();
    assert.equal(0, leaks.length, "global leaks detected: " + leaks);
    console.error("\n\u001B[32mAll tests passed\u001B[0m");
  }