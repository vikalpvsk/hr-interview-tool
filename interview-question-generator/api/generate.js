export default async function handler(req, res) {

const { title, jd, exp } = req.body;

const prompt = `
You are an expert technical recruiter.

Job Title: ${title}
Experience: ${exp} years
Job Description: ${jd}

Generate 10 interview questions for this candidate.
Divide them into:
- Technical
- Problem Solving
- Behavioral
`;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.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}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [{ role: "user", content: prompt }]
})
});

const data = await response.json();

res.status(200).json({
questions: data.choices[0].message.content
});

}
