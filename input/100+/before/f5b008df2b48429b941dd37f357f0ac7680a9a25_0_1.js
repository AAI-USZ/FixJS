function() {
  return {
    // aliases
    'id': '@id',
    'type': '@type',

    // prefixes
    'ccard': 'http://purl.org/commerce/creditcard#',
    'com': 'http://purl.org/commerce#',
    'dc': 'http://purl.org/dc/terms/',
    'foaf': 'http://xmlns.com/foaf/0.1/',
    'gr': 'http://purl.org/goodrelations/v1#',
    'ps': 'http://purl.org/payswarm#',
    'psp': 'http://purl.org/payswarm/preferences#',
    'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
    'sec': 'http://purl.org/security#',
    'vcard': 'http://www.w3.org/2006/vcard/ns#',
    'xsd': 'http://www.w3.org/2001/XMLSchema#',

    // general
    'address': {'@id': 'vcard:adr', '@type': '@id'},
    'comment': 'rdfs:comment',
    'countryName': 'vcard:country-name',
    'created': {'@id': 'dc:created', '@type': 'xsd:dateTime'},
    'creator': {'@id': 'dc:creator', '@type': '@id'},
    'depiction': {'@id': 'foaf:depiction', '@type': '@id'},
    'description': 'dc:description',
    'email': 'foaf:mbox',
    'fullName': 'vcard:fn',
    'homepage': {'@id': 'foaf:homepage', '@type': '@id'},
    'label': 'rdfs:label',
    'locality': 'vcard:locality',
    'postalCode': 'vcard:postal-code',
    'region': 'vcard:region',
    'streetAddress': 'vcard:street-address',
    'title': 'dc:title',

    // bank
    'bankAccount': 'bank:account',
    'bankRouting': 'bank:routing',

    // credit card
    'cardAddress': {'@id': 'ccard:address', '@type': '@id'},
    'cardBrand': {'@id': 'ccard:brand', '@type': '@id'},
    'cardCvm': 'ccard:cvm',
    // FIXME: use xsd mo/yr types?
    'cardExpMonth': 'ccard:expMonth',
    'cardExpYear': 'ccard:expYear',
    'cardNumber': 'ccard:number',

    // commerce
    'account': {'@id': 'com:account', '@type': '@id'},
    'accountOwnerType': {'@id': 'com:accountOwnerType', '@type': '@id'},
    'amount': 'com:amount',
    'balance': 'com:balance',
    'currency': 'com:currency',
    'destination': {'@id': 'com:destination', '@type': '@id'},
    'escrow': 'com:escrow',
    'forTransaction': {'@id': 'com:forTransaction', '@type': '@id'},
    'maximumAmount': 'com:maximumAmount',
    'maximumPayeeRate': 'com:maximumPayeeRate',
    'minimumAmount': 'com:minimumAmount',
    'payee': {'@id': 'com:payee', '@type': '@id', '@container': '@set'},
    'payeeRule': {'@id': 'com:payeeRule', '@type': '@id', '@container': '@set'},
    'payeeLimitation': {'@id': 'com:payeeLimitation', '@type': '@id'},
    // FIXME: be more strict with nonNegativeInteger?
    'payeePosition': {'@id': 'com:payeePosition', '@type': 'xsd:integer'},
    'payeeRate': 'com:payeeRate',
    'payeeRateContext': {'@id': 'com:payeeRateContext', '@type': '@id'},
    'payeeRateType': {'@id': 'com:payeeRateType', '@type': '@id'},
    'paymentGateway': 'com:paymentGateway',
    'paymentMethod': {'@id': 'com:paymentMethod', '@type': '@id'},
    'paymentToken': 'com:paymentToken',
    'referenceId': 'com:referenceId',
    'settled': {'@id': 'com:settled', '@type': 'xsd:dateTime'},
    'source': {'@id': 'com:source', '@type': '@id'},
    'transfer': {'@id': 'com:transfer', '@type': '@id'},
    'vendor': {'@id': 'com:vendor', '@type': '@id'},
    'voided': {'@id': 'com:voided', '@type': 'xsd:dateTime'},

    // error
    // FIXME
    // 'errorMessage': 'err:message'

    // payswarm
    'asset': {'@id': 'ps:asset', '@type': '@id'},
    'assetAcquirer': {'@id': 'ps:assetAcquirer', '@type': '@id'},
    // FIXME: support inline content
    'assetContent': {'@id': 'ps:assetContent', '@type': '@id'},
    'assetHash': 'ps:assetHash',
    'assetProvider': {'@id': 'ps:assetProvider', '@type': '@id'},
    'authority': {'@id': 'ps:authority', '@type': '@id'},
    'identityHash': 'ps:identityHash',
    // FIXME: move?
    'ipv4Address': 'ps:ipv4Address',
    'license': {'@id': 'ps:license', '@type': '@id'},
    'licenseHash': 'ps:licenseHash',
    'licenseTemplate': 'ps:licenseTemplate',
    'licenseTerms': {'@id': 'ps:licenseTerms', '@type': '@id'},
    'listing': {'@id': 'ps:listing', '@type': '@id'},
    'listingHash': 'ps:listingHash',
    // FIXME: move?
    'owner': {'@id': 'ps:owner', '@type': '@id'},
    'preferences': {'@id': 'ps:preferences', '@type': '@id'},
    'validFrom': {'@id': 'ps:validFrom', '@type': 'xsd:dateTime'},
    'validUntil': {'@id': 'ps:validUntil', '@type': 'xsd:dateTime'},

    // security
    'cipherAlgorithm': 'sec:cipherAlgorithm',
    'cipherData': 'sec:cipherData',
    'cipherKey': 'sec:cipherKey',
    'digestAlgorithm': 'sec:digestAlgorithm',
    'digestValue': 'sec:digestValue',
    'expiration': {'@id': 'sec:expiration', '@type': 'xsd:dateTime'},
    'initializationVector': 'sec:initializationVector',
    'nonce': 'sec:nonce',
    'normalizationAlgorithm': 'sec:normalizationAlgorithm',
    'password': 'sec:password',
    'privateKey': {'@id': 'sec:privateKey', '@type': '@id'},
    'privateKeyPem': 'sec:privateKeyPem',
    'publicKey': {'@id': 'sec:publicKey', '@type': '@id'},
    'publicKeyPem': 'sec:publicKeyPem',
    'publicKeyService': {'@id': 'sec:publicKeyService', '@type': '@id'},
    'revoked': {'@id': 'sec:revoked', '@type': '@id'},
    'signature': 'sec:signature',
    'signatureAlgorithm': 'sec:signatureAlgorithm',
    'signatureValue': 'sec:signatureValue'
  };
}