// CODE HERE
const usersMemory = {
    "sampleUsername" : "samplePassword",
};


function checkUsernamePasswordCombo (){

    for (const user in usersMemory) {
        if (user == document.getElementById("username-input").value && usersMemory[user] == document.getElementById("password-input").value) {
            window.location.href = ("feed.html")
        };
    };
}

