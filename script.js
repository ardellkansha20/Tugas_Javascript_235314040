document.addEventListener("DOMContentLoaded", function () { 
    const submitBtn = document.getElementById("submitBtn"); 
    const choicesContainer = document.getElementById("choicesContainer"); 
    const selectionContainer = document.getElementById("selectionContainer"); 

    submitBtn.addEventListener("click", function () { 
        const nameInput = document.getElementById("name"); 
        const quantityInput = document.getElementById("quantity"); 

        const name = nameInput.value.trim(); 
        const quantity = parseInt(quantityInput.value); 

        if (!name || isNaN(quantity) || quantity < 1) { 
            alert("Harap isi nama dan jumlah pilihan dengan benar.");
            return; 
        }

        nameInput.readOnly = true; 
        quantityInput.readOnly = true; 
        submitBtn.style.display = "none"; 

        choicesContainer.innerHTML = ""; 
        selectionContainer.innerHTML = ""; 

        let optionsArray = []; 

        for (let i = 1; i <= quantity; i++) { 
            const div = document.createElement("div"); 
            const label = document.createElement("label"); 
            label.textContent = `Pilihan ${i} :`; 

            const input = document.createElement("input"); 
            input.type = "text"; 
            input.placeholder = `Teks Pilihan ${i}`; 
            input.id = `choice${i}`; 

            div.appendChild(label); 
            div.appendChild(input); 
            choicesContainer.appendChild(div); 

            optionsArray.push(input.id); 
        }

        const confirmBtn = document.createElement("button"); 
        confirmBtn.textContent = "OK"; 
        confirmBtn.classList.add("btn", "btn-success"); 
        confirmBtn.id = "confirmBtn"; 

        choicesContainer.appendChild(confirmBtn); 

        confirmBtn.addEventListener("click", function () { 
            let allFilled = optionsArray.every(id => document.getElementById(id).value.trim() !== ""); 

            if (!allFilled) { 
                alert("Harap isi semua pilihan sebelum melanjutkan.");
                return; 
            }

            optionsArray.forEach(id => document.getElementById(id).readOnly = true); 
            confirmBtn.remove(); 
            generateSelection(name, quantity, optionsArray); 
        });
    });

    function generateSelection(name, quantity, optionsArray) { 
        selectionContainer.innerHTML = "<h3>Pilihan :</h3>"; 

        optionsArray.forEach((id) => { 
            const radioDiv = document.createElement("div"); 

            const radio = document.createElement("input"); 
            radio.type = "radio"; 
            radio.name = "option"; 
            radio.value = document.getElementById(id).value; 
            radio.classList.add("radio-option");

            const label = document.createElement("label"); 
            label.textContent = ` ${document.getElementById(id).value}`; 

            radioDiv.appendChild(radio); 
            radioDiv.appendChild(label); 
            selectionContainer.appendChild(radioDiv); 
        });

        const finalOkBtn = document.createElement("button"); 
        finalOkBtn.textContent = "Submit"; 
        finalOkBtn.classList.add("btn", "btn-success"); 
        finalOkBtn.id = "finalOkBtn"; 

        selectionContainer.appendChild(finalOkBtn); 

        finalOkBtn.addEventListener("click", function () { 
            const selectedOption = document.querySelector('input[name="option"]:checked'); 

            if (!selectedOption) { 
                alert("Harap pilih salah satu pilihan sebelum melanjutkan.");
                return; 
            }

            const selectedText = selectedOption.value; 
            const choicesText = optionsArray.map(id => document.getElementById(id).value).join(", "); 

            const resultDiv = document.createElement("div"); 
            resultDiv.style.border = "1px solid black"; 
            resultDiv.style.padding = "10px"; 
            resultDiv.style.marginTop = "10px"; 

            resultDiv.innerHTML = ` 
                Hallo, nama saya <b>${name}</b>, saya mempunyai sejumlah <b>${quantity}</b> pilihan yaitu <b>${choicesText}</b>, dan saya memilih <b>${selectedText}</b>.
            `; 

            selectionContainer.appendChild(resultDiv); 
            finalOkBtn.remove();

            // **Menonaktifkan semua radio button setelah submit**
            document.querySelectorAll(".radio-option").forEach(radio => {
                radio.disabled = true;
            });
        });
    }
});
