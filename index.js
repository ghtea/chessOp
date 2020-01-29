/* dataOriginal 이용 가능 (배열) */
var tableMain = document.getElementById("tableMain");
var lengthTable = dataOriginal.length;

function compaireFunc(key) {
  return function(a, b) {
    return b[key] - a[key];
  };
}

function showAll() {
  var m1 = document.querySelector('input[name="m1"]:checked').value;

  var rows = document.getElementsByClassName("rowTableMain");

  for (var i = 0; i < lengthTable; i++) {
    var current


    var row = tableMain.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    row.classList.add("rowTableMain");
    row.classList.add("m" + dataOriginal[i]["stage"]);

    cell1.innerHTML = "&#128073;";
    cell2.innerHTML = dataOriginal[i]["mBefore"];
    cell3.innerHTML = dataOriginal[i]["mThis"];
    




}
