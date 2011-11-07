
var dns = require('dns')

function Validator(options) {
	options = options || { }
	this.checkDNS = options.checkDNS || false;
}

Validator.expression = /^([a-z0-9_.-]+)@(([0-9a-z.-]+).([a-z.]{2,6}))/i;

Validator.prototype.validate = function(input, result) {

	if (!input) {
		result.fail("syntax").done();
		return;
	}

	var parts = input.match(Validator.expression);

	if (!parts)
		result.fail("syntax");
	else
		result.ok("syntax");

	if (this.checkDNS) {
		dns.resolve(parts[2], "MX", function(err, addresses) {
			if (err) {
				result.fail("dns").done();
			}
			else {
				result.ok("dns").done();
			}
		})
	}
	else {
		result.done();
	}
}



module.exports = Validator;