function() {
        var 
        optParser,
        opt, 
        displayHelp = false,
        displayDefaultOption = false,
        data,
        config,
        cliReporter = '',
        envReporter = '';
        
        // Command line options
        optParser = new getopt.BasicParser(':heRvmqsj:p:o:r:c:', process.argv);
        while ((opt = optParser.getopt()) !== undefined && !opt.error) {
            switch(opt.option) {
            case 'j': //  jslint file
                this.toLint.shift();
                this.toLint.shift();
                this.jslint_file = opt.optarg;
                break;
                
            case 'o': // jslint_options
                this.toLint.shift();
                this.toLint.shift();
                if (this.jslint_options.length !== 0) {
                    this.jslint_options += ',';
                }
                this.jslint_options += opt.optarg;
                break;
                
            case 'p': // predefined names
                this.toLint.shift();
                this.toLint.shift();
                if (this.jslint_options.length !== 0) {
                    this.jslint_options += ',';
                }
                this.jslint_options += "predef: ['" + opt.optarg.split(',').join("','") + "']";
                break;
                
            case 'c': // jslint_config_file
                this.toLint.shift();
                this.toLint.shift();
                this.jslint_config_file += opt.optarg;
                break;
                
            case 'v': // verbose
                this.toLint.shift();
                this.verbose = true;
                break;
                
            case 'h': // help
                this.toLint.shift();
                displayHelp = true;
                break;
                
            case 'm': // display default options
                this.toLint.shift();
                displayDefaultOption = true;
                break;
                
            case 'q': // quiet
                this.toLint.shift();
                this.quiet = true;
                break;
                
            case 'R': // directory recursive parsing
                this.toLint.shift();
                this.recursive = true;
                break;
                
            case 's': // stop on first error
                this.toLint.shift();
                this.stopOnFirstError = true;
                break;
                
            case 'r': // reporter
                this.toLint.shift();
                this.toLint.shift();                
                cliReporter = opt.optarg;
                cliReporter = cliReporter.trim();
                break;
                
            case 'e': // reporter
                this.toLint.shift();
                envReporter = process.env.JSREVIVAL_REPORTER; 
                envReporter = envReporter.trim();
                break;
                
            default:
                this._error('Invalid or incomplete option');
                JsRevivalApp.displayHelp();
                return process.exit(1); 
            }
        }
        
        if(displayHelp) {
            JsRevivalApp.displayHelp();
            return process.exit();
        }
        
        if(displayDefaultOption) {
            this.displayDefaultOption();
            return process.exit();
        }
        
        
        // Reporter
        if (cliReporter !== '') {
            this.reporterName = cliReporter;
        }
        if (envReporter !== '' ) {
            this._log('Reading reporter from user environment: ', envReporter);
            this.reporterName = envReporter;
        }
        if (!this.reporterName) {
            this._error('Reporter name is undefined!');
            return process.exit(1);
        }
        
        // nothing to lint
        if (this.toLint.length === 0) {
            this._error('Nothing to lint!');
            return process.exit(1);
        }
        
        // reporter        
        try {
            this.reporter = require('./reporter/' + this.reporterName);
        } catch(e) {
            this._error('Reporter not found: '+ this.reporterName);
            return process.exit(1);
        }
        this.reporter = this.reporter.create();
        this._log('Reporter: ', this.reporterName);
        
        // Verbose mode
        if(this.verbose) {
            this._log('Verbose mode enabled');
        }
        
        if (this.stopOnFirstError) {
            this._log('Stop on first file error enabled');
        }
        
        if(this.jslint_config_file !== '') {
            this._log('Reading jslint config from: ', this.jslint_config_file);
            try {
                data = fs.readFileSync(this.jslint_config_file, 'utf-8');
            } catch(err) {
                if (err.code === 'ENOENT') {
                    this._error('jslint_config_file not found! ('+ this.jslint_config_file + ')');
                } else {
                    this._error(err);
                }
                return process.exit(1);
            }
            
            try {
                config = jsonlint.parse(data);
            } catch (err2) {
                this._error(err2);
                return process.exit(1);
            }
            this.jslint_options =  'options = ' + data;
            
        } else  if (this.jslint_options !== ''){
            this._log('Reading jslint config from command line');
            // Set from -o and -p option
            this.jslint_options = 'options = {' + this.jslint_options + '}';
        }
    }