import axios from 'axios';
import * as cheerio from 'cheerio';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// set number of choices to get here
const numberOfChoices = 3;

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

// qualify prompts

const generatePrompt = (content) => {
  const prompt = `Generate an exciting and unique ad headline and copy for a Google Ads campaign. Based on the provided content: 
    
    \`\`\`${content}\`\`\`
  
    Headline:
    Copy:
    `;

  return prompt;
};

const generateHeadlines = async (siteContent) => {
  try {
    if (!configuration.apiKey) {
      throw new Error(
        'OpenAI API key not configured, please follow instructions in README.md'
      );
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(siteContent),
      temperature: 0.6,
      max_tokens: 100,
      n: numberOfChoices,
    });

    // Process the completion response here
    const generatedChoices = completion.data.choices;
    return generatedChoices;
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    throw error;
  }
};

const contentGeneration = async () => {
  try {
    // const websiteUrl = 'https://www.sgsmiles.com/';
    const websiteUrl = 'https://clermontpediatricdentistry.com/';
    const extractedText = await getHtml(websiteUrl);
    const generatedChoices = await generateHeadlines(extractedText);

    const adContent = generatedChoices.map((choice) => {
      const text = choice.text.trim();

      // Extracting headline and copy from the generated text
      const [headline, copy] = text.split('Copy:');

      // Removing "Headline:" prefix and quotes from the headline
      const cleanHeadline = headline
        .replace(/^Headline:\s*/, '')
        .replace(/['"]+/g, '')
        .replace(/\n/g, '');

      // Removing quotes and \n from the copy
      const cleanCopy = copy.trim().replace(/['"]+/g, '').replace(/\n/g, '');

      // Creating an object with the extracted headline and copy
      return {
        headline: cleanHeadline,
        copy: cleanCopy,
      };
    });

    return adContent;
  } catch (error) {
    console.error('Error with content generation:', error.message);
    return []; // Return an empty array in case of an error
  }
};

contentGeneration()
  .then((adContent) => {
    console.log(adContent);
  })
  .catch((error) => {
    console.error('Error with content generation:', error.message);
  });
