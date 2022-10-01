'use strict';

function getToday() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today
}

function getRequest() {

  var xhr= new XMLHttpRequest()
  xhr.open('GET', `https://api.apilayer.com/exchangerates_data/timeseries?start_date=2022-09-24&end_date=2022-10-01&base=PLN`, true)
  xhr.setRequestHeader('apikey', '')
 
  xhr.onload = function() {
 
    if(xhr.status === 200) {
      window.localStorage.setItem('data', this.responseText)
    } else {
      console.log('Error: ' + xhr.status)
    }
  } 
  xhr.send(null)
 }

function test() {

var item = window.localStorage.getItem('data')

for (var k in JSON.parse(item).rates[getToday()]) {

  console.log(k)
  var el = document.getElementById('rowList')
  var node = document.createElement('button')
  var valnode = document.createTextNode(' ' + JSON.parse(item).rates[getToday()][k])
  var textnode = document.createTextNode(k)
  node.appendChild(textnode)
  node.appendChild(valnode)
  el.appendChild(node)
  console.log(valnode)
}
console.log(getToday())
}

if (localStorage.data === undefined) {
  getRequest()
  test()
} else {
  console.log('data w localstorage')
  test()
}
 