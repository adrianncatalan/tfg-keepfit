window.addEventListener("load", () => {

    document.getElementById('btn').addEventListener("click", () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        fetch("http://localhost:8081/", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({

                email: email.value,
                password: password.value,

            }),

            headers: {

                Accept: "application/json",
                "Content-Type": "application/json",

            },
        })

            .then(res => {
                if (res.ok) {
                    console.log('Succes');
                } else {
                    console.log('Not succes');
                }
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))
    })

});