(function(global){
	var BING = '//cn.bing.com',
		GOOGLE = '//google.com';

	var loc = global.location,
		protocol = loc.protocol;

	location.href = protocol + GOOGLE;

})(window);