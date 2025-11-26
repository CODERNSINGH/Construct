const API_KEY = 'AIzaSyDMRL7xpCgIDb8_dKLq5-ce1PIKMiEDuF8'

export async function analyzeQuery(query) {
    if (!query || !query.trim()) return null

    const prompt = `
    You are a search query parser for a job board.
    Analyze the following user query and extract structured search criteria.
    Return ONLY a JSON object with the following keys:
    - role: (string) The job role or title (e.g., "Frontend Developer", "Designer")
    - skills: (array of strings) Specific skills mentioned (e.g., "React", "Figma")
    - location: (string) Location preference (e.g., "Remote", "Delhi")
    - experience: (string) Experience level (e.g., "Intern", "Senior")
    - industry: (string) Industry (e.g., "Fintech", "SaaS")
    - minSalary: (number) Minimum salary/stipend if mentioned (e.g. 20000)

    Query: "${query}"
  `

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        })

        const data = await response.json()
        const text = data.candidates[0].content.parts[0].text

        // Clean markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
        return JSON.parse(jsonStr)
    } catch (error) {
        console.error('Gemini API Error:', error)
        return null
    }
}
