const { exit } = require('process');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const contact = {
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: ""
}

const contacts = [];

console.log(`Hey Sir, i'm your directory ! 
Enter /help to display a list of commands. 
Otherwise just enter any existing commands.`)

const ask = () => {
    readline.question('Command: ', function (answer) {
        switch (answer) {
            case "/help":
                console.log(`There is the details of differents commands available\n/help : Display all the commands available\n/stop : Quit your loved application\n/add : Add a new contact in your directory\n/list : List all the contacts you have in your loved directory\n/delete : Delete one your contact by specifiying his ID`);
                break;
            case "/stop":
                console.log("Closing the application.")
                readline.close()
                exit()
            case "/add":
                const createdContact = {...contact};
                const newId = contacts && contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1
                createdContact.id = newId;
                console.log("Let's add a new contact !")
                askFirstName(createdContact);
                break;
            case"/list":
                console.log("Here is the list of your contacts :")
                console.log("-----------------------")
                listOfContacts()
                break;
            case"/delete":
                console.log("This is how to delete a contact from your directory !\nGet the ID of your contact with /list\nThen use /delete to delete it from your directory")
                deleteContact();
                break;

            default:
                console.log("Unknown command !")
                break;
        }
        ask();
    });
};

const askFirstName = (createdContact) => {
    readline.question('What is the first-name of your contact : ', function (answer) {
        createdContact.firstName = answer;
        askLastName(createdContact);
    });
};

const askLastName = (createdContact) => {
    readline.question('What is the family name of your contact : ', function (answer) {
        createdContact.lastName = answer;
        askPhoneNumber(createdContact);
    });
};

const askPhoneNumber = (createdContact) => {
    const regex = new RegExp(`^0[6][0-9]{8}$`);
    readline.question(`What is the phone number of ${createdContact.firstName} ${createdContact.lastName}  : `, function (answer) {
        if(regex.test(answer)){
            createdContact.phoneNumber = answer;
            success(createdContact);
        } else {
            console.log("Invalid phone number !")
            askPhoneNumber(createdContact)
        }

    });
}

const success = (createdContact) => {
    console.log(`Your contact ${createdContact.firstName} ${createdContact.lastName} has been successfully added to the directory !`);
    contacts.push(createdContact);
    ask();
}

const listOfContacts = () => {
    if(contacts.length == 0){
        console.log("You don't have any contacts !")
    } else {
        contacts.forEach(contact => {
            console.log(`ID : ${contact.id} ==> ${contact.firstName} ${contact.lastName}\nphone: ${contact.phoneNumber}`)
        });
    } 
}

const deleteContact = () => {
    readline.question('What is the ID of the contact you wish to delete? :', (answer) => {
        if (!/^[0-9]+$/.test(answer)) {
            console.log("Invalid ID")
            deleteContact()
            return;
        }
        const index = contacts.findIndex((e) => e.id === parseInt(answer, 10))
        if (index === -1) {
            console.log("Contact hasn't been found.")
            deleteContact()
            return;
        }
        contacts.splice(index, 1)
        ask()
    })
}

ask();
