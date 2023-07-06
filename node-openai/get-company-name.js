import axios from 'axios';
import * as cheerio from 'cheerio';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getHtml = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const divs = [];
    const extractedContent = new Set(); // Track extracted content to avoid duplicates

    $('div:not(footer *)').each((index, element) => {
      // Exclude elements inside the <footer> tag
      $(element)
        .find('h1, h2, h3, h4, p')
        .each((index, el) => {
          const elementType = $(el).prop('tagName').toLowerCase();
          const content = $(el).text().trim().replace(/\s+/g, ' ');

          // Check if content is already extracted
          if (!extractedContent.has(content)) {
            divs.push({ type: elementType, content });
            extractedContent.add(content);
          }
        });
    });

    const extractedText = divs.map((div) => div.content).join('\n');
    return extractedText;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

const getCompanyName = async (content) => {
  try {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Get the company name based on the following content:
          
          \`\`\`${content}\`\`\`
          `;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 100,
    });

    // Process the completion response here
    const generatedChoices = completion.data.choices;
    if (generatedChoices && generatedChoices.length > 0) {
      const companyName = generatedChoices[0].text.trim();
      return companyName;
    } else {
      throw new Error('No company name generated');
    }
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    throw error;
  }
};

const contentGeneration = async () => {
  const websiteUrl = 'https://clermontpediatricdentistry.com/';
  const extractedText = await getHtml(websiteUrl);
  const companyName = await getCompanyName(extractedText);

  return companyName;
};

contentGeneration()
  .then((content) => {
    console.log(content);
  })
  .catch((error) => {
    console.error('Error with content generation:', error.message);
  });
