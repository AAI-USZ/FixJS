function (req, _callback)
    {
        Strophe.info("_connect_cb was called");

        this.connected = true;

        var bodyWrap = this.po.reqToData(req);
        if (!bodyWrap) { return; }

        if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
            this.xmlInput(bodyWrap);
        }
        if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
            this.rawInput(Strophe.serialize(bodyWrap));
        }

        var conncheck = this.po._connect_cb(bodyWrap);
        if (conncheck === Strophe.Status.CONNFAIL) {
            return;
        }

        this._authentication.sasl_scram_sha1 = false;
        this._authentication.sasl_plain = false;
        this._authentication.sasl_digest_md5 = false;
        this._authentication.sasl_anonymous = false;
        this._authentication.legacy_auth = false;

        // Check for the stream:features tag
        var hasFeatures = bodyWrap.getElementsByTagName("stream:features").length > 0;
        if (!hasFeatures) {
            hasFeatures = bodyWrap.getElementsByTagName("features").length > 0;
        }
        var mechanisms = bodyWrap.getElementsByTagName("mechanism");
        var i, mech, auth_str, hashed_auth_str,
            found_authentication = false;
        if (hasFeatures && mechanisms.length > 0) {
            var missmatchedmechs = 0;
            for (i = 0; i < mechanisms.length; i++) {
                mech = Strophe.getText(mechanisms[i]);
                if (mech == 'SCRAM-SHA-1') {
                    this._authentication.sasl_scram_sha1 = true;
                } else if (mech == 'DIGEST-MD5') {
                    this._authentication.sasl_digest_md5 = true;
                } else if (mech == 'PLAIN') {
                    this._authentication.sasl_plain = true;
                } else if (mech == 'ANONYMOUS') {
                    this._authentication.sasl_anonymous = true;
                } else missmatchedmechs++;
            }

            this._authentication.legacy_auth =
                bodyWrap.getElementsByTagName("auth").length > 0;

            found_authentication =
                this._authentication.legacy_auth ||
                missmatchedmechs < mechanisms.length;
        }
        if (!found_authentication) {
            this.po._no_auth_received(_callback);
            return;
        }
        if (this.do_authentication !== false)
            this.authenticate();
    }