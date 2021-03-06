var fs = require('fs');
var htmlparser = require("htmlparser");
var sys = require('sys');
var table =[];


// is a html table object
IsTable = function (myobject, req, res, next ){
    for (var a = 0 ; a < myobject.length ;a++){
        if (myobject[a].name == "html"){
            for (var b = 0 ; b < myobject[a].children.length ;b++){
                if (myobject[a].children[b].name == "body") {
                    for (var c = 0; c < myobject[a].children[b].children.length; c++) {
                        if (myobject[a].children[b].children[c].name == "table") {
                            for (var d = 0; d < myobject[a].children[b].children[c].children[d].children.length; d++){
                                if (myobject[a].children[b].children[c].children[d].name == "tbody"){
                                    return (myobject[a].children[b].children[c].children[d]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}




ReadFile = function (arch, req, res, next){
    try {
        //Read html table file
        var htmlString = fs.readFileSync(arch, "utf8").toString();

        //Parser html table
        var handler = new htmlparser.DefaultHandler(function (error, dom) {
            if (error)
                console.log(error);
        });

        // Create a parsed string
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(htmlString);


        //create a object table
        var parsed = sys.inspect(handler.dom, false, null);
        var myobject = eval(parsed)
        var mytable = IsTable(myobject)

        var rowKeys = mytable.children[1];
        var index = [];
        for (var e = 0; e < rowKeys.children.length; e++) {
            index.push(rowKeys.children[e].children[0].data);
        }
        table.push(index);

        // define array row values (text)
        // exeption  mytable.children[0] = Header1 Header2
        // exeption  mytable.children[1] = Index
        for (var i = 2; i < mytable.children.length; i++) {
            myRow = mytable.children[i];
            var text = [];
            for (var e = 0; e < myRow.children.length; e++) {
                if (myRow.children[e].children) {
                    var datavalue =  myRow.children[e].children[0].data
                    text.push(datavalue);
                }
            }


            //insert array text to table object if text defined. & define lot and date
            if (text[8]) {
                if (!text[9]){
                    text[9] = 'NON';
                }
                if (!text[10]){
                    text[10] = 'NON';
                }
                table.push(text)
            }


        }
        return (table);
    }
    catch(req){

        return ('err');
    }
}

module.exports = ReadFile;
