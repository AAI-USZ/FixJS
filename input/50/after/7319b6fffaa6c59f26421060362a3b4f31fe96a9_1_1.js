function (error, stdout, stderr) {

  console.log(stderr)
  assert.ok(error !== null,
    'Error executing numb')
  assert.ok(fs.existsSync(process.cwd() + '/Numbfile'),
    'Numbfile wasn\'t created')

}