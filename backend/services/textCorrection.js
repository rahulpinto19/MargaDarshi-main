/**
 * Rephrases and improves the given text using the Gemini API.
 * @param {string} inputText - The text to rephrase.
 * @returns {Promise<string>} - The rephrased text or an error message.
 */
export default async function rephraseText(inputText) {
    if (!inputText || typeof inputText !== 'string' || !inputText.trim()) {
        throw new Error('Please provide text to rephrase.');
    }

    const userQuery = `Do the spelling correction according to the context without changing the sentence in the text : "${inputText.trim()}"`;
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

