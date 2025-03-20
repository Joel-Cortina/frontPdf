document.getElementById('searchBtn').addEventListener('click', function () {
    const cedula = document.getElementById('cedulaInput').value.trim();

    if (!cedula) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor ingrese una cédula existente.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    fetch(`/buscarpdf?cedula=${cedula}`)
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Archivo no encontrado');
                });
            }
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const iframe = document.getElementById('pdfIframe');
            iframe.src = url;

            document.getElementById('pdfContainer').style.display = 'block';
        })
        .catch(error => {
            Swal.fire({
                title: 'Archivo no encontrado!',
                text: 'El archivo no fue encontrado. ¿Quieres generar un nuevo PDF?',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'Generar nuevo PDF',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Generar nuevo PDF');
                    fetch('/generar_pdf', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer aec6602b-dc1b-48e8-b6b1-aa2f49cd1756'//aqui va la variable del token cambiar
                        },
                        body: JSON.stringify({ cedula: cedula, nombre: 'Jesus', fecha_ingreso: '2021-10-01' })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.pdf_url) {
                                const iframe = document.getElementById('pdfIframe');
                                iframe.src = data.pdf_url;

                                document.getElementById('pdfContainer').style.display = 'block';

                                Swal.fire({
                                    title: '¡PDF generado!',
                                    text: 'El nuevo PDF se generó correctamente.',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                });
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Hubo un problema al generar el PDF.',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                });
                            }
                        })
                        .catch(error => {
                            console.error('Error al generar el PDF:', error);
                            Swal.fire({
                                title: 'Error!',
                                text: 'Hubo un problema al generar el PDF.',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        });
                }
            });
        });
});