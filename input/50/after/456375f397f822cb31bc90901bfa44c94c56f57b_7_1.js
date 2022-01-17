function(value, fcInternal)

{

    try

    {

        this.value = value;

        this.fcInternal = fcInternal;

        this.id = fcModel.JsValue.LAST_ID++;

    }

    catch(e) { alert("JsValue - error when creating: " + e); }

}