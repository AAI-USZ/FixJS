function () {
        // Nervoustissue.DataLinking
        // -------------------------

        // Abstracciones para acceder a las propiedades de los objetos de datos y a sus eventos

        var m = Nervoustissue.DataLinking = {};

        // Nervoustissue.DataLinking.Base
        // ------------------------------

        m.Base = function (options) {
            _.extend(this, options);
            this.validModel = !!this.model;
            this.initialize();
        }

        m.Base.extend = Backbone.Model.extend;

        _.extend(m.Base.prototype, {
            initialize: function () { }
        });

        // Nervoustissue.DataLinking.Compound
        // -------------------------------

        // Se encarga de registrar el evento change en un modelo complejo de backbone.

        m.Compound = m.Base.extend({
            initialize: function () {
            },
            read: function () {
                return this.model;
            },
            onChange: function (action, context) {
                this.viewDataBinder.registerModelEvent(this.model, "change", action, context);
            }
        });

        // Nervoustissue.DataLinking.Model
        // -------------------------------

        // Se encarga de leer y escribir en en propiedades de un Model de backbone y 
        // registrar los eventos correspondientes.

        m.Model = m.Base.extend({
            initialize: function () {

            },
            read: function () {
                return this.model.get(this.field);
            },
            write: function (value) {
                this.model.set(this.field, value);
            },
            onChange: function (action, context) {
                this.viewDataBinder.registerModelEvent(this.model, "change:" + this.field, action, context);
            }
        });

        // Nervoustissue.DataLinking.UrlLink
        // ---------------------------------------------

        m.UrlLink = m.Model.extend({
            read: function () {
                return {
                    url: this.model.get(this.urlField),
                    text: this.model.get(this.textField)
                }
            },
            write: function (newText, newUrl) {
                newUrl = newUrl || this.model.get(this.urlField);
                newText = newText || this.model.get(this.textField);

                var obj = {};
                obj[this.urlField] = newUrl;
                obj[this.textField] = newText;
                this.model.set(obj);
            },
            onChange: function (action, context) {
                this.viewDataBinder.registerModelEvent(this.model, "change:" + this.urlField, action, context);
                this.viewDataBinder.registerModelEvent(this.model, "change:" + this.textField, action, context);
            }
        });

        // Nervoustissue.DataLinking.FullName
        // ---------------------------------------------

        // Lee y escribe en dos campos diferentes concatenando y parseandolos

        m.FullName = m.Model.extend({
            read: function () {
                var firstName = this.model.get(this.firstNameField);
                var lastName = this.model.get(this.lastNameField);
                if (firstName) {
                    return lastName + ", " + firstName;
                } else {
                    return lastName;
                }
            },
            write: function (value) {
                var firstName = '';
                var lastName = value;
                if (value.split) {
                    var aux = value.split(',');
                    if (aux.length > 1) {
                        lastName = $.trim(aux.shift());
                        firstName = $.trim(aux.join(','));
                    } else {
                        aux = value.split(' ');
                        if (aux.length > 1) {
                            lastName = $.trim(aux.pop());
                            firstName = $.trim(aux.join(' '));
                        }
                    }
                }
                var obj = {};
                obj[this.firstNameField] = firstName;
                obj[this.lastNameField] = lastName;
                this.model.set(obj);
            },
            onChange: function (action, context) {
                this.viewDataBinder.registerModelEvent(this.model, "change:" + this.firstNameField, action, context);
                this.viewDataBinder.registerModelEvent(this.model, "change:" + this.lastNameField, action, context);
            }
        });

        // Nervoustissue.DataLinking.Collection
        // ------------------------------------------

        // Se encarga de leer y escribir en los elementos de un Collection de backbone y 
        // registrar los eventos correspondientes.	
        m.Collection = m.Base.extend({
            initialize: function () {
                this.collection = this.validModel ? this.model.get(this.field) : null;
                this.validModel = !!this.collection;
            },
            read: function () {
                return this.collection;
            },
            add: function () {
                this.collection.add();
            },
            remove: function (item) {
                this.collection.remove(item);
                item.destroy();
            },
            onAdd: function (action, context) {
                this.viewDataBinder.registerModelEvent(this.collection, "add", action, context);
            },
            onChange: function (action, context) {
                this.viewDataBinder.registerModelEvent(this.model, "change", action, context);
            },
            each: function (action, context) {
                for (var i in this.collection.models) {
                    action.call(context, this.collection.models[i]);
                }
            }
        });
    }