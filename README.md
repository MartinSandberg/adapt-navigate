#adapt-navigate component for the Adapt Framework that displays an image of different resolutions based upon device width.  
When the image is clicked the user will be navigated to a different content object (Adapt page).

Works best if you also change the "BackButton" to a "MenuButton" by modifying:

src\core\js\router.js

Change:
this.listenTo(Adapt, 'navigation:backButton', this.navigateToPreviousRoute);

To:     
this.listenTo(Adapt, 'navigation:backButton', this.navigateToParent);