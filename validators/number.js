function Validator() {
	this.minimum = options.minimum;
	this.maximum = options.maximum;
	this.step = options.step;
}

Validator.prototype.validate = function(input, result) {
	var number = Number(input);
	if (number !== NaN) {
		result.ok("syntax");
		if (typeof this.minimum !== "undefined" && number < this.minimum)
			result.fail("minimum");
		if (typeof this.maximum !== "undefined" && number > this.maximum)
			result.fail("minimum");
		if (typeof this.step !== "undefined" && number % this.step != 0)
			result.fail("step");
		result.done();
	} 
	else
		result.fail("syntax").done();
}

Validator.prototype.normalize = function(input, callback) {
	callback(Number(input));
}

module.exports = Validator;
