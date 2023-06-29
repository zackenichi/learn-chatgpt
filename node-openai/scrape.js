import axios from 'axios';
import * as cheerio from 'cheerio';

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

    return divs;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// const websiteUrl = 'https://clermontpediatricdentistry.com/';
const websiteUrl = 'https://www.sgsmiles.com/';

// console.clear();

getHtml(websiteUrl)
  .then((response) => {
    const extractedText = response.map((div) => div.content).join('\n');
    console.log(extractedText);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
