// Rotas do Volatilechat.com

module.exports = function(app)
{
	
	app.get('/', function(req, res){
    	var language = req.headers["accept-language"];
    	switch (language) {
				case "pt-br":   // Portuguese
					res.render('index_ptbr.ejs');
					break;
	//            case "fr":      // French
	//                res.sendFile(__dirname + '/index_fr.html');
	//                break;
	//            case "de":      // German
	//                res.sendFile(__dirname + '/index_de.html');
	//                break;
	//            case "ru":      // Russian
	//                res.sendFile(__dirname + '/index_ru.html');
	//                break;
	//            case "ar":      // Arabic
	//                res.sendFile(__dirname + '/index_ar.html');
	//                break;
	//            case "es":      // Spanish
	//                res.sendFile(__dirname + '/index_es.html');
	//                break;
	//            case "hi":      // Hindi
	//                res.sendFile(__dirname + '/index_hi.html');
	//                break;
	//            case "ko":      // Korean
	//                res.sendFile(__dirname + '/index_ko.html');
	//                break;
	//            case "zh":      //  Chinese
	//                res.sendFile(__dirname + '/index_zh.html');
	//                break;
	//            case "zh-Hans": //  Chinese (Simplified)
	//                res.sendFile(__dirname + '/index_zhhans.html');
	//                break;
	//            case "zh-Hant": //  Chinese (Traditional)
	//                res.sendFile(__dirname + '/index_zhhant.html');
	//                break;
				default:        // English
					res.render('index_en.ejs');            
    	};
	});

	app.use(function(req, res, next) {
	  res.status(404).send('Sorry cant find that!');
	});

	app.use(function(err, req, res, next) {
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	});
	
}