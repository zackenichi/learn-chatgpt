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

const getTone = async (content) => {
  try {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `What would be the best phrase to describe the goal in creating a Digital advertisement given the following content:
              
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
      const tone = generatedChoices[0].text.trim();
      return tone;
    } else {
      throw new Error('No company name generated');
    }
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    throw error;
  }
};

const generateHeadlines = async (content, prompt) => {
  try {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const fullPrompt = `${prompt}
                  
                  \`\`\`${content}\`\`\`
                  `;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: fullPrompt,
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
  const websiteUrl = 'https://clermontpediatricdentistry.com/';
  const extractedText = await getHtml(websiteUrl);
  const companyName = await getCompanyName(extractedText);
  const tone = await getTone(extractedText);

  const prompt = `You are a marketing copywriter for ${companyName}. I'd like for you to help me make some digital ads. Give me a headline and copy with ${tone} given the following content`;

  const generatedChoices = await generateHeadlines(extractedText, prompt);

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
};

contentGeneration()
  .then((content) => {
    console.log(content);
  })
  .catch((error) => {
    console.error('Error with content generation:', error.message);
  });
