


document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('mapa').setView([28.3562404, -16.3817135], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([28.3562404, -16.3817135]).addTo(map)
        .bindPopup('TuTaPera')
        .openPopup();

    function mostrarRuta(coordenadasCliente) {
        var control = L.Routing.control({
            waypoints: [
                L.latLng(coordenadasCliente),
                L.latLng([28.3562404, -16.3817135])
            ],
            routeWhileDragging: true
        }).addTo(map);

        control.on('routesfound', function(e) {
            var routes = e.routes;
            var summary = routes[0].summary;
            var distancia = summary.totalDistance / 1000; // Convertir a kilómetros
            var duracion = summary.totalTime / 3600; // Convertir a horas

            document.getElementById('distance').textContent = 
                `Distancia: ${distancia.toFixed(2)} km, Duración: ${duracion.toFixed(2)} horas`;
        });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var coordenadasCliente = [position.coords.latitude, position.coords.longitude];
            mostrarRuta(coordenadasCliente);
        }, function() {
            alert('No se pudo obtener su ubicación');
        });
    } else {
        alert('La geolocalización no es soportada por su navegador');
    }
});

