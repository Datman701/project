
let emojis = {
    love: '❤️',
    career: '💼',
    luck: '🍀',
    default: '🔮'
}

//event listeners
const crystalBall = document.getElementById('crystal-ball')
const questionInput = document.getElementById('question-input')
const askButton = document.getElementById('ask-button')
const fortuneDisplay = document.getElementById('fortune-display')
const loadingText = document.getElementById('loading-text')


// Gemini API Key
const GEMINI_API_KEY = 'AIzaSyBHKXKNXlrkMg04Ux9sAr1gvKmkzG4Esgo'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

askButton.addEventListener('click', getFortune);
questionInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getFortune()
    }
});

crystalBall.addEventListener('click', function() {
    questionInput.focus();
});

// main fortune telling function
async function getFortune() {
    const question = questionInput.value.trim();
    
    // input validation
    if (question === '') {
        fortuneDisplay.textContent = 'Please ask a question first! '
        fortuneDisplay.style.color = '#ff4444'
        return;
    }

    // show loading state
    loadingText.style.display = 'block'
    fortuneDisplay.textContent = ''
    crystalBall.style.backgroundColor = '#8888ff'

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Using the mystical energies of the cosmos, craft a fortune that weaves together elements of astrological wisdom, 
                        personal growth, and destiny.  Include vivid and poetic imagery that evokes the timeless rhythms of the stars and seasons. 
                        The fortune should hint at upcoming opportunities, challenges, and moments of clarity. 
                        Provide insights that are uplifting yet grounded,determination, 
                        and an appreciation for beauty and comfort. Close the message with a hint of mystery, leaving the user eager to uncover what lies ahead . 
                        use the given question to answer in such a manner,also keep the messages simple yet mystical    : ${question}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const fortune = data.candidates[0].content.parts[0].text;

        // fortune with a typing effect
        typeWriter(fortune);

    } catch (error) {
        // responses if API fails
        const fallbackFortunes = "The crystal ball is cloudy today... Try again later! "

    }

    // Reset states
    loadingText.style.display = 'none'
    crystalBall.style.backgroundColor = '#4444ff'
    questionInput.value = ''
}

// typing effect
function typeWriter(text) {
    let i = 0
    fortuneDisplay.textContent = ''
    fortuneDisplay.style.color = 'white'
    
    function type() {
        if (i < text.length) {
            fortuneDisplay.textContent += text.charAt(i)
            i++
            setTimeout(type, 50)
        }
    }
    type()
}


document.getElementById("darkBtn").onclick = function() {
    document.body.style.backgroundColor = "black"
    document.getElementById("fortune-box").style.backgroundColor = "#222"
    document.getElementById("crystal-ball").style.backgroundColor = "purple"
}

document.getElementById("lightBtn").onclick = function() {
    document.body.style.backgroundColor = "white";
    document.getElementById("fortune-box").style.backgroundColor = "#ddd"
    document.getElementById("fortune-box").style.color = "black"
    document.getElementById("crystal-ball").style.backgroundColor = "blue"
}

document.getElementById("magicBtn").onclick = function() {
    document.body.style.backgroundColor = "darkblue"
    document.getElementById("fortune-box").style.backgroundColor = "#000066"
    document.getElementById("fortune-box").style.color = "gold"
    document.getElementById("crystal-ball").style.backgroundColor = "violet"
}





let currentCategory = "";

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // removing active class from all buttons
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('category-active'))
        
        // Add active class to clicked button
        this.classList.add('category-active')
        
        // update crystal ball color
        switch(this.dataset.type) {
            case 'love':
                crystalBall.style.backgroundColor = '#ff69b4'
                break
            case 'career':
                crystalBall.style.backgroundColor = '#4169e1'
                break
            case 'luck':
                crystalBall.style.backgroundColor = 'green'
                break
        }

        crystalBall.innerHTML = `<span style="font-size: 50px">${emojis[this.dataset.type]}</span>`
        
        currentCategory = this.dataset.type
    });
});


document.getElementById("reveal-fortune").addEventListener("click", function () {
    const display = document.getElementById("fortune-display")
    display.innerHTML = ""  // clear previous fortune
    let index = 0;})

