// Special thanks to: https://gist.github.com/opdude/3826350

var docRef = app.activeDocument;
var origDoc = app.activeDocument;

var rulerUnits = app.preferences.rulerUnits;
var typeUnits = app.preferences.typeUnits;

app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;

try {
	var position = docRef.selection.bounds;

	docRef.selection.deselect();

	var i = 0;
	var x_k = position[0];
	var y_k = position[1];
	var selSze = [7, 15, 21];

	var basePath = Folder.selectDialog("Select folder to save the images");
	var featureType = prompt("Please provide the type of fingerprint feature you are going to save (default: termination)", "termination")

	for (i = 0; i < selSze.length; i++) {
		var floor = Math.floor(selSze[i]/2);	
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
		
		var filePath = basePath+"/"+selSze[i]+"x"+selSze[i]+"/"+featureType;
		var startIdx = Folder(filePath).getFiles().length+1;
		var fileName = ""+startIdx;
		//alert("filePath: "+filePath+" startIdx: "+startIdx+" fileName: "+fileName)
		var saveFile = File(filePath + "/" + fileName);
		activeDocument.saveAs(saveFile, new PNGSaveOptions(), true, Extension.LOWERCASE);
		
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		
		docRef = origDoc;
	}

	docRef.selection.deselect();

	alert("Success!");

	app.preferences.rulerUnits = rulerUnits;
	app.preferences.typeUnits = typeUnits;
} catch(err) {
	// do nothing
}
