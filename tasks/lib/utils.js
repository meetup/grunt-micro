'use strict';

var zlib = require('zlib');

module.exports = {
	exceedsLimit: function(contents, limit, isGzip, callback) {
		// limit could be a Number (for error-only)
		// or Object with `error` and `warn` values
		zlib.gzip(contents, function(err, results) {
			var size = (isGzip ? results.length : contents.length),
				errorLimit = limit.error || limit,
				errorWarn = limit.warn || Infinity;

			callback(err, results = {
				size: size,
				exceedsLimit: size > errorLimit,
				exceedsWarn: size > errorWarn
			});
		});
	}
};
