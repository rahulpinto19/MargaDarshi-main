import express from 'express';
import { upload } from '../server.js';
import { performOCR } from '../services/ocrService.js';

export const ocrRouter = express.Router();

// POST /api/ocr - Process image and extract text
ocrRouter.post('/', upload.single('image'), async (req, res) => {

  console.log(req)
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    console.log('Processing OCR for file:', req.file.originalname);
    
    const result = await performOCR(req.file.buffer);
    
    res.json({
      text: result.text,
      confidence: result.confidence,
      success: true
    });
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({ 
      error: 'OCR processing failed',
      message: error.message 
    });
  }
});

export default ocrRouter;


const vision = require('@google-cloud/vision');
const fs = require('fs').promises; // Use the promises version for async/await

async function quickstart() {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // --- Configuration ---
    // NOTE: This assumes 'textImage1.jpeg' exists in the directory.
    const fileName = 'textImage1.jpeg';
    const outputFilePath = 'vision_output.txt'; // The file to write the results to.
    // ---------------------

    console.log(`Analyzing image: ${fileName}`);

    try {
        // Performs text detection on the local file
        const [result] = await client.textDetection(fileName);
        const detections = result.textAnnotations;

        // 1. Format the data for writing to the file
        let outputContent;

        if (detections && detections.length > 0) {
            console.log('Text detection successful. Formatting results...');
            
            // Format the full JSON structure of the annotations for clarity (2-space indentation)
            outputContent = JSON.stringify(detections, null, 2);
            
        } else {
            outputContent = `No text detected in image: ${fileName}`;
        }
        
        // 2. Write the formatted output content to the specified file
        await fs.writeFile(outputFilePath, outputContent, 'utf8');

        console.log(`Successfully wrote text detection results to: ${outputFilePath}`);

    } catch (error) {
        console.error('ERROR during Vision API call or file writing:', error.message);
        // Displaying only the error message instead of the full error stack
    }
}

quickstart();
