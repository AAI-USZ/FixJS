function getTime() {
        if (this._date !== undefined)
                return (this._date);

        this._date = new Date(this._date);
        return (this._date);
}