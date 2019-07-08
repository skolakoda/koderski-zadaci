const jasmine = window.jasmine
const myCustomReporter = {
  isFailed: false,

  jasmineStarted: function (suiteInfo) {
    console.log('Running suite with ' + suiteInfo.totalSpecsDefined)
    console.log('Reporting via MyCustomReporter')
  },

  suiteStarted: function (result) {
    console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName)
  },

  specStarted: function (result) {
    console.log('Spec started: ' + result.description + ' whose full description is: ' + result.fullName)
  },

  specDone: function (result) {
    if (result.status !== 'passed') {
      this.isFailed = true
    }
    console.log('Spec: ' +
        result.description +
        ' was ' +
        result.status)
  },

  suiteDone: function (result) {
    console.log('!!!!!!!!!!!!')
    console.log(result.failedExpectations)
  },

  jasmineDone: function (result) {
    const resultHTMLElement = document.querySelector('#result')
    let message = ''
    if (this.isFailed) {
      message = 'Greška! Funkcija nije dobra'
    } else {
      message = 'Zadatak rešen...Dobili ste 3 bambija!'
    }
    resultHTMLElement.append(message)

    console.log('Finished suite')
    console.log(result.overallStatus)
  }
}

jasmine.getEnv().addReporter(myCustomReporter)
