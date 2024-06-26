
// Name: Chimara Okeke
// Notes to self:
// Make sure you put checks in your JSON files
// JSON is very meticulous about syntax errors
const offeringsJsonString = `
{
    
    "items" : [
        {
            "name" : "Jollof Rice",
            "price" : 18.23,
            "isVegetarian" : true,
            "spicinessScale" : 5,
            "ingredients" : [ "red oil", "long grain rice", "onions", "tomatoes", "spices" ]
        },

        {
            "name" : "Moussaka",
            "price" : 10.49,
            "isVegetarian" : false,
            "spicinessScale" : 0,
            "ingredients" : [ "eggplants", "potatoes", "lamb mince", "bay leaf"]
        },

        {
            "name" : "Pierogi",
            "price" : 9.56,
            "isVegetarian" : true,
            "spicinessScale" : 0,
            "ingredients" : [ "sour cream", "cheddar cheese", "eggs" ]
        },

        {
            "name" : "Spicy Tofu Burrito",
            "price" : 12.99,
            "isVegetarian" : true,
            "spicinessScale" : 4,
            "ingredients" : [ "flour tortillas", "tofu", "rice", "soy cheese", "chili peppers"]
        }
    ]


}
`
// to handle invalid JSON gracefully, do the below things
let offeringsJson = { };

function buildOfferingsSection() {

    let sectionElement = document.getElementById("offerings-section");

    if (!sectionElement) { 
        console.log("Cannot find where to put the offerings!");
        return;
    }

    
    try {
        // converts a JSON string to a JSON object
        offeringsJson = JSON.parse(offeringsJsonString);
        console.log(offeringsJson);
    } 
    catch (error) { // the below message appears on browser in case of error
        alert("There is a problem with the menu. Please contact a staff member: "+ error + "Just kidding.");
    }

    if (offeringsJson.items) {
        alert("Welcome!");

    }
    offeringsJson.items.forEach(item => {

        let newDomItem = document.createElement("p");
        newDomItem.className = "Item-name";
        newDomItem.innerHTML = item.name;
        sectionElement.appendChild(newDomItem);
        
        newDomItem = document.createElement("p");
        newDomItem.className = "item-price";
        newDomItem.innerHTML = "$" + item.price.toFixed(2); //fix to 2 d.p
        sectionElement.appendChild(newDomItem);

        let listString = ""
        item.ingredients.forEach((ingredient, index) => {
            if (index > 0) {
                listString += ", ";
            }
            listString += ingredient;
        });

        newDomItem = document.createElement("p");
        newDomItem.className = "item-ingredients";
        newDomItem.innerHTML = listString;
        sectionElement.appendChild(newDomItem);

        let ratingString = "vegetarian: ";
        ratingString += item.isVegetarian ? "yes" : "no";

        if (item.spicinessScale > 0) {
            ratingString += ", spiciness: " + item.spicinessScale + "/3";
        }

        newDomItem = document.createElement("p");
        newDomItem.className = "item-footnotes";
        newDomItem.innerHTML = ratingString;
        sectionElement.appendChild(newDomItem);
        

    }) // or offeringJson["name of attr"]
}


// Displays a linked PDF on the site
function getPdf() {

    console.log("getPDF() called");

    fetch("http://127.0.0.1:3000/?data=" + JSON.stringify(offeringsJson)) // stringify turns offersJson object to a string
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let url = data.pdfUrl;

        if (url) { // it the PDF url is not known
            window.location.href = url; // then change current window to the right url page
        }
        else {
            alert("An error occured while requesting the PDF");
        }
    })
    .catch(error => console.log("An error occurred while requesting the PDF: " + error));

}

buildOfferingsSection();


// background music

// Get the audio element
var audio = document.getElementById("backgroundMusic");

// Function to play the audio
function playMusic() {
    audio.play();
}

// Function to pause the audio
function pauseMusic() {
    audio.pause();
}
