import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const MainBanner = () => {

  // 🔹 Slider settings (for mobile only)
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  }

  return (
    // 👇 Banner को नीचे रखने के लिए z-0 दिया गया
    <div className="relative w-full z-0">
      
      {/* 🔹 Desktop Banner (Static) */}
      <div className="hidden md:block relative z-0">
        <div className="relative h-[45vh] lg:h-[50vh] overflow-hidden rounded-b-2xl z-0">
          <img
            src={assets.main_banner_bg}
            alt="banner"
            className="w-full h-full object-cover"
          />

          {/* 👇 Text section को भी low z-index पर रखा ताकि menu ऊपर रहे */}
          <div className="absolute inset-0 flex flex-col items-start justify-center px-8 lg:pl-24 z-0">
            <h1 className="text-4xl lg:text-5xl font-bold max-w-[600px] text-white leading-tight drop-shadow-lg">
              Freshness You Can Trust, Savings You Will Love!
            </h1>

            <div className="flex items-center mt-6 font-medium">
              <Link
                to="/products"
                className="group flex items-center gap-2 px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
              >
                Shop now
                <img
                  className="transition group-hover:translate-x-1"
                  src={assets.white_arrow_icon}
                  alt="arrow"
                />
              </Link>

              <Link
                to="/products"
                className="group flex items-center gap-2 px-9 py-3 text-white cursor-pointer ml-4 bg-black/40 rounded hover:bg-black/60 transition"
              >
                Explore deals
                <img
                  className="transition group-hover:translate-x-1"
                  src={assets.black_arrow_icon}
                  alt="arrow"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Slider */}
      <div className="md:hidden relative z-0">
        <Slider {...settings}>
          {[assets.main_banner_bg_sm, assets.main_banner_bg_sm, assets.main_banner_bg_sm].map((img, index) => (
            <div key={index} className="relative h-[35vh] sm:h-[40vh] overflow-hidden z-0">
              <img
                src={img}
                alt={`banner-${index}`}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0">
                <h1 className="text-xl sm:text-2xl font-bold text-center text-white leading-snug">
                  Freshness You Can Trust, Savings You Will Love!
                </h1>
                <Link
                  to="/products"
                  className="mt-3 flex items-center gap-2 px-7 py-2 bg-primary hover:bg-primary-dull transition rounded text-white"
                >
                  Shop Now
                  <img
                    className="transition group-hover:translate-x-1"
                    src={assets.white_arrow_icon}
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* 👇 Menu (overlay) के लिए placeholder (ऊपर दिखेगा) */}
      <div className="absolute top-0 left-0 w-full z-[-9999] pointer-events-none"></div>
    </div>
  )
}

export default MainBanner
