import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// set number of choices to get here
const numberOfChoices = 3;

// we will use static content for now and add a new data scraper function on the next iteration
const siteContent = `WELCOME TO CLERMONT PEDIATRIC DENTISTRY
We are a pediatric dental practice with caring, knowledgeable staff members who are specially trained to deal with the dental needs of children. Welcome, we look forward to meeting you!
We would like to welcome you and your family to our Pediatric Dental office. We are a pediatric dental practice with experienced caring, knowledgeable staff members who are specially trained to deal with the dental needs of children. Clermont Pediatric Dentistry has been serving the local community for over 15 years. Thousands of families have trusted us to provide the very best dental care for their children. Take a look at our introduction video, or browse around our office with our virtual tour.

First Visit by First Birthday
The American Academy of Pediatric Dentistry recommends your child see a pediatric dentist when his or her first tooth appears, but no later than his or her first birthday. It is also beneficial to have a “dental home” so that a dentist will be available to them in an emergency.

Our Doctors
Dr. Julie Russo and Dr. Alexandra Jensen have undergone two years of additional dental training in order to provide the best care for your children. Dr. Julie and Dr. Alexandra are both dedicated to helping children become successful lifelong dental patients without fear.

Our Location
Our state-of-the-art office is conveniently located in Clermont, Florida. We welcome patients from Orlando, Winter Garden, Ocoee, Groveland, Windermere, Apopka, Minneola, and many other Central Florida locations. With a fun safari-themed office, children are engaged and put at ease as they walk through our doors. Please call our office and speak with one of our patient care coordinators to book an appointment.`;

const generatePrompt = (content) => {
  const prompt = `
    Generate an ad headline and copy for a Google Ads campaign. Based on the provided content.

    Text: "${content}"
  `;

  return prompt;
};

const generateHeadlines = async () => {
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
    return []; // Return an empty array in case of an error
  }
};

const contentGeneration = async () => {
  try {
    const generatedChoices = await generateHeadlines();

    const adContent = generatedChoices.map((choice) => {
      const text = choice.text.trim();

      // Extracting headline and copy from the generated text
      const [headline, copy] = text.split('Copy:');

      // Creating an object with the extracted headline and copy
      return {
        headline: headline.trim(),
        copy: copy.trim(),
      };
    });

    return adContent;
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
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
