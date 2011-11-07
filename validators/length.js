function Validator(options) {
	this.length = options.length;
	this.minimum = options.minimum;
	this.maximum = options.maximum;
}

Validator.prototype.validate = function(input, result) {
	if (this.length) {
		if (input.length === this.length)
			result.ok("length").done()
		else
			result.fail("length").done();
	}
	else {
		if (this.minimum && input.length < this.minimum)
			result.fail("minimum");
		if (this.maximum && input.length > this.maximum)
			result.fail("maximum");
		result.done();
	}
}

module.exports = Validator;