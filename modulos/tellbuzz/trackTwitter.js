module.exports = function(tw, socket)
{
		
	tw.track('Lula');
	tw.track('Michel Temer');
	tw.on('tweet', function(tweet){
		console.log(tweet);
		socket.emit('buzz', tweet);
	});
	
}