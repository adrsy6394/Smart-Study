const OpenAI = require("openai");

// Configure OpenAI SDK to point to OpenRouter.ai
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "dummy-key-if-missing",
  defaultHeaders: {
    "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173", // Optional: for OpenRouter rankings
    "X-Title": "SmartStudy AI", // Optional: for OpenRouter rankings
  }
});

/**
 * Sends student's subject marks to the OpenRouter AI to determine weak areas.
 * @param {Array} subjects - Array of objects, e.g., [{ name: 'Math', marks: 75, maxMarks: 100 }]
 * @returns {Object} - Parsed JSON containing weakSubjects, summary, and average
 */
const analyzePerformance = async (subjects) => {
  // Task 2: Prompt templates for academic performance evaluation
  const systemPrompt = `You are an expert academic advisor AI. Your role is to analyze a student's subject marks, calculate their average, identify any weak subjects (scoring lower than 75% or comparatively lower than the rest), and provide a short, actionable summary of their current standing.

You must respond ONLY with a valid JSON object matching this schema:
{
  "weakSubjects": ["SubjectName1", "SubjectName2"],
  "summary": "A 2-3 sentence encouraging summary of their overall performance and where they need to focus.",
  "average": 85.5
}
Do not include markdown blocks, just the raw JSON.`;

  const userPrompt = `Here are the student's marks:
${JSON.stringify(subjects, null, 2)}`;

  try {
    const response = await openai.chat.completions.create({
      // Using a free/accessible model available on OpenRouter for prototyping logic
      model: "google/gemini-2.5-flash-pro", 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const aiContent = response.choices[0].message.content;
    const parsedData = JSON.parse(aiContent);
    return parsedData;

  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to generate AI analysis.");
  }
};

/**
 * Sends student's academic record and preferences to OpenRouter AI to generate a study plan.
 * @param {Object} record - The student's academic record (marks, weak subjects).
 * @param {Object} preferences - e.g., { dailyHours: 2 }
 * @returns {Object} - Parsed JSON containing the weekly study plan.
 */
const generateStudyPlan = async (record, preferences) => {
  const systemPrompt = `You are an expert academic advisor AI. Create a weekly study plan for a student based on their academic record and study preferences.

The student has the following weak subjects: ${record.weakSubjects ? record.weakSubjects.join(', ') : 'None specifically identified'}. They can study around ${preferences.dailyHours || 2} hours per day.

You must respond ONLY with a valid JSON object matching this schema:
{
  "title": "A motivating title for the plan",
  "days": [
    {
      "day": "Monday",
      "focusSubject": "Subject Name",
      "durationMinutes": 120,
      "tasks": ["Task 1", "Task 2"]
    }
  ],
  "generalTips": ["Tip 1", "Tip 2"]
}
Ensure there are exactly 7 days in the "days" array (Monday to Sunday). Do not include markdown blocks, just the raw JSON.`;

  const userPrompt = `Student Record:
${JSON.stringify({ subjects: record.subjects, marks: record.marks }, null, 2)}
Please generate the study plan.`;

  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-pro", 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const aiContent = response.choices[0].message.content;
    const parsedData = JSON.parse(aiContent);
    return parsedData;

  } catch (error) {
    console.error("AI Study Plan Error:", error);
    throw new Error("Failed to generate AI study plan.");
  }
};

/**
 * Sends student's weak subjects to OpenRouter AI to generate resource recommendations.
 * @param {Array} weakSubjects - Array of strings representing weak subjects.
 * @returns {Array} - Parsed JSON containing recommended resources.
 */
const generateResources = async (weakSubjects) => {
  if (!weakSubjects || weakSubjects.length === 0) {
     return [];
  }

  const systemPrompt = `You are a helpful academic librarian AI. Provide a list of learning resources (topics to search, general advice, or types of materials) for a student struggling with specific subjects.

You must respond ONLY with a valid JSON array of objects matching this schema:
[
  {
    "subject": "Subject Name",
    "topic": "Specific Topic to focus on",
    "type": "Video / Article / Practice Quiz",
    "searchQuery": "Exact search term they can use on YouTube or Google",
    "difficulty": "Beginner / Intermediate"
  }
]
Do not include markdown blocks, just the raw JSON. Provide 1 to 2 resources per weak subject.`;

  const userPrompt = `Weak Subjects: ${weakSubjects.join(', ')}
Please recommend resources.`;

  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-pro", 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" } // Using json_object might require wrapping array in an object for strictly valid openrouter schema, but Gemini 2.5 flash handles array root fine or we can parse. Let's ask for an array.
    });

    const aiContent = response.choices[0].message.content;
    const parsedData = JSON.parse(aiContent);
    
    // Handle case where AI wraps array in an object
    if (!Array.isArray(parsedData) && typeof parsedData === 'object') {
       const key = Object.keys(parsedData)[0];
       if (Array.isArray(parsedData[key])) return parsedData[key];
    }
    
    return parsedData;

  } catch (error) {
    console.error("AI Resource Error:", error);
    throw new Error("Failed to generate AI resources.");
  }
};

module.exports = {
  analyzePerformance,
  generateStudyPlan,
  generateResources
};
