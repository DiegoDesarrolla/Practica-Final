document.addEventListener('DOMContentLoaded', function() {
    const formPresupuesto = document.getElementById('form-presupuesto');
    const totalPresupuesto = document.getElementById('total-presupuesto');

    function validarFormulario() {
        const nombre = formPresupuesto.nombre.value.trim();
        const apellidos = formPresupuesto.apellidos.value.trim();
        const telefono = formPresupuesto.telefono.value.trim();
        const email = formPresupuesto.email.value.trim();

        if (!/^[a-zA-Z\s]+$/.test(nombre) || nombre.length > 15) {
            alert('El nombre solo puede contener letras y tener una longitud máxima de 15 caracteres.');
            return false;
        }

        if (!/^[a-zA-Z\s]+$/.test(apellidos) || apellidos.length > 40) {
            alert('Los apellidos solo pueden contener letras y tener una longitud máxima de 40 caracteres.');
            return false;
        }

        if (!/^\d{9}$/.test(telefono)) {
            alert('El teléfono solo puede contener números y tener una longitud máxima de 9 dígitos.');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('El correo electrónico no es válido.');
            return false;
        }

        return true;
    }

    function calcularPresupuesto() {
        const producto = formPresupuesto.producto;
        const plazo = formPresupuesto.plazo.value;
        const extras = formPresupuesto.querySelectorAll('input[name="extra"]:checked');

        let total = parseInt(producto.options[producto.selectedIndex].dataset.precio);
        extras.forEach(extra => {
            total += parseInt(extra.value);
        });

        const descuento = (plazo > 6) ? 0.1 : 0;
        total -= total * descuento;

        totalPresupuesto.textContent = `${total}€`;
    }

    formPresupuesto.addEventListener('change', calcularPresupuesto);
    formPresupuesto.addEventListener('reset', () => totalPresupuesto.textContent = '0€');
    formPresupuesto.addEventListener('submit', function(event) {
        if (!validarFormulario()) {
            event.preventDefault();
        }
    });

    calcularPresupuesto();
});