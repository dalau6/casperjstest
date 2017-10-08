var names = [];
var casper = require('casper').create();
var search;
var fname;

var fs = require('fs');
var system = require('system');

system.stdout.writeLine('Enter file name: ');
fname = system.stdin.readLine();
var file = fs.open('');

function getNames() {
    var names = document.querySelectorAll('h3.lvtitle');
    return Array.prototype.map.call(names, function(e) {
        return e.innerText;
    });
}

casper.start('https://www.ebay.com/', function() {
   // Wait for the page to be loaded
   this.waitForSelector('form#gh-f');

   // user's input from keyboard
   system.stdout.writeLine('Enter search: ');
   search = system.stdin.readLine();
});

casper.then(function() {
  // search for 'casperjs' from eBay form
  this.fill('form#gh-f', { '_nkw': search }, true).thenClick('#gh-btn', function() {
    names = (this.evaluate(getNames));
  });
});

//document.querySelector('[name="_nkw"]').name = 'watches';
casper.run(function() {
    // echo results in some pretty fashion
    this.echo(names.length + ' names found:');
    this.echo(' - ' + names.join('\n - ')).exit();
});
