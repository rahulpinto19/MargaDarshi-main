import { json } from "express";

/**
 * Rephrases and improves the given text using the Gemini API.
 * @param {string} inputText - The text to rephrase.
 * @returns {Promise<string>} - The rephrased text or an error message.
 * @param {string} rubric - The text to rephrase.
 * 
 */
export default async function textEvaluation(rubric,inputText) {
    if (!inputText || typeof inputText !== 'string' || !inputText.trim()) {
        throw new Error('Please provide text to rephrase.');
    }

    const userQuery = `
BEGIN_EVALUATION

RUBRIC_WEIGHTS (Total 100):
<RUBRICS>
"${JSON.stringify(rubric)}"
</RUBRICS>

<STUDENT_ANSWER>
"${inputText.trim()}"
</STUDENT_ANSWER>

--- INSTRUCTIONS FOR RESPONSE GENERATION ---
1. **STRICT FORMATTING:** Generate ONLY a single, valid JSON object. Do NOT include any introductory text, concluding remarks, explanations, or formatting wrappers (such as backticks \`\`\` or the word 'json').
2. **CONTENT SOURCE:** Use the provided RUBRIC_WEIGHTS and STUDENT_ANSWER for the evaluation.
3. **REQUIRED KEYS:** The root of the JSON object MUST contain only the following four keys: "overallScore", "categories", "studentReport", and "teacherReport".


---
<OVERALL_SCORE>
TOTAL:[Calculated Total Score]/100
</OVERALL_SCORE>

<CATEGORIES>
this should be the array with all the categories in the rubric with the solution 
</CATEGORIES>


<STUDENT_REPORT>
TONE: Supportive and encouraging.
MESSAGE:[Friendly, personalized feedback addressed directly to the student, highlighting 1 strength and 1 major area for improvement realted to the subject less focused on grammar . The feedback should be in the form of the human evaluation ]
</STUDENT_REPORT>

<TEACHER_REPORT>
CONCEPTUAL_GAP:[Identify the most significant knowledge or skill gap.]
DIAGNOSIS:[State whether the issue is recall, application, confusion, or structuring.]
INTERVENTION:[Suggest a single, targeted teaching action for the educator to address the gap.]
</TEACHER_REPORT>
---


END_EVALUATION
`
   
    console.log("the user query is ",userQuery)
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: "You are an expert editor specializing in refining and rephrasing text to be clearer, more engaging, and more professional while preserving the original intent." }]
            // parts: [{ text: "You are an expert editor specializing in giving the marks for the text out of 10" }]

        }
    };

    const maxRetries = 3;
    let attempt = 0;
    let responseJson = null;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                generationConfig: {
                    "response_mime_type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API response status was ${response.status}: ${response.statusText}`);
            }

            responseJson = await response.json();
            break; // Success! Exit loop

        } catch (error) {
            attempt++;
            if (attempt >= maxRetries) {
                throw new Error(`Error: Could not connect to the rephrasing service. (${error.message})`);
            }
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    if (responseJson) {
        const generatedText = responseJson.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
            return generatedText;
        } else {
            throw new Error('Error: Received an empty or unexpected text response from the API.');
        }
    } else {
        throw new Error('Error: Failed to get a response from the API.');
    }
}

