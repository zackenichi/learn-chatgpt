import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

// Function to fetch the HTML content of a web page
async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching HTML: ${error}`);
    return null;
  }
}

// Function to extract text content from HTML
function extractText(html) {
  const $ = cheerio.load(html);

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
}

// Function to scrape text from a single URL
async function scrapeTextFromUrl(url) {
  try {
    const html = await fetchHTML(url);
    if (!html) {
      console.log(`Failed to fetch HTML for ${url}.`);
      return { page: url, text: [] };
    }

    const textContent = extractText(html);
    return { page: url, text: textContent };
  } catch (error) {
    console.error('Error:', error);
    return { page: url, text: [] };
  }
}

// Function to scrape text content from menu links
async function scrapeTextFromWebsite(urlToScrape) {
  try {
    const response = await axios.get(urlToScrape);
    const $ = cheerio.load(response.data);

    const menuLinks = [];
    const baseUrl = new URL(urlToScrape);

    // Add homepage as the first element of menuLinks array
    menuLinks.push(baseUrl.href);

    $('nav a').each((_index, element) => {
      const link = $(element).attr('href');

      // Clean the link by removing "#" and trailing slashes
      const cleanedLink = link.replace(/\/$/, '');
      if (!cleanedLink.includes('#')) {
        let absoluteUrl;

        // Check if the link is a relative URL
        if (cleanedLink.startsWith('/')) {
          absoluteUrl = new URL(cleanedLink, baseUrl.origin);
        } else if (!cleanedLink.includes('://')) {
          absoluteUrl = new URL(cleanedLink, urlToScrape);
        } else {
          absoluteUrl = new URL(cleanedLink);
        }

        // Check if the link is from the same domain and not the home page
        if (
          absoluteUrl.hostname === baseUrl.hostname &&
          absoluteUrl.pathname !== baseUrl.pathname
        ) {
          menuLinks.push(absoluteUrl.href);
        }
      }
    });

    const uniqueMenuLinks = [...new Set(menuLinks)];

    // Scrape text content for each page
    const promises = uniqueMenuLinks.map((link) => scrapeTextFromUrl(link));
    const results = await Promise.all(promises);

    return results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

const urlToScrape = 'https://clermontpediatricdentistry.com/';

scrapeTextFromWebsite(urlToScrape)
  .then((results) => {
    // console.log(results);
    console.dir(results, { depth: null });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
