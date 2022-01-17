function(cb) {
  var grunt = this.grunt;
  grunt.helper('prompt', {}, [
    // Prompt for these values.
    {
      name: 'dom',
      message: 'Is the DOM involved in ANY way?',
      default: 'Y/n',
      warning: 'Yes: QUnit unit tests + JSHint "browser" globals. No: Nodeunit unit tests.'
    },
    {
      name: 'min_concat',
      message: 'Will files be concatenated or minified? (Select no if using require.js to organize and minify your javascript)',
      default: 'Y/n',
      warning: 'Yes: min + concat tasks. No: nothing to see here.'
    },
    {
      name: 'package_json',
      message: 'Will you have a package.json file?',
      default: 'Y/n',
      warning: 'This changes how filenames are determined and banners are generated.'
    },
    {
      name: 'staging',
      message: 'What is the intermediate/ directory for the build script?',
      default: 'intermediate/',
      warning: 'This changes where the files are copied with the mkdirs task.'
    },
    {
      name: 'output',
      message: 'What it is the final build output directory?',
      default: 'publish/',
      warning: 'The final optimized version of your website will be there.'
    },
    {
      name: 'css_dir',
      message: 'What is the CSS directory?',
      default: 'css/',
      warning: 'This is used in the css task, every css files under that directory ' +
        'is concatanated into one file and pass through requirejs optimizer.'
    },
    {
      name: 'js_dir',
      message: 'What is the JS directory?',
      default: 'js/',
      warning: 'This is used in the concat, min and rev task, every js files under that directory ' +
        'is concatanated into one file and compressed via uglifyjs.'
    },
    {
      name: 'img_dir',
      message: 'What is the IMG directory?',
      default: 'img/',
      warning: 'This is used in the rev task.'
    },
    {
      name: 'require_js',
      message: 'Will this project use require.js to organize it\'s javascript?',
      default: 'y/N',
      warning: 'This is used in the rjs task.'
    }
  ], function(err, props) {
    props.dom = /y/i.test(props.dom);
    props.min_concat = /y/i.test(props.min_concat);
    props.package_json = /y/i.test(props.package_json);
    props.test_task = props.dom ? 'qunit' : 'test';
    props.file_name = '<%= pkg.name %>';

    // Guess at some directories, if they exist.
    props.test_dir = 'test';

    // jQuery is default in h5bp setup!
    props.jquery = true;

    // normalize some of the dirs path
    props.js_dir = props.js_dir.replace(/\/$/, '');
    props.css_dir = props.css_dir.replace(/\/$/, '');
    props.img_dir = props.img_dir.replace(/\/$/, '');
    props.output = props.output.replace(/\/$/, '');
    props.staging = props.staging.replace(/\/$/, '');

    cb(null, props);
  });
}