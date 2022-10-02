'use strict';

window.printValue = function printValue(id) {
  var item = window.localStorage.getItem('data')
    document.getElementById('rowResult').innerHTML = ''
    document.getElementById('colHeader').innerText = id
  for (var k in JSON.parse(item).rates) {
    var el = document.getElementById('rowResult')
    var node = document.createElement('td')
    var valuenode = document.createTextNode(' | ' + JSON.parse(item).rates[k][id])
    var namenode = document.createTextNode(k)
    node.appendChild(namenode)
    node.appendChild(valuenode)
    node.classList.add('main__table-p', `${k}`)
    node.setAttribute('id',`${id}p`)
    el.appendChild(node)
  }
}

if (localStorage.data === undefined || localStorage.date !== getAPIDate('today')) {
  getRequest()
  window.localStorage.date = getAPIDate('today')
} else {
  printCurrency()
}
printCurrency()

function getAPIDate(req) {
  
  var today = new Date()
  var previousMonday = new Date()
  previousMonday.setDate(previousMonday.getDate() - ((previousMonday.getDay() + 6 ) % 7 + 7))

  var prevMondaymm = String(previousMonday.getMonth() + 1).padStart(2, '0')
  var prevMondayyyyy = previousMonday.getFullYear()
  var prevMondaydd = String(previousMonday.getDate()).padStart(2, '0')
 

  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var yyyy = today.getFullYear()

  switch (req) {
    case 'prevMonday':
      today =  prevMondayyyyy + '-' + prevMondaymm + '-' + prevMondaydd
      break
    case 'today':
      today = yyyy + '-' + mm + '-' + dd
      break
    }
  return today
}


function getRequest() {
  var xhr= new XMLHttpRequest()
  xhr.open('GET', `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${getAPIDate('prevMonday')}&end_date=${getAPIDate('today')}&base=PLN`, true)
  xhr.setRequestHeader('apikey', '')
 
  xhr.onload = function() {
 
    if(xhr.status === 200) {
      window.localStorage.setItem('data', this.responseText)
      printCurrency()
    } else {
      console.log('Error: ' + xhr.status)
    }
  } 
  xhr.send(null)
}

function printCurrency() {
  var item = window.localStorage.getItem('data')

  for (var k in JSON.parse(item).rates[getAPIDate('today')]) {
    var el = document.getElementById('rowList')
    var node = document.createElement('button')
    var valuenode = document.createTextNode(' ' + JSON.parse(item).rates[getAPIDate('today')][k])
    var namenode = document.createTextNode(k)
    node.appendChild(namenode)
    node.appendChild(valuenode)
    el.appendChild(node)
    node.classList.add('main__table-button', `${k}`)
    node.setAttribute('id',`${k}`)
    node.setAttribute('onClick','printValue("' + `${k}` +'")')
  }
}

