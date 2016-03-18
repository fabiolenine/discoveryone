function initialize() {
    
    // Exibir mapa;
    var myLatlng = new google.maps.LatLng(-3.730621, -38.547079);
    var mapOptions = {  zoom: 19,
                        center: myLatlng,
                        panControl: true,
                        
                        // mapTypeId: google.maps.MapTypeId.ROADMAP
                        mapTypeControlOptions: {mapTypeIds: [google.maps.MapTypeId.SATELLITE, 'map_style']}
    }
    
    // Parâmetros do texto que será exibido no clique;
    var contentString = '<h4>Cartório Moreira de Deus</h4>' +
                        '<p>Rua Casimiro Montenegro, 70, Monte Castelo , Fortaleza - Ceará, CEP: 60.325-720</p>' +
                        '<a href="http://www.cartoriomoreiradedeus.not.br" target="_blank">clique aqui para mais informações</a>';
    var infowindow = new google.maps.InfoWindow({   content: contentString,
                                                    maxWidth: 700
    });

    // Exibir o mapa na div #mapa;
    var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

    // Marcador personalizado;
    var image = 'https://storage.googleapis.com/discoveryone/public/images/moreiradedeus/map-marker-icon.png';
    var marcadorPersonalizado = new google.maps.Marker({    position: myLatlng,
                                                            map: map,
                                                            icon: image,
                                                            title: 'Cartório Moreira de Deus',
                                                            animation: google.maps.Animation.DROP
    });

    //Exibir texto ao clicar no ícone;
    google.maps.event.addListener(marcadorPersonalizado, 'click', function() { infowindow.open(map,marcadorPersonalizado);});

    // Estilizando o mapa;
    // Criando um array com os estilos
    var styles = [{stylers: [   { hue: "rgba(113, 193, 212, 0.69)" },
                                { saturation: 60 },
                                { lightness: -20 },
                                { gamma: 1.51 }
                            ]},
                {   featureType: "road",
                    elementType: "geometry",
                    stylers: [  { lightness: 100 },
                                { visibility: "simplified" }
                             ]
                },
                {   featureType: "road",
                    elementType: "labels"}
                ];

    // crio um objeto passando o array de estilos (styles) e definindo um nome para ele;
    var styledMap = new google.maps.StyledMapType(styles, {name: "Estilo"});
    
    // Aplicando as configurações do mapa
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}

// Função para carregamento assíncrono
function loadScript() { 
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src  = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBNJ-M8buNRxR9U1kjn8qMDVImcNfpe2SA&callback=initialize";
            document.body.appendChild(script);
}

window.onload = loadScript;