window.addEventListener("load", () => {

    document.getElementById('btn-register').addEventListener("click", () => {

        const name = document.getElementById('name');
        const surname = document.getElementById('surname');
        const age = document.getElementById('age');
        const gender = document.getElementById('gender');
        const height = document.getElementById('height');
        const weight = document.getElementById('weight');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');

        fetch("http://localhost:8081/users", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({

                name: name.value,
                surname: surname.value,
                age: age.value,
                gender: gender.value,
                height: height.value,
                weight: weight.value,
                email: email.value,
                phone: phone.value,
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