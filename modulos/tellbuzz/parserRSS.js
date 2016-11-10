'use strict'

module.exports = function(request, xml2js){

	let parser 	= new xml2js.Parser();
	let srcRe 	= /([^\"])+(png|jpg|gif)/;
	
	var parserImgSrc = function(data) {
		let extracao = '';
		Object.getOwnPropertyNames(data).forEach(function(val, idx, array) {
			if (data['content:encoded']!=undefined) {
  				extracao = data['content:encoded'][0];
			};
		});

		extracao = srcRe.exec(extracao);
		if (extracao!=null) {
			return extracao[0];
		}
		else {
			return '';
		};
	};
	
	var parserXml2Js = function(data) {
		let objUOL = [];
		parser.parseString(data, function (err, result) {
			let rec = result.rss.channel[0].item.length;
			for (var i=0; i < rec; i++) {
				objUOL.push({	title: 			result.rss.channel[0].item[i].title[0],
								description: 	result.rss.channel[0].item[i].description[0],
								link:			result.rss.channel[0].item[i].link[0],
							 	pubdate:		result.rss.channel[0].item[i].pubDate[0],
							 	src:			parserImgSrc(result.rss.channel[0].item[i]),
								language:		'pt-br'
							});
			};
		});
		return objUOL;
	};
	
	var rssget = function(url, callback) {
		console.log('Scraping:',url)
		request.get(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			return callback(parserXml2Js(body)); // Show the HTML for the Google homepage.
		  }
		});
	};
	
	
	var retorno = {"rssget" : rssget};

	return retorno;	
};