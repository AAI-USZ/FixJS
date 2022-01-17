function(action, id, rec, callback)
    {
        var contents = '<?xml version="1.0" encoding="UTF-8"?>' +
                       '<ChangeResourceRecordSetsRequest xmlns="https://route53.amazonaws.com/doc/' + this.versions.R53 + '/">' +
                       '<ChangeBatch><Comment></Comment>' +
                       '<Changes>' +
                       '<Change><Action>' + action + '</Action>'+
                       '<ResourceRecordSet>' +
                       '<Name>' + rec.name + '</Name>' +
                       '<Type>' + rec.type + '</Type>';

        if (rec.ttl > 0) contents += '<TTL>' + rec.ttl + '</TTL>';
        if (rec.weight > 0) contents += '<Weight>' + rec.weight + '</Weight>';
        if (rec.setId) contents += '<SetIdentifier>' + rec.setId + '</SetIdentifier>';
        if (rec.region) contents += '<Region>' + rec.region + '</Region>';
        if (rec.hostedZoneId && rec.dnsName) {
            contents += '<AliasTarget>';
            if (rec.hostedZoneId) contents += '<HostedZoneId>' + rec.hostedZoneId + '</HostedZoneId>';
            if (rec.dnsName) contents += '<DNSName>' + rec.dnsName + '</DNSName>';
            contents += '</AliasTarget>';
        }

        if (rec.values.length) {
            contents += '<ResourceRecords><ResourceRecord>';
            for (var i = 0; i < rec.values.length; i++) {
                if (rec.values[i] == "") continue;
                contents += '<Value>' + rec.values[i] + '</Value>';
            }
            contents += '</ResourceRecord></ResourceRecords>';
        }

        contents += '</ResourceRecordSet>' +
                    '</Change>' +
                    '</Changes>' +
                    '</ChangeBatch>' +
                    '</ChangeResourceRecordSetsRequest>';

        debug(contents)
        this.queryRoute53("POST", id + '/rrset', content, {}, this, false, "onCompleteChangeResourceRecordSets", callback);
    }