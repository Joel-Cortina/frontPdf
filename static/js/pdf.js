document.getElementById('generatePdfBtn').addEventListener('click', async function () {
    try {
        const response = await fetch('http://127.0.0.1:5000/generar_pdf');


        if (!response.ok) {
            throw new Error('Error en la generación del PDF');
        }

        const data = await response.json();

        if (!data.pdf_url) {
            throw new Error('Respuesta inválida, falta la URL del PDF');
        }

        const pdfUrl = `http://127.0.0.1:5000${data.pdf_url}`;
        const pdfIframe = document.getElementById('pdfIframe');
        pdfIframe.src = pdfUrl;

        document.getElementById('pdfContainer').style.display = 'block';

        const downloadBtn = document.getElementById('downloadPdfBtn');
        downloadBtn.href = pdfUrl;
        downloadBtn.download = data.pdf_url.split('/').pop();
    } catch (error) {
        console.error('Error al generar o mostrar el PDF:', error);
        alert('Hubo un problema al generar el PDF.');
    }

});
