let exp = ""; // Variable pour stocker l'expression mathématique actuelle
let op="";

function ajouter(char) {
    // Empêcher de commencer par un opérateur
    if (isOperator(char) && exp === "") {
        return;
    }

    // Limiter la longueur des chiffres à 15
    if (!isOperator(char)) {
        const parts = exp.split(/[\+\-\*\/]/);
        const lastpart = parts[parts.length - 1];
        if (lastpart.length >= 15) {
            return;
        }
    }

    // Empêcher plusieurs points décimaux dans un même nombre
    if (char === '.') {
        const parts = exp.split(/[\+\-\*\/]/);
        const lastpart = parts[parts.length - 1];
        if (lastpart.includes('.')) {
            return;
        }
        if(isOperator(exp.slice(-1)) || exp==""){
            return;
        }
    }

    // Empêcher les doubles opérateurs
    if (isOperator(char) && isOperator(exp.slice(-1))) {
        return;
    }
    if(isOperator(char)){
        op=char;
    }
    // Ajouter le caractère à l'expression
    exp += char;
    document.getElementById("res").value = exp;
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}
function clearDisplay(){
    document.getElementById('res').value="";
    exp="";
}
function deleteChar(){
    exp=exp.slice(0,-1);
    ope=exp.slice(-1);
    if(isOperator(ope)){
        op="";
    }
    document.getElementById('res').value=exp;
}
function calculate(){
    const res=document.getElementById('res');
    try{
        exp=eval(exp).toString();
        if(exp=='Infinity' || exp=='-Infinity'){
            alert("Impossible de diviser sur 0.");
            exp=""
        }
        else{
            res.value=exp;
        }
    }
    catch(e){
        alert("ERROR!");
        exp="";
    }
}

function invertSign() {
    if (exp === "") {
        return;
    }

    if (isOperator(exp.slice(-1))) {
        return;
    }

    const parts = exp.split(/([\+\*\/])/);
    let lastPart = parts.pop();

    if (!lastPart.includes('(-')) {
        lastPart = '(-' + lastPart + ')';
    }else {
        lastPart = lastPart.slice(2,-1);
    }

    parts.push(lastPart);
    exp = parts.join('');
    document.getElementById("res").value = exp;
}