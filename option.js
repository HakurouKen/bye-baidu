(function(window,document,undefined){
	function toArray(o){
		return Array.prototype.slice.call(o,0);
	}

	function formatUrl(url){
		var u = new URL(url)
		return url ? u.href.replace(u.protocol,'') : ''; 
	}

	var cfg = (function(){
		var sites = [{
			site: 'google',
			url: '//google.com'
		},{
			site: 'bing',
			url: '//cn.bing.com'
		}];

		return {
			get: function(name){
				var i = 0,
					l = sites.length;
				for( ; i < l; i++ ){
					if( sites[i].site === name ){
						return sites[i].url;
					}
				}
				return null;
			},
			getDefault: function(){
				return sites[0].url;
			}
		}
	})();

	var settings = document.getElementById('settings');

	// init
	chrome.storage.sync.get(function(item){
		var input = document.getElementById('option-'+item.site) || document.getElementById('option-other');
		input.checked = true;
		if( item.site === 'other' ){
			settings.querySelector('[name="name"]').value = 'http:' + item.url;
		}
	});

	settings.addEventListener('submit',function(e){
		e.preventDefault();
		var selected =
				toArray(settings.querySelectorAll('[name="site"]'))
					.filter(function(input){
						return input.checked;
					}),
			site = (selected[0] || {}).value,
			url = site === 'other'
					? formatUrl(settings.querySelector('[name="name"]').value)
					: cfg.get(site) || cfg.getDefault();

		chrome.storage.sync.set({
			site: site,
			url: url
		},function(){
			alert("保存成功！");
		});
	});

	document.getElementById('btn-cancel').addEventListener('click',function(){
		window.close();
	})

})(window,document);