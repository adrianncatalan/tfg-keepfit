window.onload = () => {
    const btn = document.querySelectorAll('button');
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', (e) => {
            console.log('hola');
        });
    }
}