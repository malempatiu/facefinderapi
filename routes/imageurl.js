const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'd66b662ca7ef4f9b9c9b75fb540a5933'
 });
 
module.exports.handleImageUrl = (req, res) => {
     app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(response => res.json(response.outputs[0].data.regions[0].region_info.bounding_box))
     .catch(err => res.status(400).json('something went wrong in image predict'));
};  
