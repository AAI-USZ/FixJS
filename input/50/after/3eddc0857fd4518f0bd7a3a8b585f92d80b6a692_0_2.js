function() {
    return '\\' + this.type + '_{' + this.sub.outputText() + '}^{' + this.sup.outputText() + '}{' + this.eq.outputText() + '}';
}