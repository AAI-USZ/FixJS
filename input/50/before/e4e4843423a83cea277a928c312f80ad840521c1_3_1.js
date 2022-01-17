function getHref() {
        if (this._href !== undefined)
                return (this._href);

        this._href = this.getUrl().href;
        return (this._href);
}