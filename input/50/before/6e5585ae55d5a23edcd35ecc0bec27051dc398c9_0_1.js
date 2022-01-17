function(b) {
      var issuerName = b.attributes.body.badge.issuer.name || 'No Issuer Name';
      if (totalPerIssuer[issuerName]) {
        totalPerIssuer[issuerName]++;
      } else {
        totalPerIssuer[issuerName] = 1;
      }
    }