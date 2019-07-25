# Photoshop-Scripts
Photoshop useful scripts.

**Selection script** - *selection_script.js*

Used to select and save the selection as PNG image.
I've created this script to help me create a training set for my biometric system based on fingerprints.

How it works?
- the script activates on changing the tools to/from one of the selection tools.
- if a pixel is selected when the activation event occurs, it will create a 7x7, 15x15 and 21x21 px selection which will save as a .PNG file.

TBD
- add user input option of the selection size.
- add user input option of the save path (currently the new images are saved in the original document directory).
- split code into functions.