function (dir) {
  return [
    {
      name: 'name',
      unique: true,
      message: 'App name',
      validator: /[\w|\-]+/,
      default: path.basename(dir)
    },
    {
      name: 'subdomain',
      unique: true,
      validator: /[\w|\-|\_]+/,
      help: [
        '',
        'The ' + 'subdomain '.grey + 'is where your application will reside.',
        'Your application will then become accessible at: http://' + 'yourdomain'.grey + '.jit.su',
        ''
      ],
      default: jitsu.config.get('username') + '.' + path.basename(dir)
    },
    {
      name: 'scripts.start',
      message: 'scripts.start',
      conform: function (script) {
        //
        // Support `scripts.start` starting with executable (`node` or `coffee`).
        //
        var split = script.split(' ');
        if (~['node', 'coffee'].indexOf(split[0])) {
          script = split.slice(1).join(' ');
        }

        try {
          fs.statSync(path.join(dir, script));
          return true;
        }
        catch (ex) {
          return false;
        }
      },
      warning: 'Start script was not found in ' + dir.magenta,
      default: searchStartScript(dir)
    },
    {
      name: 'version',
      unique: false,
      validator: semver.valid,
      default: '0.0.0'
    },
    {
      name: 'engines.node',
      unique: false,
      message: 'engines',
      validator: semver.validRange,
      default: (function () {
        //
        // Use `process.version` to determine the most suitable node version.
        // Strip 'v' from the first part (`process.version` begins with 'v'),
        // return stable version not greater than current version, wildcard
        // patch version.
        //
        var v = process.version.split('.');
        return [v[0].substr(1), v[1] % 2 === 0 ? v[1] : v[1] - 1, 'x'].join('.');
      })()
    }
  ];
}