/**
 * PdfReader: class that reads a PDF file, and calls a function on each item found while parsing that file.
 * @author Adrien Joly, http://github.com/adrienjoly
 * This content is released under the MIT License.
 *
 * An item object can match one of the following objects:
 * - null, when the parsing is over, or an error occured.
 * - {file:{path:string}}, when a PDF file is being opened.
 * - {page:integer}, when a new page is being parsed, provides the page number, starting at 1.
 * - {text:string, x:float, y:float, w:float, h:float...}, represents each text with its position.
 *
 **/
var fs = require('fs');
var LOG = require("./lib/LOG.js");
var PFParser = require("pdf2json/pdfparser"); // doc: https://github.com/modesty/pdf2json

function forEachItem(pdf, pdfFilePath ,handler){
  //console.log(JSON.stringify(pdf.data));
  var pageNumber = 0;
  for (var p in pdf.Pages) {
    var page = pdf.Pages[p];
    handler(null, {
      page: ++pageNumber
    });
    for (var t in page.Texts) {
      var item = page.Texts[t];
      //console.log(item);
      item.text = decodeURIComponent(item.R[0].T);
      handler(null, item);
    }
  }



  handler();
}

function PdfReader(options){
  LOG("PdfReader"); // only displayed if LOG.js was first loaded with `true` as init parameter
  this.options = options || {};
}

/**
 * parseFileItems: calls itemHandler(error, item) on each item parsed from the pdf file
 **/
PdfReader.prototype.parseFileItems = function(pdfFilePath, itemHandler){

  itemHandler(null, { file: { path: pdfFilePath }});
  var pdfParser = new PFParser(this, 1);
  pdfParser.on("pdfParser_dataError", itemHandler);
  pdfParser.on("pdfParser_dataReady", function (pdfData){
    //console.log("PDFDATA: "+ JSON.stringify(pdfData));
    forEachItem(pdfData, pdfFilePath ,itemHandler);

    var name = pdfFilePath.split(".")[1];

    fs.writeFile("."+ name + ".txt", pdfParser.getRawTextContent());
    console.log('It saved');



  });


  var verbosity = this.options.debug ? 1 : 0;
  pdfParser.loadPDF(pdfFilePath, verbosity);
};



module.exports = PdfReader;
