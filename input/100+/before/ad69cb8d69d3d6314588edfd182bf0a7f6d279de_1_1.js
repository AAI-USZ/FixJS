function(keyname)
    {
        // Make sure we have directory
        if (!this.makeKeyHome()) return 0

        var certfile = this.getCertificateFile(keyname);
        var keyfile = this.getPrivateKeyFile(keyname);
        var pubfile = this.getPublicKeyFile(keyname);
        var openssl = this.getOpenSSLCommand();
        var conffile = this.getKeyHome() + DirIO.sep + "openssl.cnf"

        // Make sure we do not lose existing private keys
        if (FileIO.exists(keyfile)) {
            if (!confirm('Private key file ' + keyfile + ' already exists, it will be overwritten, OK continue?')) return null;
        }

        FileIO.remove(certfile);
        FileIO.remove(keyfile);
        FileIO.remove(pubfile);
        FileIO.remove(conffile);

        // Create openssl config file
        var confdata = "[req]\nprompt=no\ndistinguished_name=n\nx509_extensions=c\n[c]\nsubjectKeyIdentifier=hash\nauthorityKeyIdentifier=keyid:always,issuer\nbasicConstraints=CA:true\n[n]\nCN=EC2\nOU=EC2\nemailAddress=ec2@amazonaws.com\n"
        if (!FileIO.write(FileIO.open(conffile), confdata)) {
            return alert('Unable to create file ' + conffile + ", check permissions, aborting");
        }

        // Create private and cert files
        this.setEnv("OPENSSL_CONF", conffile);
        this.launchProcess(openssl, [ "genrsa", "-out", keyfile, "1024" ], true);
        if (!waitForFile(keyfile, 5000)) {
            debug("ERROR: no private key generated")
            FileIO.remove(conffile);
            return 0
        }
        FileIO.open(keyfile).permissions = 0600;

        this.launchProcess(openssl, [ "req", "-new", "-x509", "-nodes", "-sha1", "-days", "730", "-key", keyfile, "-out", certfile, "-config", conffile ], true);
        if (!waitForFile(certfile, 5000)) {
            debug("ERROR: no certificate generated")
            FileIO.remove(conffile);
            return 0
        }

        // Create public file
        this.launchProcess(openssl, [ "rsa", "-in", keyfile, "-pubout", "-out", pubfile ], true)
        // Wait a little because if process is running in the background on Windows it may take some time but we return immediately
        if (!waitForFile(pubfile, 5000)) {
            debug("ERROR: no public file generated")
            FileIO.remove(conffile);
            return 0
        }
        FileIO.remove(conffile);

        return FileIO.toString(certfile)
    }