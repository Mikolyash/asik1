const usernameIn=document.querySelector ('#nameuser');
const emailIn = document.querySelector ('#email');
const passwordIn = document.querySelector ('#password');
const signUpButton = document.querySelector('#button'); 
const EyeIcon = document.getElementById('eye');

EyeIcon.addEventListener('click', function () {
    const type = passwordIn.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordIn.setAttribute('type', type);
    EyeIcon.classList.toggle('fa-eye-slash');
});
signUpButton.addEventListener('click', async(e)=> 
    { 
        try 
        {
            const model = 
            {
                username: usernameIn.value,
                email: emailIn.value,
                password: passwordIn.value
            };
            console.log ("Model:", model);
            await postResource('/postUsers', model);
            usernameIn.value='';
            passwordIn.value='';
            emailIn.value='';
            
        } 
        catch (err) {
            console.error(err);
            alert("Error fetching data");
        }
    }
);
const serverUrla = "http://localhost:3005/api";

const postResource = async (endpoint, body) => {
    const url = `${serverUrla}${endpoint}`;
    console.log(url)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json",
        },
        body: JSON.stringify(body), 
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        alert("You successfully created an account!");
        return await response.json();
    } catch (error) {
        alert("Sorry but you have already account with this username or email");
       
    }
};
