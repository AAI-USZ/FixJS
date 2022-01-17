function(keyPair, accessKey)
    {
        // Make sure we have directory
        if (!this.makeKeyHome()) return 0

        // Save access key into file
        var file = this.getCredentialFile(keyPair.name);
        if (!accessKey) accessKey = { id: this.accessKey, secret: this.secretKey };
        if (!FileIO.write(FileIO.open(file), "AWSAccessKeyId=" + accessKey.id + "\nAWSSecretKey=" + accessKey.secret + "\n")) {
            return alert('Unable to create credentials file ' + file + ", please check directory permissions");
        }

        // Setup environment
        if (keyPair) {
            this.setEnv("AWS_CREDENTIAL_FILE", this.getCredentialFile(keyPair.name));
            this.setEnv("EC2_PRIVATE_KEY", this.getPrivateKeyFile(keyPair.name));
            this.setEnv("EC2_CERT", this.getCertificateFile(keyPair.name));
        }
        this.setEnv("EC2_URL", this.urlEC2);
        this.setEnv("AWS_IAM_URL", this.urlIAM);
        this.setEnv("AWS_CLOUDWATCH_URL", this.urlCW);

        // Current PATH
        var path = this.getEnv("PATH");
        var sep = isWindows(navigator.platform) ? ";" : ":";

        // Update path to the command line tools
        var paths = ["ec2", "java", "iam", "ami", "cloudwatch", "autoscaling"];
        for(var i in paths) {
            var p = this.getStrPrefs("ew.path." + paths[i], "");
            if (p == "") {
                continue;
            }
            this.setEnv(paths[i].split(".").pop().toUpperCase(), p);
            path += sep + p + DirIO.slash + "bin";
        }
        debug(path)
        this.setEnv("PATH", path);
        this.launchProcess(this.getShellCommand(), this.getStrPrefs("ew.shell.args"));
    }