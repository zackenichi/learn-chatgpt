import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateHeadlines = async () => {
  try {
    const prompt = `
      I am looking to create an advertising copy for my Google Ads campaign. It should have a headline and ad copy.

      Headline: [Enter your headline option here]
      Copy: [Enter your ad copy option here]
    `;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 100,
      n: 3,
    });

    console.log('Completion:', completion);

    // Process the completion response here
    const generatedChoices = completion.data.choices;
    console.log('Generated Choices:', generatedChoices);
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
  }
};

generateHeadlines();
