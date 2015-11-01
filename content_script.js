(function(global){
	chrome.storage.sync.get(function(site){
		var loc = global.location,
			protocol = loc.protocol;
		if( !/\.baidu\./.test(site.url) ){
			loc.href = site.url ? (protocol + site.url) : 'about:blank';			
		}
	});
})(window);