const vision = require('@google-cloud/vision');
const fs = require('fs').promises; // Keep fs for the example usage (reading a file into a buffer)

/**
 * Performs text detection on an image buffer (binary data) and returns the full detected text.
 
 * @returns {Promise<{text: string}>} An object containing the detected text or an error message.
 */
export async function textDetection(imageBuffer) {

    console.log(image)
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    console.log('Analyzing image from buffer...');

    try {
        // The request object where the image content is passed as a Buffer via the 'content' field.
        const request = {
            image: {
                content: imageBuffer,
            },
        };

        const [result] = await client.textDetection(request);
        const detections = result.textAnnotations;

        let fullText = 'No text detected.';

        if (detections && detections.length > 0) {
            console.log('Text detection successful.');
            // The first element of textAnnotations contains the full detected text string.
            fullText = detections[0].description;
        } else {
            console.log('No text detected in image buffer.');
        }

        // Return the final result in the requested JSON format {text: text}
        return {
            text: fullText
        };

    } catch (error) {
        console.error('ERROR during Vision API call:', error.message);
        
        // On error, return an error message in the requested format
        return {
            text: `ERROR: Failed to process image. Details: ${error.message}`
        };
    }
}


// --- Example Usage (How to get a Buffer for testing) ---
