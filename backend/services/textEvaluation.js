/**
 * Rephrases and improves the given text using the Gemini API.
 * @param {string} inputText - The text to rephrase.
 * @returns {Promise<string>} - The rephrased text or an error message.
 */
export default async function textEvaluation(inputText) {
    if (!inputText || typeof inputText !== 'string' || !inputText.trim()) {
        throw new Error('Please provide text to rephrase.');
    }


    const userQuery = `
BEGIN_EVALUATION

RUBRIC_WEIGHTS (Total 100):
CONTENT_ACCURACY: 40
COMPLETENESS: 25
CLARITY_STRUCTURE: 15
LANGUAGE_PRESENTATION: 10
CRITICAL_THINKING: 10

STUDENT_ANSWER:
"${inputText.trim()}"

FINAL_OUTPUT_FORMAT:
---
<OVERALL_SCORE>
TOTAL:[Calculated Total Score]/100
</OVERALL_SCORE>

<BREAKDOWN>
CONTENT_ACCURACY:[Score]/40|[Comment on alignment with key concepts]
COMPLETENESS:[Score]/25|[Comment on inclusion of major points]
CLARITY_STRUCTURE:[Score]/15|[Comment on organization and flow]
LANGUAGE_PRESENTATION:[Score]/10|[Comment on grammar and expression]
CRITICAL_THINKING:[Score]/10|[Comment on original thought or depth]
</BREAKDOWN>

<STUDENT_REPORT>
TONE: Supportive and encouraging.
MESSAGE:[Friendly, personalized feedback addressed directly to the student, highlighting 1 strength and 1 major area for improvement.]
</STUDENT_REPORT>

<TEACHER_REPORT>
CONCEPTUAL_GAP:[Identify the most significant knowledge or skill gap.]
DIAGNOSIS:[State whether the issue is recall, application, confusion, or structuring.]
INTERVENTION:[Suggest a single, targeted teaching action for the educator to address the gap.]
</TEPER_REPORT>
---
END_EVALUATION
`
    // const userQuery = `give the marks for the given text out of 10 also give where the sentecnce can improve : "${inputText.trim()}"`;


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

