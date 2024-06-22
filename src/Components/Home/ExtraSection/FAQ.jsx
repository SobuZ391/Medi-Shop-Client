import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typewriter } from 'react-simple-typewriter';

const FAQ = () => {
  useEffect(() => {
    AOS.init({
      offset: 200, // Animation start offset (in pixels)
      duration: 800, // Duration of the animation (in milliseconds)
      easing: 'ease-in-sine', // Easing function for the animation
      delay: 100, // Delay before starting the animation (in milliseconds)
    });
  }, []);

  return (
    <div>
      <section className="rounded-xl">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <p className="p-2 text-2xl underline font-medium tracking-wider text-center  uppercase">Frequently Asked Questions</p>

          <h1 className="p-12 text-4xl font-bold leading-none text-center sm:text-5xl" style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal' }}>
            Questions about Medicines{' '}
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              {/* Style will be inherited from the parent element */}
              <Typewriter
                words={['Usage', 'Side Effects', 'Storage', 'FAQs']}
                loop={10000}
                cursor
                cursorStyle="_"
                typeSpeed={70}
              />
            </span>
          </h1>

          <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
            <div data-aos="fade-up">
              <h3 className="font-semibold">How should I take this medicine?</h3>
              <p className="mt-1">
                Follow the dosage instructions provided by your healthcare provider or as indicated on the prescription label.
                If you have any questions about the proper use of this medication, consult your doctor or pharmacist.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="font-semibold">What are the common side effects?</h3>
              <p className="mt-1">
                Common side effects may include nausea, dizziness, headache, or upset stomach. If any of these effects persist
                or worsen, inform your doctor promptly.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="font-semibold">How should I store this medicine?</h3>
              <p className="mt-1">
                Store this medication at room temperature away from moisture, heat, and light. Keep all medications out of the
                reach of children and pets.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="font-semibold">What should I do if I miss a dose?</h3>
              <p className="mt-1">
                If you miss a dose, take it as soon as you remember. However, if it is almost time for your next dose, skip
                the missed dose and resume your regular dosing schedule.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <h3 className="font-semibold">Can I take this medicine with other medications?</h3>
              <p className="mt-1">
                Before taking this medication, inform your doctor about all other medicines you use, including prescription,
                over-the-counter, vitamins, and herbal products.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <h3 className="font-semibold">Q: How do I order medicines online?</h3>
              <p className="mt-1">
                A: You can order medicines online through our website. Browse our selection, add items to your cart, and
                proceed to checkout to complete your order securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-y-2 my-6 rounded-lg">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">Contact us for any further questions or assistance.</p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <span> 123 Medicine Street, City Name</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span> 123456789</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span> contact@medstore.com</span>
              </p>
            </div>
          </div>
          <form noValidate className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
            <label className="block">
              <span className="mb-1">Full name</span>
              <input type="text" placeholder="Your Name" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100" />
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input type="email" placeholder="yourname@example.com" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100" />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea rows="3" placeholder="Your message here..." className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:bg-gray-100"></textarea>
            </label>
            <button type="button" className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
