function Validator(options) {
	if (typeof options.expression === "string")
		this.expression = new RegExp(options.expression);
	else
		this.expression = options.expression;
}

Validator.prototype.validate = function(input, result) {
	if (this.expression.test(input))
		result.ok().done();
	else
		result.fail().done();
}

module.exports = Validator;