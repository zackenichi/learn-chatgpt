import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import cheerio from 'cheerio';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!configuration.apiKey) {
    return res.status(500).json({
      error: {
        message: 'Missing API key',
      },
    });
  }

  try {
    const siteData = await getSiteContent(req.query.baseUrl); // Assuming the site data is fetched from the query parameter 'baseUrl'

    // console.dir(siteData, { depth: null });

    if (siteData.length === 0) {
      return res.status(400).json({
        error: {
          message: 'Site data not found',
        },
      });
    }

    const adHeadline = await generateAdHeadline(siteData);

    // console.log(adHeadline);
    // const adBody = await generateAdBody(siteData);

    return res.status(200).json({
      adHeadline,
      //   adBody,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      error: {
        message: 'An error occurred during ad generation',
      },
    });
  }
}

async function generateAdHeadline(siteData) {
  const prompt =
    'Create an attention-grabbing headline using the content provided:';
  const contentText = siteData.map((section) => section.content).join(' ');

  const response = await openai.createCompletion({
    model: 'text-davinci-004',
    prompt: `${prompt}\n\n${contentText}`,
    temperature: 0.6,
  });

  console.log(response);
}

// async function generateAdBody(siteData) {
//   const prompt = 'Write the body text using the content provided:';
//   const contentText = siteData.map((section) => section.content).join('\n\n');

//   const response = await openai.createCompletion({
//     model: 'text-davinci-004',
//     prompt: `${prompt}\n\n${contentText}`,
//     temperature: 0.6,
//   });

//   if (response.choices && response.choices.length > 0) {
//     return response.choices[0].text.trim();
//   } else {
//     throw new Error('No body text generated');
//   }
// }

async function getSiteContent(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const sections = [];

    $('section').each((index, element) => {
      const section = {};
      section.id = `section-${index + 1}`;
      section.content = [];

      $(element)
        .find('h1, h2, h3, h4, p')
        .each((_index, el) => {
          const elementType = $(el).prop('tagName').toLowerCase();
          const content = $(el).text().trim().replace(/\s+/g, ' ');

          section.content.push({ type: elementType, content });
        });

      sections.push(section);
    });

    return sections;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}
