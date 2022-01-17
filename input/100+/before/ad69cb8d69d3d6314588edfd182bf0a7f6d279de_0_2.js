function(action, id, rec, callback)
    {
        var content = '<?xml version="1.0" encoding="UTF-8"?>' +
                      '<ChangeResourceRecordSetsRequest xmlns="https://route53.amazonaws.com/doc/2012- 02-29/">' +
                      '<ChangeBatch><Comment></Comment>' +
                      '<Changes>' +
                      '<Change><Action>' + action + '</Action>'+
                      '<ResourceRecordSet>' +
                      '<Name>' + rec.name + '</Name>' +
                      '<Type>' + rec.type + '</Type>';

        if (rec.ttl) contents += '<TTL>' + rec.ttl + '</TTL>';
        if (rec.weight) contents += '<Weight>' + rec.weight + '</Weight>';
        if (rec.setId) contents += '<SetIdentifier>' + rec.setId + '</SetIdentifier>';
        if (rec.region) contents += '<Region>' + rec.region + '</Region>';
        if (rec.hostedZoneId || rec.dnsName) {
            contents += '<AliasTarget>';
            if (rec.hostedZoneId) contents += '<HostedZoneId>' + rec.hostedZoneId + '</HostedZoneId>';
            if (rec.dnsName) contents += '<DNSName>' + rec.dnsName + '</DNSName>';
            contents += '</AliasTarget>';
        }

        if (rec.values.length) {
            contents += '<ResourceRecords><ResourceRecord>';
            for (var i = 0; i < rec.values.length; i++) {
                content += '<Value>' + rec.values[i] + '</Value>';
            }
            content += '</ResourceRecord></ResourceRecords>';
        }

        contents += '</ResourceRecordSet>' +
                    '</Change>' +
                    '</Changes>' +
                    '</ChangeBatch>' +
                    '</ChangeResourceRecordSetsRequest>';

        this.queryRoute53("POST", id + '/rrset', content, {}, this, false, "onCompleteChangeResourceRecordSets", callback);
    }