
function Validator(options) {
	this.type = options.type || "generic";
}

Validator.prototype.validate = function(input, result) {
	if (input.match(Validator.types[this.types]))
		return result.ok().done();
	else
		return result.fail().done();
}

Validator.prototype.normalize = function(input, callback) {
	callback(input.replace(/[^0-9]+/g, ''));
}

Validator.types = {
	visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    americanexpress: /^3[47][0-9]{13}$/,
    dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/, 
    jbc: /^(?:2131|1800|35\d{3})\d{11}$/,
    generic: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
}

module.exports = Validator;
