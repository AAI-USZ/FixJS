function()
    {
        return [ { name: 'us-east-1',      url: 'https://ec2.us-east-1.amazonaws.com', toString: function() { return this.name; } },
                 { name: 'us-west-1',      url: 'https://ec2.us-west-1.amazonaws.com', toString: function() { return this.name; } },
                 { name: 'us-west-2',      url: 'https://ec2.us-west-2.amazonaws.com', toString: function() { return this.name; } },
                 { name: 'eu-west-1',      url: 'https://ec2.eu-west-1.amazonaws.com', toString: function() { return this.name; } },
                 { name: 'ap-southeast-1', url: 'https://ec2.ap-southeast-1.amazonaws.com', toString: function() { return this.name; } },
                 { name: 'ap-northeast-1', url: 'https://ec2.ap-northeast-1.amazonaws.com', toString: function() { return this.name; } },
                 { name: 'sa-east-1',      url: 'https://ec2.sa-east-1.amazonaws.com', toString: function() { return this.name; } },
                 { name: 'us-gov-west-1',  url: 'https://ec2.us-gov-west-1.amazonaws.com', toString: function() { return this.name; },
                   version: '2012-05-01',
                   versionELB: '2011-11-15',
                   versionCW: '2010-08-01',
                   urlIAM: 'https://iam.us-gov.amazonaws.com',
                   versionIAM: '2010-05-08',
                   urlSTS: 'https://sts.us-gov-west-1.amazonaws.com',
                   actionIgnore: [ "DescribeLoadBalancers", "ListQueues", "DescribeDBInstances" , "ListTopics", "ListSubscriptions", "hostedzone" ],
                 },
            ];
    }