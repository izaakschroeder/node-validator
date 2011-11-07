
var validator = require('./validate');


var v = validator.create("url", { checkExistence: true });


validator.validate(v, "https://www.google.com", function(results) {
	console.log(results.isOk());
});


v = validator.create("email", { checkDNS: true });
validator.validate(v, "izaak.schroeder@test.com", function(results) {
	console.log(results.isOk());
});