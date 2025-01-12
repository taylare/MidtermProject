let userData = [
	{
		personalName: "Sylvia",
		familyName: "Rechichi",
		email: "sylvie@email.com",
		username: "User1",
		admin: true,
		photo: "images/sylvie.jpg"
	},
	{
		personalName: "Jye",
		familyName: "Rechichi",
		email: "jye.rechichi@email.com",
		username: "User2",
		admin: false,
		photo: "images/jye.jpg"
	},
	{
		personalName: "Mr.",
		familyName: "Meeseeks",
		email: "meeseeks@email.com",
		username: "User3",
		admin: true, 
		photo: "images/meeseeks.jpg"
	},
	{
		personalName: "Lachlan",
		familyName: "Rechichi",
		email: "lockie@email.com",
		username: "User4",
		admin: false,
		photo: "images/lockie.jpg"
	},
	{
		personalName: "Tracey",
		familyName: "Rechichi",
		email: "tracey@email.com",
		username: "User5",
		admin: false,
		photo: "images/mum.jpeg"
	},
	{
		personalName: "Joe",
		familyName: "Rechichi",
		email: "joe.rech@email.com",
		username: "User6",
		admin: false,
		photo: "images/dad.jpg"
	},
	{
		personalName: "Michael",
		familyName: "Scott",
		email: "scottm@email.com",
		username: "User7",
		admin: false,
		photo: "images/michaelscott.png"

	},
	{
		personalName: "Chyna",
		familyName: "Rechichi",
		email: "chyna@email.com",
		username: "User8",
		admin: false,
		photo: "images/chyna.jpg"
	  
	},
	{
		personalName: "Yoshi",
		familyName: "",
		email: "yoshi@yahooo.com",
		username: "User9",
		admin: true,
		photo: "images/yoshi.png"
		
	},
	{
		personalName: "Dobby",
		familyName: "",
		email: "dobby@email.com",
		username: "User10",
		admin: false,
		photo: "images/dobby.png"
		
	},
	{
		personalName: "Homelander",
		familyName: "",
		email: "america@email.com",
		username: "User11",
		admin: false,
		photo: "images/homelander.jpg"
	},
	{
		personalName: "Tom",
		familyName: "Nook",
		email: "nook@ac.com",
		username: "User12",
		admin: false,
		photo: "images/tomnook.png"
	},
	{
		personalName: "Phoebe",
		familyName: "Buffay",
		email: "pheebs@email.com",
		username: "User13",
		admin: false,
		photo: "images/phoebe.jpg"
	},
	{
        personalName: "Walter",
        familyName: "White",
        email: "heisenberg@mail.com",
        username: "User14",
        admin: false,
        photo: "images/walter.jpg"
	},
	{
		personalName: "Princess",
		familyName: "Peach",
		email: "peach@email.com",
		username: "User15",
		admin: false,
		photo: "images/princesspeach.png"
	}
];
const modal = document.getElementById("loginModal");
const form = document.getElementById("loginForm");
const userInfoCard = document.getElementById("userInfoCard");

// Display the login modal when the window loads
window.onload = () => {
	modal.style.display = "block";
};

  // Add a submit event listener to the login form
form.addEventListener("submit", (event) => {
	event.preventDefault(); // Prevent the default form submission behavior
	const usernameInput = document.getElementById("userData");
	const username = usernameInput.value.trim();
	const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

	// Validating username
	if (usernameRegex.test(username)) {
		const user = userData.find(user => user.username === username); //finds and assigns the user from userData whose username matches the provided username entered.
		if (user) {
			if (user.admin) { 
				displayPage(user);
			} else {
				displayPage(user, false); //false for showDeleteButton because user is a non-admin
			}
			closeModal(); //close modal once logged in
		} else {
			const userDataError = document.getElementById("usernameError");
			userDataError.textContent = "Invalid username";
			userDataError.style.color = "red";
		}
	}
});

// Variable to track the ID of the next user card
let nextCardId = 1; // This will help locate the user's data in the array and remove it

// Creating the user card
const createUserCard = (user, showDeleteButton) => {
	const cardId = `user-card-${nextCardId++}`; // Increments nextCardId to give each user an ID

	// Create the user card element with user information and a delete button (if not an admin)
	const userCard = document.createElement("div");
	userCard.id = cardId; // Usercard is being assigned with the userID
	userCard.innerHTML = `
	<div class="container d-flex justify-content-center align-items-center">
	<div class="card mt-4 mb-3" style="width: 18rem;">
		<img src="${user.photo || 'placeholder.jpg'}" class="card-img-top" style="object-fit: cover; height: 200px;" alt="User Photo">
		<div class="card-body text-center">
			<h5 class="card-title">${user.personalName} ${user.familyName}</h5>
			<p class="card-text">Email: ${user.email}</p>
			${showDeleteButton && !user.admin ? `<i class="fas fa-trash-can fa-xl" style="color: #f90bf1;" data-card-id="${cardId}" data-username="${user.username}" trash-title="Delete"></i>`
			 : ''}
		</div> 
	</div>
	</div>
	`; // If showDeleteButton is true and user isn't an admin - show button, attach cardId & associated username to it

	if (user.admin) {  //for the little admin sticker on the cards
		const adminLabel = document.createElement("p");
		adminLabel.textContent = "Admin";
		adminLabel.style.display = "inline-flex";
		adminLabel.style.borderRadius = "20% 20% 20% 20%";
		adminLabel.style.padding = "0px 4px 3px 3px";
		adminLabel.style.background = "rgba(250, 167, 250, 0.863)";
		adminLabel.style.color = "rgb(250, 79, 184)";
		userCard.querySelector(".card-body").appendChild(adminLabel);

	}

	return userCard;
};

// Function to display the page based on the user's role
const displayPage = (loggedInUser) => {
    userInfoCard.innerHTML = ""; // Clear existing content

	const backgroundColor = getBackgroundColor(loggedInUser);
    document.body.style.background = backgroundColor;
    document.documentElement.style.background = backgroundColor;

    // Display logged-in user
    displayUserInfo(loggedInUser);

    // Display admins
    if (loggedInUser.admin) {
        const admins = userData.filter(user => user.admin && user.username !== loggedInUser.username); //selects admin users from userData, excluding the currently loggedin user
        displayAdminUsers(admins);
        displayOtherUsers(loggedInUser, true); //true = showDeleteButton
    } else {
        const admins = userData.filter(user => user.admin && user.username !== loggedInUser.username);
        displayAdminUsers(admins);
    }
   
    displayToast(`Hello ${loggedInUser.personalName}, welcome back! `);
};


// change the background colour for each user
const getBackgroundColor = (user) => {
    switch(user.username) {
        case "User1":
            return "#caffbf"; 
        case "User2":
            return "#CCCCFF"; 
        case "User3":
            return "#cdb4db"; 
        case "User4":
			return "#ffd6a5";
		case "User5":
			return "#ffcbf2";
		case "User6":
			return "#fcf6bd";
		case "User7":
			return "url('images/michaelscott.png')"; //this was an accident but keeping it because it makes me laugh
		case "User8":
			return "#f2a8ff";
		case "User9":
			return "#aaf683";
		case "User10":
			return "#f2f7ff";
		case "User11":
			return "#ff928b";
		case "User12":
			return "#b0f2b4";
		case "User13":
			return "#fcf45d";
		case "User14":
			return "#a9def9";
		case "User15":
			return "#f694c1";	
    }
};

// Display admin users
const displayAdminUsers = (admins) => {
	const userInfoContainer = document.getElementById("userInfoCard");

	//heading for admin user cards:
	const adminHeading = document.createElement("h3");
	adminHeading.textContent = "Admins: ";
	adminHeading.className = "col-12 text-center mt-3 heading";
	userInfoContainer.appendChild(adminHeading);

	// Create a separate container for admin users' cards
	const adminUsersContainer = document.createElement("div");
	adminUsersContainer.className = "row justify-content-center"; 

	if (admins) {
		admins.forEach(admin => { // Creating admin cards for each admin user
			const adminCard = createUserCard(admin); // Passing admin to createUserCard
			adminCard.classList.add("col-lg-4", "col-md-6", "col-sm-12"); // Making the usercards as responsive columns
			adminUsersContainer.appendChild(adminCard); 
		});
	} 

	// Adding adminUsers container to userInfoContainer 
	userInfoContainer.appendChild(adminUsersContainer);

};

// Display user info in the user info card container
const displayUserInfo = (user) => {
	const userInfoContainer = document.getElementById("userInfoCard"); 
	const userCard = createUserCard(user);
	userCard.classList.add("centered"); // Adding class to center card
	userInfoContainer.appendChild(userCard);
};

// Display other users in the user info card container, excluding the logged-in user and admins
const displayOtherUsers = (loggedInUser, showDeleteButton) => {
    const userInfoContainer = document.getElementById("userInfoCard");
    
    // Create a separate container for other users' cards
    const otherUsersContainer = document.createElement("div");
    otherUsersContainer.className = "row"; // Display as a row

    // Heading for other users
    const heading = document.createElement("h3");
    heading.textContent = "Users:";
    heading.className = "col-12 text-center mt-3 heading";
    userInfoContainer.appendChild(heading);

    // Add responsive column classes to each user card
    userData.forEach(user => { // Loops through each user object in the user array
        // Exclude the logged-in user and admins
        if (user.username !== loggedInUser.username && !user.admin) { // excludes user & admin from being deleted
            const userCard = createUserCard(user, showDeleteButton); //user, true
            userCard.classList.add("col-lg-3", "col-md-4", "col-sm-6"); 
            otherUsersContainer.appendChild(userCard);
        }
    });

    // Adding the userCard container to the userInfoContainer
    userInfoContainer.appendChild(otherUsersContainer);
};


// Deletes user from the array if clicked
const deleteUser = (username) => {
	userData = userData.filter(user => user.username !== username); // Removing the username being clicked, condition "user.username !== username" is finding which user was passed through(clicked) to the deleteUser function.
};

// Handles the click events for delete button
const handleDeleteClick = (event) => {
	if (event.target.classList.contains('fas')) { // "If the class has the delete button then.."
		const cardId = event.target.dataset.cardId; // Retrieves value of the user ID that was clicked
		const username = event.target.dataset.username; // Retrieving username that was clicked associated with the ID
		deleteUser(username); // Calls function and deletes user from the array
		console.log("User: " + username + " " + " deleted");
		const cardToRemove = document.getElementById(cardId); // Finding the HTML element associated with the card to be deleted
		if (cardToRemove) { //if card exists
			cardToRemove.classList.add('slide-out'); //adding slide-out to class to initiate the slideout animation
			setTimeout(()=> { 
				cardToRemove.remove();
			}, 500);	//removes card after 0.5 seconds, so that the slideout animation can complete before the card is hidden
			console.log(userData) //checking if card was removed from the array
		}
	}
};

const displayToast = (message) => { 
    // make a toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    // make the toast body
    const toastBody = document.createElement('div');
    toastBody.className = 'toast-body';
    toastBody.textContent = message;

	// make the logout button
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.className = 'logout';
    logoutButton.addEventListener('click', () => {
    	location.reload(); // Refresh the page
    });

    // Append the logout button to the toast body
    toastBody.appendChild(logoutButton);

    // Append the body to the toast
    toast.appendChild(toastBody);

    // Append the toast to the document body
    document.body.appendChild(toast);

    // Show the toast
    toast.classList.add('show');
};

const closeModal = () => {
	modal.style.display = "none";
};

document.addEventListener('click', handleDeleteClick);