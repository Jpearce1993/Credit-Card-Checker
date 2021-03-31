// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:


// function to check validity of a card number despite the length
// of the card number.
const validateCred = arr => {
    let sum = 0;
    let temp = 0;


    // determining if the array has an even or odd amount of indices.
    // if odd, add a 0 to index 0 so that the algorithm can calulate correctly without
    // changing the total sum at the end of the calculation
    if (arr.length % 2 !== 0){
        arr.unshift(0);
    };

    for (let x = arr.length - 1; x >= 0; x--){
        if ((x % 2) === 0) {
            temp = (arr[x] * 2);
            //console.log(`Temp x 2 ${temp}`);

            if(temp >= 10){
                temp = ((temp % 10) + (Math.floor(temp * 0.1)));
                //console.log(`Temp over 10: ${temp}`);
            }
        } else if ((x % 2) !== 0) {
            temp = (arr[x]);
            //console.log(`${arr[x]} x 1 = ${temp}`);
        };
        //console.log(`Sum: ${sum} pre`);
        sum = sum + temp;
        //console.log(`Sum: ${sum} post`);
    };
    //console.log(`Total Sum: ${sum}`);

    if ((sum % 10) === 0) {
        return true;
    } else if ((sum % 10) !== 0) {
        return false;
    };
};

// function to validate all cards given in the batch array
const validateAllCards = arr => {
    for (let x = 0; x < arr.length; x++){
        console.log(`Card #${x + 1}: ${validateCred(arr[x])}`);
    };
};

// function to determine which cards are invalid and
// creates an array with the invalid cards
const findInvalidCards = arr => {
    const invalidArr = [];

    // for loop that adds the invalid card to a new array and returns it
    for (let x = 0; x < arr.length; x++){
        if(!validateCred(arr[x])){
            //console.log(`Card #${x + 1}: ${validateCred(arr[x])}`);
            invalidArr.push(arr[x]);
        };
    };

    return invalidArr;
};

// function to identify the card company based on the first number
const idCards = arr => {

    // id is assigned index 0 due to the card company id being the
    // first number in the array. This function does not need to shift() the
    // array like idInvalidateCardCompanies because the array has not been
    // unshifted() here.
    const id = arr[0];

    // switch statement to identify the card company
    switch (id) {
        case 3: 
            return `Amex (American Express)`;
            break;
        case 4: 
            return `Visa`;
            break;
        case 5:
            return `Mastercard`;
            break;
        case 6:
            return `Discover`;
            break;
        default:
            return `The card company could not be identified.`;
    };
};

// function to id the card companies of the invalid cards
const idInvalidCardCompanies = (arr) => {

    // creating an array filled with all invalid cards
    const invalidArr = findInvalidCards(arr);
    
    const finalArr = [];
    let count = 0;
    let temp;

    // for loop that checks if any of the invalid cards had been given a 0
    // as first number due to odd number lengths and returns them to original length.
    // This allows us to call upon the company id number for idCards().
    for (let x = 0; x < invalidArr.length; x++){
        temp = invalidArr[x];
        if (temp[0] === 0){
            temp.shift();
        };

        finalArr.push(idCards(temp));
    };

    // for loop that searches through the array twice and removes
    // any duplicate entries for card companies
    for(let b = 0; b < finalArr.length; b++){
        for (let c = 0; c < finalArr.length; c++){
            if (finalArr[b] === finalArr[c]){
                if(count === 0){
                    finalArr.splice(c,1)
                };
                count++;
            };
        };
        count = 0;
    };
    
    return finalArr;
};

// function to make invalid cards valid
const makeInvalidValid = arr => {
    let sum = 0;
    let temp = 0;
    let count = 0;

    // for loop to determine the sum of a card number
    // used in this sequence for invalid numbers but doesn't 
    // affect already valid numbers.
    for (let x = arr.length - 1; x >= 0; x--){
        if ((x % 2) === 0) {
            temp = (arr[x] * 2);
            if(temp >= 10){
                temp = ((temp % 10) + (Math.floor(temp * 0.1)));
            };
        } else if ((x % 2) !== 0) {
            temp = (arr[x]);
        };
        sum = sum + temp;
    };

    // adds up the difference needed to make
    // sum % 10 === 0
    for (let x = (sum % 10); x < 10; x++){
        count++;
    }

    // Adds a 0 in the x2 slot of the algorithm for even numbered
    // credit card lengths and does not for odd numbered lengths then
    // pushes the count number into the array to create a valid card.
    // This prevents the additional number added from being doubled
    // and doesn't change the number sequence already used on the card.
    if (arr.length % 2 !== 0 && count !== 0){
        arr.push(count);
    } else if (arr.length % 2 === 0 && count !== 0) {
        arr.push(0);
        arr.push(count);
    };

    return validateCred(arr);
};


//output testing

//console.log(validateCred(valid1));
//console.log(validateCred(valid3));

//validateAllCards(batch);
//console.log(findInvalidCards(batch));

//console.log(idInvalidCardCompanies(batch));

/*
console.log(makeInvalidValid(invalid1));
console.log(makeInvalidValid(invalid2));
console.log(makeInvalidValid(invalid3));
console.log(makeInvalidValid(invalid4));
console.log(makeInvalidValid(invalid5));
*/