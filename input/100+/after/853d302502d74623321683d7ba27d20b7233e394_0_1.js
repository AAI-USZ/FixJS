function(err, props) {
    props.dom = /y/i.test(props.dom);
    props.min_concat = /y/i.test(props.min_concat);
    props.package_json = /y/i.test(props.package_json);
    props.require_js = /y/i.test(props.require_js);
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
  }