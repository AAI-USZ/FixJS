function date() {
        if (this._date !== undefined)
                return (this._date);

        this._date = new Date(this._time);
        return (this._date);
}