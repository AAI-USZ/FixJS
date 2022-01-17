function() {
  var DedupFilter, DocumentInverter, LowerCaseFilter, PrefixFilter, fieldize, isString,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  DedupFilter = require('./DedupFilter').DedupFilter;

  LowerCaseFilter = require('./LowerCaseFilter').LowerCaseFilter;

  PrefixFilter = require('./PrefixFilter').PrefixFilter;

  fieldize = function(fieldName, tokens) {
    return (new PrefixFilter(fieldName + ':')).filter(tokens);
  };

  isString = function(s) {
    return typeof s === 'string' || s instanceof String;
  };

  DocumentInverter = (function() {

    function DocumentInverter(optionalFilter) {
      this.tokenizeSync = __bind(this.tokenizeSync, this);

      this.invertStringSync = __bind(this.invertStringSync, this);

      this.getTerms = __bind(this.getTerms, this);

      this.invertDocumentSync = __bind(this.invertDocumentSync, this);

      this.invertSync = __bind(this.invertSync, this);
      this.filter = optionalFilter != null ? optionalFilter : new DedupFilter(new LowerCaseFilter());
    }

    DocumentInverter.prototype.invertSync = function(d) {
      if (isString(d)) {
        return this.invertStringSync(d);
      } else {
        return this.invertDocumentSync(d);
      }
    };

    DocumentInverter.prototype.invertDocumentSync = function(d) {
      var field, t, ta, termArrays, terms, value, _i, _j, _len, _len1;
      termArrays = [];
      for (field in d) {
        if (!__hasProp.call(d, field)) continue;
        value = d[field];
        termArrays.push(fieldize(field, this.getTerms(value)));
      }
      terms = [];
      for (_i = 0, _len = termArrays.length; _i < _len; _i++) {
        ta = termArrays[_i];
        for (_j = 0, _len1 = ta.length; _j < _len1; _j++) {
          t = ta[_j];
          terms.push(t);
        }
      }
      return terms;
    };

    DocumentInverter.prototype.getTerms = function(stringOrStringArray) {
      if (isString(stringOrStringArray)) {
        return this.invertStringSync(stringOrStringArray);
      } else if (stringOrStringArray instanceof Array) {
        return stringOrStringArray;
      } else {
        throw new Error('getTerms expected string or array of terms');
      }
    };

    DocumentInverter.prototype.invertStringSync = function(s) {
      var allTerms;
      allTerms = this.tokenizeSync(s);
      return this.filter.filter(allTerms);
    };

    DocumentInverter.prototype.tokenizeSync = function(s) {
      var match, pattern;
      pattern = /[a-z]+/ig;
      match = s.match(pattern);
      if (!(match === '' || match === null)) {
        return match;
      }
      return [];
    };

    return DocumentInverter;

  })();

  module.exports = {
    DocumentInverter: DocumentInverter
  };

}