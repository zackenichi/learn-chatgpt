import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateContent(contentType, contentCount) {
  const contentResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(contentType, contentCount),
    temperature: 0.6,
  });

  console.log('choices object', contentResponse.data.choices);

  let text = contentResponse.data.choices[0].text.trim();
  text = text.replace(/^["'\s]+|["'\s]+$/g, '');

  return text;
}

// generate for ad headline or body
// separate function as this will have more logic soon
function generatePrompt(contentType, count) {
  let prompt = '';
  if (contentType === 'headline') {
    prompt = `Create an attention ${count} grabbing headlines at 30 characters max`;
  } else {
    prompt = `Create an attention grabbing ${count} body text with betweem 30 to 90 characters`;
  }

  return prompt;
}

export default async function handler(req, res) {
  try {
    const contentCount = 3;

    const headline = await generateContent('headline', contentCount);
    const bodyText = await generateContent('body', contentCount);

    return res.status(200).json({
      headline,
      bodyText,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      error: {
        message: 'An error occurred during headline generation',
      },
    });
  }
}
