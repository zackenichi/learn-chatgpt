/** @description This gets the text content for the page only */

import axios from 'axios';
import cheerio from 'cheerio';

const getSiteContent = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const sections = [];

    $('section').each((index, element) => {
      const section = {};
      section.id = `section-${index + 1}`;
      section.content = [];

      $(element)
        .find('h1,h2, h3, h4, p')
        .each((_index, el) => {
          const elementType = $(el).prop('tagName').toLowerCase();
          const content = $(el).text().trim().replace(/\s+/g, ' ');

          section.content.push({ type: elementType, content });
        });

      sections.push(section);
    });

    // console.dir(sections, { depth: null });

    return sections;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

export default async function handler(req, res) {
  const { baseUrl } = req.query;

  try {
    const result = await getSiteContent(baseUrl);
    // console.dir(result, { depth: null });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch site content' });
  }
}
