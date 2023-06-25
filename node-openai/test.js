import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// set number of choices to get here
const numberOfChoices = 3;

const test = async () => {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'hello ChatGPT',
      temperature: 0.6,
      max_tokens: 100,
      // n: 3,
      n: numberOfChoices,
    });

    const response = completion.data.choices;

    // response.text would be an array

    response.forEach((choice, index) => {
      const chat = choice.text;
      console.log(`Choice ${index + 1}: ${chat}`);
    });
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
  }
};

test();
