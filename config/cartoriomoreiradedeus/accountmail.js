module.export = 
{
    host: "smtp.office365.com", 	// hostname
    secureConnection: false, 		// TLS requires secureConnection to be false
    port: 587, 						// port for secure SMTP
    auth: {
        user: "xxxxxxxxx",
        pass: "xxxxxxxxx"
    },
    tls: {
        ciphers:'SSLv3'
    }
};