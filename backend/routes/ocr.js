import express from 'express';
import multer from 'multer';
import fs from 'fs';
import fsPromises from 'fs/promises';
// const fs = require('fs');
import vision from '@google-cloud/vision';
import rephraseText from '../services/textCorrection.js'
// const fsPromises = require('fs').promises;

// Create the specific router instance
export const ocrRouter = express.Router(); 


const UPLOAD_DIR = 'temp_uploads';

// --- 1. SETUP AND DIRECTORY CHECK ---

// Create the upload directory if it doesn't exist (Synchronous check on startup)
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    console.log(`Created upload directory: ${UPLOAD_DIR}`);
}

// --- 2. MULTER CONFIGURATION ---

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        // Creates a unique filename (e.g., 1760547395552-image.png)
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
const visionClient = new vision.ImageAnnotatorClient();

// --- 3. VISION API CORE FUNCTION ---

async function detectTextFromPath(filePath) {
    console.log(`Analyzing image from path: ${filePath}`);

    try {
        const [result] = await visionClient.textDetection(filePath);
        const fullText = result.textAnnotations && result.textAnnotations.length > 0
            ? result.textAnnotations[0].description
            : 'No text detected.';

        console.log(`Detection complete. Text length: ${fullText.length}`);
        return fullText;

    } catch (error) {
        console.error('ERROR during Vision API call:', error.message);
        throw new Error(`Vision API failed: ${error.message}`);
    }
}


// --- 4. ROUTE DEFINITION ON THE ocrRouter ---

// The path here is JUST '/detect-text' because the prefix '/api/ocr' is added in server.js
ocrRouter.post('/detect-text', upload.single('image'), async (req, res) => {
    
    const filePath = req.file ? req.file.path : null;

    if (!filePath) {
        return res.status(400).json({ message: 'No file uploaded under the key "image".' });
    }

    try {
        // Process the file
        const detectedText = await detectTextFromPath(filePath);

        // Cleanup: Delete the temporary file
        await fsPromises.unlink(filePath);
        console.log(`Cleaned up temporary file: ${filePath}`);

        // Send success response
        
        const rephrasedText = await rephraseText(detectedText)
        

        res.status(200).json({
            message: 'Image successfully processed and cleanup complete.',
            filename: req.file.originalname,
            text: rephrasedText
        });

    } catch (error) {
        // Cleanup on failure
        if (filePath) {
            try {
                await fsPromises.unlink(filePath);
            } catch (cleanupError) {
                console.error('CRITICAL: Failed to clean up file:', cleanupError.message);
            }
        }

        // Send error response
        console.error('Request failed:', error.message);
        res.status(500).send(`File processing failed: ${error.message}`);
    }
});


export default ocrRouter;

