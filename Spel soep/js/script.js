document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "In welk jaar speelt dit ontwerp zich af?",
            options: ["1400", "1450", "1490", "1500"],
            correctOption: "1490",
            ingredient: "Gember",
            image: "images/ginger.png"
        },
        {
            question: "Als je griepachtige verschijnselen had was je lichaam...?",
            options: ["In balans", "Uit balans"],
            correctOption: "Uit balans",
            ingredient: "Wortel",
            image: "images/carrot.png"
        },
        {
            question: "Wat zijn de 4 lichaamsvloeistoffen?",
            options: ["Bloed, slijm, gele gal, zwarte gal", "Bloed, water, slijm, gal", "Slijm, speeksel, zwarte gal, water"],
            correctOption: "Bloed, slijm, gele gal, zwarte gal",
            ingredient: "Peper",
            image: "images/peper.png"
        },
        {
            question: "Hoe werd vervuilde lucht ookwel genoemd?",
            options: ["Stank", "Smog", "Vuile lucht", "Miasma"],
            correctOption: "Miasma",
            ingredient: "Tijm",
            image: "images/tijm.png"
        },
        {
            question: "Wat probeerden middeleeuwse artsen te doen?",
            options: ["Symptomen bestrijden", "Lichaamsvloeistoffen herstellen"],
            correctOption: "Lichaamsvloeistoffen herstellen",
            ingredient: "Ui",
            image: "images/onion.png"
        },
        {
            question: "Wat schreven middeleeuwse artsen voor tegen een verkoudheid?",
            options: ["Kruiden en specerijen", "Warme en droge voedingsmiddelen"],
            correctOption: "Warme en droge voedingsmiddelen",
            ingredient: "Rozemarijn",
            image: "images/rozemarijn.png"
        },
        {
            question: "Veel slijm in je neus is een teken dat we...?",
            options: ["Naar de dokter moeten", "Een ziekte hebben"],
            correctOption: "Een ziekte hebben",
            ingredient: "Selderij",
            image: "images/celery.png"
        },
        {
            question: "Wat betekende het als een middeleeuwer niet in balans was, dan was hij/zij",
            options: ["Heel erg ziek", "Niet warm en droog genoeg", "Viel hij/zij op de grond"],
            correctOption: "Niet warm en droog genoeg",
            ingredient: "Peterselie",
            image: "images/parsley.png"
        },
        {
            question: "Als er teveel slijm ontstaat moet je?",
            options: ["Warme en droge dingen eten", "Hoesten", "Genoeg rust nemen"],
            correctOption: "Warme en droge dingen eten",
            ingredient: "Dille",
            image: "images/dille.png"
        },
        {
            question: "Wat doen we in de huidige medische wetenschap?",
            options: ["Herstellen van de lichaamsvloeistoffen", "Symptoombestrijding"],
            correctOption: "Symptoombestrijding",
            ingredient: "Runderschenkel",
            image: "images/runderschenkel.png"
        },
        {
            question: "Wat deed de middeleeuwer tegen een verkoudheid?",
            options: ["Naar de arts gaan", "Een lekkere soep maken"],
            correctOption: "Een lekkere soep maken",
            ingredient: "Soepballetje",
            image: "images/soepballetje.png"
        },
        {
            question: "Moderne geneeskunde gebruikt... om ons afweersysteem sterker te maken",
            options: ["Vaccins", "Technologieën"],
            correctOption: "Vaccins",
            ingredient: "Prei",
            image: "images/prei.png"
        },
        {
            question: "Welk seizoen is het als je koud en vochtig bent?",
            options: ["Zomer", "Lente", "Winter", "Herfst"],
            correctOption: "Winter",
            ingredient: "Champignons",
            image: "images/champignons.png"
        },
        {
            question: "Welk seizoen is het als je warm en droog bent?",
            options: ["Zomer", "Lente", "Winter", "Herfst"],
            correctOption: "Zomer",
            ingredient: "Pastinaak",
            image: "images/pastinaak.png"
        },
        {
            question: "In de... hebben mensen vaak last van griepachtige verschijnselen",
            options: ["Lente en zomer", "Herfst en winter"],
            correctOption: "Herfst en winter",
            ingredient: "Kalkoen",
            image: "images/kalkoen.png"
        },
        {
            question: "Deze griepachtige verschijnselen worden veroorzaakt door...",
            options: ["Virussen", "Bacterien"],
            correctOption: "Virussen",
            ingredient: "Paprika",
            image: "images/paprika.png"
        },
    ];

    const recipes = [
        {
            name: "Rundvleessoep",
            ingredients: ["Peper", "Tijm", "Rozemarijn", "Peterselie", "Champignons", "Runderschenkel", "Soepballetje", "Wortel", "Ui", "Prei", "Selderij", "Pastinaak"],
            type: "Rundvleessoep"
        },
        {
            name: "Groentesoep",
            ingredients: ["Gember", "Selderij", "Dille", "Prei", "Wortel", "Ui", "Peterselie", "Pastinaak", "Champignons", "Peper", "Rozemarijn", "Tijm"],
            type: "Groentesoep"
        },
    ];
    
    
    const popup = document.getElementById('scenario-popup');
    const toonScenarioButton = document.getElementById('toon-scenario-button');
    const questionContainer = document.getElementById('question-container');
    const ingredientContainer = document.getElementById('ingredient-container');
    const canvas = document.getElementById('soup-bowl');
    const ctx = canvas.getContext('2d');
    const boilingSound = document.getElementById('boiling-sound');
    const winMessage = document.createElement('div');
    winMessage.className = 'win-message';
    document.body.appendChild(winMessage);
    let ingredients = [];
    let boiling = false;
    let lastTime = 0;
    let bubblePositions = [];
    let steamPositions = [];
    let usedIngredients = {};
    let currentRecipe = {};
    let manOverleefd = false;
    let animationId = null; // To keep track of requestAnimationFrame

    // Initialize bubbles and steam positions
    function initializePositions() {
        bubblePositions = [];
        steamPositions = [];
        for (let i = 0; i < 20; i++) {
            bubblePositions.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3
            });
        }
        for (let i = 0; i < 10; i++) {
            steamPositions.push({
                x: Math.random() * canvas.width,
                y: Math.random() * (canvas.height / 3),
                radius: Math.random() * 20
            });
        }
    }

    function drawWater() {
        // Draw water
        ctx.fillStyle = '#4db8ff';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawBubbles() {
        // Draw bubbles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        bubblePositions.forEach(bubble => {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawSteam() {
        // Draw steam
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        steamPositions.forEach(steam => {
            ctx.beginPath();
            ctx.arc(steam.x, steam.y, steam.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawSoup() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWater();
        drawBubbles();
        drawSteam();
        // Draw ingredients
        ingredients.forEach((ingredient) => {
            const img = new Image();
            img.src = ingredient.image;
            ctx.drawImage(img, ingredient.x, ingredient.y, 50, 50);
        });
    }

    function animateBoiling(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ingredients.forEach((ingredient) => {
            ingredient.floatAngle += 0.05;
            ingredient.x += Math.sin(ingredient.floatAngle) * 0.5;
            ingredient.y += Math.cos(ingredient.floatAngle) * 0.5;
            if (ingredient.x <= 10) ingredient.x = 10;
            if (ingredient.x + 50 >= canvas.width - 10) ingredient.x = canvas.width - 60;
            if (ingredient.y <= 10) ingredient.y = 10;
            if (ingredient.y + 50 >= canvas.height - 10) ingredient.y = canvas.height - 60;
        });

        // Update bubble positions
        bubblePositions.forEach(bubble => {
            bubble.y -= 0.5;
            if (bubble.y < 0) {
                bubble.y = canvas.height;
                bubble.x = Math.random() * canvas.width;
                bubble.radius = Math.random() * 3;
            }
        });

        // Update steam positions
        steamPositions.forEach(steam => {
            steam.y -= 0.3;
            if (steam.y < 0) {
                steam.y = canvas.height / 3;
                steam.x = Math.random() * canvas.width;
            }
        });

        drawSoup();
        animationId = requestAnimationFrame(animateBoiling);
    }

    function stopAnimation() {
        cancelAnimationFrame(animationId);
        boiling = false;
        lastTime = 0;
        ingredients = [];
        initializePositions();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWater();
    }

    function initializeGame() {
        // Clear previous game data
        questionContainer.innerHTML = '';
        ingredientContainer.innerHTML = '';
        usedIngredients = {};
        ingredients = [];
        boiling = false;
        lastTime = 0;
        winMessage.style.display = 'none';
        initializePositions();

        // Randomize questions and show them...
        
        // Randomly select a recipe and display it in the popup
        currentRecipe = getRandomRecipe();
        displayRecipe(currentRecipe);

        drawWater();
    }

    // Function to get a random recipe from the list
    function getRandomRecipe() {
        return recipes[Math.floor(Math.random() * recipes.length)];
    }

    // Function to display the recipe ingredients in the popup
    function displayRecipe(recipe) {
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            li.style.fontSize = '18px'; // Lettergrootte instellen voor de ingrediëntenlijst
            li.style.color = '#d4af37'; // Kleur instellen voor de ingrediëntenlijst
            recipeList.appendChild(li);
        });
        const scenarioTextElement = document.getElementById('scenario-text');
    scenarioTextElement.textContent = 'Red Anna van haar verkoudheid en maak de juiste soep!';
    scenarioTextElement.style.fontSize = '22px'; // Lettergrootte instellen
    scenarioTextElement.style.color = '#ffffff'; // Kleur instellen
    
    const soupTypeElement = document.getElementById('soup-type');
    soupTypeElement.textContent = `Recept: ${recipe.type}`;
    // Stel de stijl voor het soep type in
    soupTypeElement.style.fontSize = '20px'; // Lettergrootte instellen voor het soep type
    soupTypeElement.style.color = '#d4af37'; // Kleur instellen voor het soep type
    }

    window.answerQuestion = (index, selectedOption) => {
        const question = questions[index];
        if (selectedOption === question.correctOption) {
            if (!usedIngredients[question.ingredient]) {
                const ingredientElement = document.createElement('div');
                ingredientElement.classList.add('ingredient');
                ingredientElement.setAttribute('draggable', 'true');
                ingredientElement.setAttribute('ondragstart', 'drag(event)');
                ingredientElement.id = question.ingredient;
                ingredientElement.style.backgroundImage = `url('${question.image}')`;

                const nameElement = document.createElement('p');
                nameElement.textContent = question.ingredient;
                ingredientElement.appendChild(nameElement);

                ingredientContainer.appendChild(ingredientElement);
                usedIngredients[question.ingredient] = true;
            }
        }
        document.querySelectorAll('.question')[index].style.display = 'none';
        checkQuestionsAnswered();
    };

    function checkQuestionsAnswered() {
        const answeredQuestions = Object.keys(usedIngredients).length;
        if (answeredQuestions === 5) {
            const dragMessage = document.createElement('div');
            dragMessage.className = 'drag-message';
            dragMessage.textContent = 'Sleep alle ingrediënten naar de soepkom!';
            document.body.appendChild(dragMessage);

            setTimeout(() => {
                document.body.removeChild(dragMessage);
            }, 3000);

            document.getElementById('check-button').style.display = 'block';
        }
    }

    function countSelectedIngredients() {
        return ingredients.length;
    }
    
    function allIngredientsInSoup() {
        // Deze functie is niet meer nodig voor de eindcontrole op het aantal ingrediënten
        return true; // Of een dummy-waarde, omdat we alleen tellen en niet controleren
    }
    
    
// Function to display the immediate result (survived or died)
function showImmediateResult() {
    const resultMessage = document.getElementById('result-message');
    const resultButtons = document.getElementById('result-buttons');

    if (manOverleefd) {
        resultMessage.textContent = 'Je hebt Anna gered van de verkoudheid!';
    } else {
        resultMessage.textContent = 'Je hebt Anna helaas niet kunnen redden, probeer het nog een keer!';
    }

    resultMessage.style.display = 'block';
    resultButtons.style.display = 'flex';
}

// Function to check the end condition and update manOverleefd
function checkEndCondition() {
    const numberOfIngredients = countSelectedIngredients();

    // Determine if the medieval man survived or died
    manOverleefd = numberOfIngredients === 12;

    // No immediate result here, just update manOverleefd
}

// Function to be called when the "Check" button is clicked
window.checkSoup = () => {
    checkEndCondition(); // Check the end condition (set manOverleefd)
    showImmediateResult(); // Show the immediate result based on manOverleefd
};






    window.allowDrop = (ev) => {
        ev.preventDefault();
    };

    window.drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    };

    window.drop = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const ingredient = document.getElementById(data);
        
        if (!ingredient.getAttribute('draggable')) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = ev.clientX - rect.left - 25; // Adjust for the size of the ingredient image
        const y = ev.clientY - rect.top - 25; // Adjust for the size of the ingredient image
    
        // Add the ingredient to the list of selected ingredients
        ingredients.push({ 
            image: ingredient.style.backgroundImage.slice(5, -2), 
            x: x, 
            y: y, 
            floatAngle: Math.random() * Math.PI * 2 
        });
    
        // Remove the ingredient from the ingredient container
        ingredientContainer.removeChild(ingredient);
    
        if (!boiling) {
            boiling = true;
            boilingSound.play();
            animateBoiling(0);
        }
    
        // Draw the soup with the new ingredients
        drawSoup();
    
        // Check the end game condition
        checkEndCondition();
    };
   
        // Function to toggle the scenario popup visibility
        window.togglePopup = (showStartButton) => {
            const startGameButton = document.getElementById('start-game-button');
            startGameButton.style.display = showStartButton ? 'block' : 'none';
            popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
    
            // When showing the popup initially, update it with the current recipe
            if (popup.style.display === 'block') {
                displayRecipe(currentRecipe);
            }
        };

   // Function to start the game
    function startGame() {
        togglePopup(false); // Close the popup
        initializeGame(); // Initialize the game
        
        // Toon alle vragen in questionContainer
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `
                <h3>Vraag ${index + 1}:</h3>
                <p>${question.question}</p>
                <ul>
                    ${question.options.map(option => `<li><button onclick="answerQuestion(${index}, '${option}')">${option}</button></li>`).join('')}
                </ul>
            `;
            questionContainer.appendChild(questionDiv);
        });
        
        // Display the current recipe in the popup
        displayRecipe(currentRecipe);
    }



// Function to start a new game
function startNewGame() {
    togglePopup(true); // Show the popup
    stopAnimation(); // Stop any ongoing animation
    currentRecipe = getRandomRecipe(); // Choose a new random recipe
    displayRecipe(currentRecipe); // Display the new recipe in the popup
    initializeGame(); // Initialize the game with new questions and recipe

    // Hide the result message and buttons
    document.getElementById('result-message').style.display = 'none';
    document.getElementById('result-buttons').style.display = 'none';

    // Reset the man's survival status
    manOverleefd = false;

    // Pause boiling sound
    boilingSound.pause();
    boilingSound.currentTime = 0;
}


// Event listeners for starting the game and starting a new game
window.startGame = startGame;
window.startNewGame = startNewGame;

// Initialize the game on page load
initializeGame();
togglePopup(true); // Initially show the popup with the current recipe
});
