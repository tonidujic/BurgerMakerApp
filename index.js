const form=document.querySelector('form');
const logger=document.getElementById("logger");

/**
 * Creates a promise for burger creation step
 * @param {string} stepDescription 
 * @param {number} duration duration of the step in milliseconds
 * @returns 
 */
function burgerCreationStep(stepDescription, duration=1000){
    document.getElementById('loading').style.display='block';

    return new Promise((resolve, reject)=>{
       try {
          const logText=document.createElement("p");
          logText.innerHTML=stepDescription;
          logger.appendChild(logText);
          setTimeout(()=>{
            logText.innerHTML+=" = DONE";
            resolve();
          }, duration);
       } catch(err){
        reject(err);
       }
    });
}

/**
 * Cleanups logger and display before new order
 */
function cleanUp(){
    logger.innerHTML = "";
    const burgers = document.getElementsByClassName("burger");
    for(const burger of burgers){
        burger.style.display="none";
    }
    document.getElementById("loading").style.display="none";
}

/**
 * Creates burger
 * @param {string} chosenBurger 
 */
async function makeBurger(chosenBurger){
    document.getElementById("loading").style.display="block";

    // Ako želiš redom korake (sekvencijalno)
    await burgerCreationStep("grilling burger",3000);
    await burgerCreationStep("preparing buns");
    await burgerCreationStep("preparing vegetables");
    await burgerCreationStep("assembling burger");

    // Ako želiš paralelno, koristi ovo (umjesto gornjih await):
    // await Promise.all([
    //     burgerCreationStep("grilling burger",3000),
    //     burgerCreationStep("preparing buns"),
    //     burgerCreationStep("preparing vegetables"),
    //     burgerCreationStep("assembling burger")
    // ]);

    document.getElementById("loading").style.display="none";
    document.getElementById(`${chosenBurger}-display`).style.display="block";
}

/**
 * Sets burger data
 * @param {Event} e 
 */
function setBurger(e){
    e.preventDefault();
    cleanUp();  // prvo ocisti sve stare poruke i slike

    const data = new FormData(form);
    let chosenBurger = "";
    for(let entry of data.values()){
        chosenBurger += entry;
    }

    makeBurger(chosenBurger);
}

form.addEventListener("submit", setBurger);