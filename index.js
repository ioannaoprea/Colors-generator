// Get references to the HTML elements
const colorInput = document.getElementById("color-input");
const colorSchemeType = document.getElementById("color-scheme-type");
const getColorBtn = document.getElementById("get-color-btn");
const colorBlocks = document.querySelectorAll(".color-block");
const colorNames = document.querySelectorAll(".color-name");

function handleClick(event){
    event.preventDefault();
    getColorScheme(colorInput.value, colorSchemeType.value)
        .then(colors => getColorBlocks(colors));
}

// fetches color scheme data from the API based on the base color and the mode selected
function getColorScheme(baseColor, mode) {
    const url=`https://www.thecolorapi.com/scheme?hex=${baseColor.slice(1)}&mode=${mode}`;
    return fetch(url)
            .then(resp =>resp.json())
            .then(data => data.colors.map(item => item.hex.value)); //to take the arr of color obj from the Api resp, extracts the hex values of each color and returns a new arr of only hex values
}

// updates the color blocks and color name based on the provided colors
function getColorBlocks(colors){
    colorBlocks.forEach((block, i) => {
        block.style.backgroundColor=colors[i];
        block.addEventListener("click", () => copyToClipboard(colors[i]));
    })

    colorNames.forEach((namee, i) => {
        namee.textContent=colors[i];
        namee.addEventListener("click", () => copyToClipboard(colors[i]));
    })
}

// copy color name
function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea); 

    const message = document. createElement("div");
    message.textContent = "Copied to clipboard!";
    message.classList.add("clipboard-message");
    document.body.appendChild(message);

    setTimeout(() => message.remove(), 2000);
}

getColorBtn.addEventListener("click", handleClick);

// set initial values and paint the default colors
const colors = ["#F55A5A", "#2B283A", "#FBF3AB", "#AAD1B6", "#A626D3"];
colorInput.value=colors[0];
getColorBlocks(colors);