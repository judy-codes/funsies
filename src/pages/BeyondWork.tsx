import React from 'react';

const powerliftingPhoto = require('../assets/powerlifting-korea.jpg'); // Make sure to save the image in src/assets/
const tablePhoto = require('../assets/table-bostonian-beans.jpg');
const potteryPhoto = require('../assets/pottery-beach-glaze.jpg');

const BeyondWork: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Beyond Work</h1>
      <div className="beyondwork-flex beyondwork-3col">
        <div className="beyondwork-description">
          <section className="section">
            <h2>Powerlifting Journey</h2>
            <p>
              My passion for powerlifting began in high school and has steadily grown into a defining part of who I am. I wasn't a naturally strong or standout lifter when I started but through eight years of consistent training, setbacks, and small wins, I've built both strength and confidence in the sport.
            </p>
            <p>
              Over the years, I've competed across different stages: High school nationals, Collegiate Nationals and Local meets
            </p>
            <p>
              One of my most memorable milestones was competing in Seoul at the Korea Iron Souls III powerlifting meet. I signed up on a whim during a trip, with no handler and only a day to recover after a 12-hour flight. Despite everything, I walked away with first place. That moment, standing on the platform in a foreign country, knowing I was neck-and-neck for best lifter, reminded me just how far I've come.
            </p>
            <p>Some of my proudest achievements include:</p>
            <ul>
              <li>Setting the California State Raw Record in the -82.5kg weight class with a 195kg squat</li>
              <li>Winning first at Iron Souls III</li>
            </ul>
            <p>
              I'm excited to continue this journey, with more competitions ahead, and a growing desire to explore the sport through different cultures and communities around the world.
            </p>
          </section>
        </div>
        <div className="beyondwork-photo">
          <img src={powerliftingPhoto} alt="Powerlifting in Korea" title="me turning my swag on" />
        </div>
        <div className="beyondwork-hosting">
          <section className="section beyondwork-hosting-row">
            <div className="beyondwork-hosting-images">
              <img src={tablePhoto} alt="Table spread for Bostonian Beans" className="table-img-large" />
            </div>
            <div className="beyondwork-hosting-text">
              <h2>Hosting & Food</h2>
              <p>
                Although I have less time these days, I love trying new recipes, hosting, and planning events whenever I can. One of my favorite moments was curating a lunch spread called "Bostonian Beans" for friends visiting from Boston. I added a recipe a friend sent me on TikTok, baked my friend's favorite homemade bread, and picked up a croissant loaf from a bakery on their must-try list. There's something special about designing a menu around the people you care about—making it personal and sharing good food and company. While these gatherings are less frequent now, they remain some of my most fulfilling experiences.
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="beyondwork-pottery pottery-row">
        <section className="section pottery-flex">
          <div className="pottery-description">
            <h2>Pottery</h2>
            <p>
              Recently, I started pottery and have been learning to make bowls, cups, and plates. I've been experimenting with different glazes and clay combinations, discovering how each one brings out unique textures and colors. I love the process of learning something new and figuring out how to improve over time. Pottery has also reminded me how important it is to have a creative outlet, something I had been missing in my life. It's been a fulfilling journey of exploration and growth. One of the cooler glazes I used made the raw clay and glaze look like a beach scene.
            </p>
          </div>
          <div className="pottery-photo-block">
            <img src={potteryPhoto} alt="Pottery with beach scene glaze" className="pottery-img" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BeyondWork; 