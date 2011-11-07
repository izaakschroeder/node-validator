
function Validator(options) {
	this.values = options.values;
}

Validator.prototype.validate = function(input, result) {
	if (this.values.some(function(i) { return i === input; }))
		result.ok().done();
	else
		result.fail().done();
}

module.exports = Validator;