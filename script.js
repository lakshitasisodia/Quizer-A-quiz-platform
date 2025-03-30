document.addEventListener("DOMContentLoaded", () => {
    let classnum = localStorage.getItem("selectedClass");

    fetch(`data/class${classnum}.json`).then(response => response.json()).then(data => {
        let allquestions = data.quiz;
        let heading = document.querySelector("h1");
        heading.innerText = `👨‍🎓Class ${data.class} Quiz👩‍🎓`;
        let quizbody = document.querySelector(".containerbox");

        quizbody.innerHTML = "";
        let selectedpart = allquestions.sort(() => 0.5 - Math.random()).slice(0, 15);

        selectedpart.forEach((q, index) => {
            let questionblock = document.createElement("div");
            questionblock.classList.add("quizcontainer");
            questionblock.innerHTML = `
                <p><strong>${index + 1}.</strong> ${q.question}</p>
                <ul>
                ${q.options.map(option => `
                    <li>
                        <input type="radio" name="q${index}" value="${option}" id="q${index}-${option}">
                        <label for="q${index}-${option}">${option}</label>
                    </li>
                `).join('')}
                </ul>
                <p class="correct-answer" style="display: none; color: green;"><strong>Correct Answer:</strong> ${q.answer}</p>
            `;

            quizbody.appendChild(questionblock);
        });

        let submit = document.querySelector(".submitbutton");
        submit.addEventListener("click", () => {
            let score = 0;

            selectedpart.forEach((q, index) => {
                let answer = document.querySelector(`input[name="q${index}"]:checked`);
                let options = document.querySelectorAll(`input[name="q${index}"]`);
                let correctAnswerText = document.querySelectorAll(".correct-answer")[index]; 
                
                options.forEach(option => {
                    let label = document.querySelector(`label[for="${option.id}"]`);
                    option.disabled = true; // Disable all options
                    
                    if (option.value === q.answer) {
                        label.style.color = "green"; // Correct answer in green
                    } 
                    if (answer && answer.value !== q.answer && option.checked) {
                        label.style.color = "red"; // Wrong selected answer in red
                    }
                });

                if (answer && answer.value === q.answer) {
                    score++;
                }

                // Show the correct answer below the question
                correctAnswerText.style.display = "block";
            });

            document.querySelector(".scorebox").innerText = `Score: ${score} / 15`;
            submit.disabled = true; 
            submit.style.backgroundColor = "grey"
        });
    });
});
