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
const siteContent = `St George Dentist Helping You Smile for 15 Years.
From the routine exam to the specialized procedure, your St George Dentist at Red Hills Dental will help your smile be happy and healthy.
Service that Keeps You Smiling
Board Certified with the American Board of Oral Implantology
Specialties represented among ABOI Diplomates include general practice, oral and maxillofacial surgery, periodontology, and prosthodontics. The ABOI/ID Diplomate designation symbolizes the highest level of competence in implant dentistry. Certification by the ABOI/ID attests to the fact that a dentist has demonstrated knowledge, ability, and proficiency in implant dentistry through a rigorous examination process.
We Are Your St George Dental Team.
At Red Hills Dental, we are in the business of helping people enjoy life by restoring healthy and beautiful smiles. Our practice is home to our skilled and compassionate dentist, Dr. Matthew Bergman. With our fabulous team, he has been helping people of all ages enjoy improved wellness since 2003. We love serving those living and working in St. George, Washington, and Santa Clara and welcome the opportunity to help you.Schedule your next visit to Red Hills Dental today! Same-day emergency appointments are available whenever possible. We offer services in English and Spanish!
We perform all general and routine dentistry procedures including exams, cleanings, scaling & planing, fillings, root canals, extractions, and much more. Contact us if you have any questions.
Root canals are a very common procedure that is sometimes required to alleviate pain in a tooth. It is done to stop a tooth’s nerve from “firing” and causing the shooting pain that is common in dental issue occurrences.
Everyone has heard of laughing gas, but that is only a part of sedation dentistry. Many patients experience “White Coat” syndrome or are otherwise anxious during dental procedures, so we offer outsourced sedation services at no markup to the patient.
While we do everything we can to avoid tooth extractions, sometimes they are the only option for improving a person’s oral health, and as such it is a service we provide when necessary and when other options are not feasible or are unlikely to help.
Whether you are in need of your first set of implants or have existing implants that require maintenance, we are here to help. Call us today for a FREE dental implant consultation and see how we can help.
Porcelain crowns and Bridges are a great option that allows you to keep the root of a tooth and maintain bone integrity while having a real-looking tooth replacement in its place or “bridge” gaps in teeth.
Complete or partial dentures work to replace chewing function of missing teeth as well as improve confidence in patients who otherwise do not have many or even any teeth at all by giving you a more complete smile.
Grafts and Sinus Lifts allow people who have been missing teeth for a long while to replace bone that was lost in order to allow for dental implants or other prosthetics to be placed.
Invisalign® is the name brand for a type of clear braces that work extraordinarily well at concealing braces when compared to “traditional” braces.
We keep your smile looking great and feeling great, too.
Our team has gone through rigorous training to bring you top-notch care and comfort through the latest in dental technologies. These advancements lead to faster procedures, better results, and quicker healing times.
Modern Methods
Faster Treatment
More Comfort
Quicker Healing
Complex Care
While we provide for most of your dental needs, sometimes a specialist is required. Dr. Bergman works closely with a network of trusted local specialists and can refer you to the right one when necessary. This allows us to make sure we can still help you receive the expert care you need.
General & Cosmetic
Implant Dentistry
Emergency Dentistry
Make Your Appointment Today
Deals & Coupons
FREEDental Implant Consultation
Get expert information about your dental implant options.*Limited evaluation
20% Off Clear Aligners, Just like Invisalign™
*Expires June 30, 2023*Limiting factors may apply.
$98New Patient Special
Become a new patient with Red Hills Dental today! Special includes Oral X-Rays, Oral Exam, & Consultation!
30% OffOne Dental Crown
Not applicable to implant crowns.
*Expires December 31, 2021*Cannot be combined with insurance.
40% OffOne Dental Implant
Includes Cover Screw.
*Expires December 31, 2021*Cannot be combined with insurance.
Frequently Asked Questions (FAQs)
If you have a life-threatening emergency, call 911 immediately. Otherwise, call us at (435) 215-4805 to get help fast. If accommodations for after hours services can be made, please note, emergency fees will apply.
No. While we accept many dental insurance plans, you do not have to have dental insurance to get treatment. We offer a variety of payment options and financing plans when possible.
We accept all major credit and debit cards, many insurance companies, and cash payments. We also offer financing through various finance partners if you require it.
Our list of insurances is quite large, so please call for details and to find out if your dental insurance is accepted.
New Patients: Bring your new patient paperwork as well as a payment method and insurance information.

Returning Patients: Bring your payment method and any updated insurance or billing information we may need.
Advanced, Comprehensive Dental Treatment
Our team believes that advanced technology, comprehensive treatment, and genuine care are the best combination when helping you achieve a healthy, beautiful smile.
We make use of the most trusted and proven technologies that dentistry has to offer. We use facial CT scanning, digital tooth scans, intraoral cameras, and 3D printing to provide the best care possible. Digital technologies allow us to visually show you problems and solutions so that we can develop a plan together, becoming partners in your wellbeing.
We take great pride in helping you and your family feel confident about your dental care and oral health. Dr. Matthew Bergman and his excellent team of experienced individuals love helping the community of St. George and Southern Utah and can’t wait to serve your smile today! Call us to schedule an appointment for yourself or a loved one!
Dr. Bergman and his team have been in dentistry for over 15 years and counting. We work with patients of all ages can guide you through getting the dental treatment needed – routine or otherwise – to achieve oral health. With our top-of-the-line digital equipment, our service goes beyond simple exams and standard procedures. As we have embraced modern techniques and technology, we are able to catch many emerging dental conditions early that could have otherwise gone unnoticed until it was too late just a few decades ago. With technology we are also able to more accurately locate and manage dental issues leading to increased effectiveness and reduced recovery times across many common and emergency procedures. As your St George Dentist and St George Dental Implant Experts, we can help with a wide array of dental conditions ranging from a common exam and cleaning to root canals and fully-custom dental implants. With thousands of patients over the years, Red Hills Dental has been much of Southern Utah’s favorite dental practice because of our compassionate attitude toward the needs and wants of our patients and by being highly effective in our treatments of the minor and extreme dental issues that arise.
Dr. Bergman is Board Certified by the American Board of Oral Implantology.
Emergency: 24/7 (fees may apply)
Call to schedule an appointment.
Walk-Ins Accepted
For over 15 years, Dr Bergman and his team have been helping patients with all of their dental needs, leaving them with a happy, healthy smile and a dental experience unlike any other in town.Call today to schedule your appointment or call any time for emergency help.
Follow us on social media to learn the latest & greatest in the dental field, learn about specials, and hear stories from patients.`;

// const siteContent = `WELCOME TO CLERMONT PEDIATRIC DENTISTRY
// We are a pediatric dental practice with caring, knowledgeable staff members who are specially trained to deal with the dental needs of children. Welcome, we look forward to meeting you!
// We would like to welcome you and your family to our Pediatric Dental office. We are a pediatric dental practice with experienced caring, knowledgeable staff members who are specially trained to deal with the dental needs of children. Clermont Pediatric Dentistry has been serving the local community for over 15 years. Thousands of families have trusted us to provide the very best dental care for their children. Take a look at our introduction video, or browse around our office with our virtual tour.

// First Visit by First Birthday
// The American Academy of Pediatric Dentistry recommends your child see a pediatric dentist when his or her first tooth appears, but no later than his or her first birthday. It is also beneficial to have a “dental home” so that a dentist will be available to them in an emergency.

// Our Doctors
// Dr. Julie Russo and Dr. Alexandra Jensen have undergone two years of additional dental training in order to provide the best care for your children. Dr. Julie and Dr. Alexandra are both dedicated to helping children become successful lifelong dental patients without fear.

// Our Location
// Our state-of-the-art office is conveniently located in Clermont, Florida. We welcome patients from Orlando, Winter Garden, Ocoee, Groveland, Windermere, Apopka, Minneola, and many other Central Florida locations. With a fun safari-themed office, children are engaged and put at ease as they walk through our doors. Please call our office and speak with one of our patient care coordinators to book an appointment.`;

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
