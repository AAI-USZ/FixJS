function() {
  var f = forms.FloatField()
  cleanErrorEqual(f, "This field is required.", "")
  cleanErrorEqual(f, "This field is required.", null)
  strictEqual(f.clean(1), 1.0)
  strictEqual(f.clean(23), 23.0)
  strictEqual(f.clean("3.14"), 3.1400000000000001)
  strictEqual(f.clean(3.14), 3.1400000000000001)
  strictEqual(f.clean(42), 42.0)
  cleanErrorEqual(f, "Enter a number.", "a")
  strictEqual(f.clean("1.0 "), 1.0)
  strictEqual(f.clean(" 1.0"), 1.0)
  strictEqual(f.clean(" 1.0 "), 1.0)
  cleanErrorEqual(f, "Enter a number.", "1.0a")
  strictEqual(f.maxValue, null)
  strictEqual(f.minValue, null)

  f = forms.FloatField({required: false})
  strictEqual(f.clean(""), null)
  strictEqual(f.clean(null), null)
  strictEqual(f.clean("1"), 1.0)
  strictEqual(f.maxValue, null)
  strictEqual(f.minValue, null)

  // FloatField accepts minValue and maxValue just like forms.IntegerField
  f = forms.FloatField({maxValue: 1.5, minValue: 0.5})
  cleanErrorEqual(f, "Ensure this value is less than or equal to 1.5.", "1.6")
  cleanErrorEqual(f, "Ensure this value is greater than or equal to 0.5.", "0.4")
  strictEqual(f.clean("1.5"), 1.5)
  strictEqual(f.clean("0.5"), 0.5)
  strictEqual(f.maxValue, 1.5)
  strictEqual(f.minValue, 0.5)

  // FloatField implements its own _hasChanged due to String coercion issues
  // in JavaScript.
  strictEqual(f._hasChanged("0.0", 0.0), false)
  strictEqual(f._hasChanged("1.0", 1.0), false)
}