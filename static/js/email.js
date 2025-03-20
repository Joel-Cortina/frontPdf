document.getElementById('sendEmailBtn').addEventListener('click', async function () {



    const { value: email } = await Swal.fire({
        title: "Introduce tu dirección de correo",
        input: "email",
        inputLabel: "Dirección de correo",
        inputPlaceholder: "Ingresa tu dirección de correo"
    });

    if (email) {
        if (!validateEmail(email)) {
            Swal.fire({
                title: 'Error!',
                text: 'Por favor ingresa un correo válido.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const archivo = document.getElementById('pdfIframe').src;
        const formData = new FormData();
        formData.append('email', email);
        if (archivo) {
            const response = await fetch(archivo);
            const blob = await response.blob();
            formData.append('archivo', blob, '1234.pdf');
        }

        try {
            const response = await fetch('/enviar_correo', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.mensaje) {
                Swal.fire({
                    title: '¡Éxito!',
                    text: data.mensaje,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else if (data.error) {
                Swal.fire({
                    title: 'Error!',
                    text: data.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al enviar el correo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
