function (endpoint)
    {
        if (!endpoint) return;
        this.errorCount = 0;
        this.region = endpoint.name;
        this.urls.EC2 = endpoint.url;
        this.versions.EC2 = endpoint.version || this.EC2_API_VERSION;
        this.urls.ELB = endpoint.urlELB || "https://elasticloadbalancing." + this.region + ".amazonaws.com";
        this.versions.ELB = endpoint.versionELB || this.ELB_API_VERSION;
        this.urls.CW = endpoint.urlCW || "https://monitoring." + this.region + ".amazonaws.com";
        this.versions.CW = endpoint.versionCW || this.CW_API_VERSION;
        this.urls.IAM = endpoint.urlIAM || 'https://iam.amazonaws.com';
        this.versions.IAM = endpoint.versionIAM || this.IAM_API_VERSION;
        this.urls.STS = endpoint.urlSTS || 'https://sts.amazonaws.com';
        this.versions.STS = endpoint.versionSTS || this.STS_API_VERSION;
        this.urls.SQS = endpoint.urlSQS || 'https://sqs.' + this.region + '.amazonaws.com';
        this.versions.SQS = endpoint.versionSQS || this.SQS_API_VERSION;
        this.urls.SNS = endpoint.urlSNS || 'https://sns.' + this.region + '.amazonaws.com';
        this.versions.SNS = endpoint.versionSNS || this.SNS_API_VERSION;
        this.urls.RDS = endpoint.urlRDS || 'https://rds.' + this.region + '.amazonaws.com';
        this.versions.RDS = endpoint.versionRDS || this.RDS_API_VERSION;
        this.urls.R53 = endpoint.urlR53 || 'https://route53.amazonaws.com';
        this.versions.R53 = endpoint.versionR53 || this.R53_API_VERSION;
        this.actionIgnore = endpoint.actionIgnore || [];
        debug('setEndpoint: ' + this.region + ", " + JSON.stringify(this.urls) + ", " + JSON.stringify(this.versions) + ", " + this.actionIgnore);
    }