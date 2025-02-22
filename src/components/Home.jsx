import React from "react";

const Home = () => {
  const menuItems = [
    "Overview",
    "Recipe",
    "Our Story",
    "Packaging & Branding",
    "Testimonials",
    "FAQs",
    "Contact Us",
  ];

  return (
    <div className="flex flex-col items-center px-4">
      <div className="mt-28 text-center">
        <h1 className="text-8xl font-extrabold">Nutcha Bites</h1>
        <p className=" text-xl font-light block">
          Old-School Crunch, New-School Vibes. A Nutchalicious Bite!
        </p>
        <div className="mt-18">
          <button className="px-8 py-4 font-semibold text-2xl hover:opacity-70 transition duration-300 ease-in-out">
            Order Now
          </button>
        </div>
        <nav className="mt-18">
          <ul className="flex flex-wrap justify-center  gap-4 bg-[var(--color-secondary)] text-[var(--color-primary)] px-2 py-4 rounded-4xl opacity-70">
            {menuItems.map((item, index) => {
              // Convert item text to a URL-friendly ID.
              const id = item.toLowerCase().replace(/\s+/g, "-");
              return (
                <li key={index} className="cursor-pointer ">
                  <a
                    href={`#${id}`}
                    className="px-4 py-3  rounded-4xl hover:bg-[var(--color-primary)] hover:opacity-90 hover:text-[var(--color-secondary)] transition duration-300 ease-in-out"
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
