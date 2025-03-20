document.getElementById('loginButton').addEventListener('click', async function() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        });

        if (response.ok) {
            const data = await response.json(); 
            console.log('Response from server:', data);
            const token = data.token;


            const homeResponse = await fetch('/home', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (homeResponse.ok) {
                
                window.location.href = '/home';
            } else {
                console.error('Error al acceder a la vista principal:', homeResponse.status);
            }
        } else {

            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
});