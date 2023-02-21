function calGrade() {
    var num = document.getElementById("userInput").dataset.myVar;
    var grade = document.getElementById("usergrade").dataset.myVar;
    num = parseInt(num)
    grade = parseFloat(grade)
    var inputValues = [];
    var creditValues = [];
    for (var i = 0; i < num; i++) {
        var inputValue = document.getElementById("select_grade" + i).value;
        var creditValue = document.getElementById('getCredit' + i).innerHTML;
        inputValues.push(parseFloat(inputValue));
        creditValues.push(parseFloat(creditValue));
    }
    let sum = 0
    let sumCredit = 0
    for (var i = 0; i < inputValues.length; i++) {
        sumCredit += creditValues[i]
        sum += (inputValues[i] * creditValues[i]);
    }
    let gpa = sum/sumCredit
    let gpax = (gpa + grade) / 2
    document.getElementById("gpa").innerHTML = gpa.toFixed(2);
    document.getElementById("gpax").innerHTML = gpax.toFixed(2);
}