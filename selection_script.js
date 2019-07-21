// Special thanks to: https://gist.github.com/opdude/3826350


var docRef = app.activeDocument;
var origDoc = app.activeDocument;

var rulerUnits = app.preferences.rulerUnits;
var typeUnits = app.preferences.typeUnits;

app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;

var position = docRef.selection.bounds;

docRef.selection.deselect();

var i = 0;
var x_k = position[0];
var y_k = position[1];
var selSze = [7, 15, 21];

for (i = 0; i < selSze.length; i++) {
	var floor = Math.floor(selSze[i]/2);	
	var ceil = Math.ceil(selSze[i]/2);
	var x = x_k - floor; // x pos from top left of future selection
	var y = y_k - floor; // y pos from top left of future selection
	var bounds = [[x, y], [x, y+selSze[i]], [x+selSze[i], y+selSze[i]], [x+selSze[i], y]];
	docRef.selection.select(bounds);
	
	docRef.selection.copy(true);
	var width = new UnitValue(selSze[i], 'px');
	var height = new UnitValue(selSze[i], 'px');
	var newDoc = documents.add(width, height, 72, 'sc_'+selSze[i], NewDocumentMode.GRAYSCALE);
	newDoc.paste();
	newDoc.layers.getByName("Background").remove();
	docRef.activeDocument = newDoc;
	
	var fileName = "bifurcation_"+selSze[i]+"x"+selSze[i];
	var filePath = origDoc.path;
	var saveFile = File(filePath + "/" + fileName);
	if(saveFile.exists) saveFile.remove();
	activeDocument.saveAs(saveFile, new PNGSaveOptions(), true, Extension.LOWERCASE);
	
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
	
	docRef = origDoc;
}

docRef.selection.deselect();

alert("Done with the selected area!");

app.preferences.rulerUnits = rulerUnits;
app.preferences.typeUnits = typeUnits;

