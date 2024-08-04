document.addEventListener('DOMContentLoaded', function () {
    fetch('./data/noticias.json')
        .then(response => response.json())
        .then(data => {
            const contenedorNoticias = document.getElementById('contenedor-noticias');
            data.noticias.forEach(noticia => {
                const noticiaElemento = document.createElement('div');
                noticiaElemento.classList.add('noticia');
                noticiaElemento.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.contenido}</p>
                `;
                contenedorNoticias.appendChild(noticiaElemento);
            });
        });
});
