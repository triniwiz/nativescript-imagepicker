var app = require("application");
var Intent = android.content.Intent;
var Activity = android.app.Activity;
var MediaStore = android.provider.MediaStore;
var BitmapFactory = android.graphics.BitmapFactory;
var Parcelable = android.os.Parcelable;

exports.getImage =  function(){
  return new Promise(function(resolve,reject){
    try{


      var data;
      var galleryIntent = new Intent();
      galleryIntent.setType("image/*");
      galleryIntent.setAction(Intent.ACTION_GET_CONTENT);
      var cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

      var intentArray = new java.util.ArrayList();
    var parcelableArray = []
      intentArray.add(cameraIntent);
      parcelableArray.push(intentArray)
      console.log(intentArray)
      console.log(parcelableArray)
      console.log(new Parcelable(parcelableArray))
      var chooser = Intent.createChooser(galleryIntent, "Select Source");
    chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS,new Parcelable(parcelableArray));
      app.android.foregroundActivity.startActivityForResult(chooser, 1);

      var onResult = function(args){
        data = args.intent;
        console.log(args.resultCode === Activity.RESULT_OK)
        console.log("Event: " + args.eventName + ", Activity: " + args.activity +
        ", requestCode: " + args.requestCode + ", resultCode: " + args.resultCode + ", Intent: " + args.intent);

      };

      app.android.on(app.AndroidApplication.activityResultEvent,onResult);




    }catch(ex){
      console.log("image picker error: "+ex);
    }
  })
}
