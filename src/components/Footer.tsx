import { NavLink } from "react-router"

const Footer = () => {

  const footerLinks = [
    {
      title: "Get To Know Us",
      links: [
        "Careers",
        "Blog",
        "About Amazon",
        "Investor Relations",
        "Amazon Devices",
        "Amazon Science"
      ]
    },
    {
      title: "Make Money with Us",
      links: [
        "Sell products on Amazon",
        "Sell on Amazon Business",
        "Sell apps on Amazon",
        "Become an Affiliate",
        "Advertise Your Products",
        "Host an Amazon Hub"
      ]
    },
    {
      title: "Amazon Payment Products",
      links: [
        "Amazon Business Card",
        "Shop with Points",
        "Reload Your Balance",
        "Amazon Currency Converter"
      ]
    },
    {
      title: "Let Us Help You",
      links: [
        "Your Account",
        "Your Orders",
        "Shipping Rates & Policies",
        "Returns & Replacements",
        "Manage Your Content",
        "Help"
      ]
    }
  ]

  const services = [
{title:"Amazon Music",desc:"Stream Millions of Songs"},
{title:"Amazon Advertising",desc:"Find, attract, and engage customers"},
{title:"Amazon Drive",desc:"Cloud storage from Amazon"},
{title:"6pm",desc:"Score deals on fashion brands"},
{title:"AbeBooks",desc:"Books, art & collectibles"},
{title:"ACX",desc:"Audiobook Publishing Made Easy"},
{title:"Sell on Amazon",desc:"Start a Selling Account"},

{title:"Amazon Business",desc:"Everything For Your Business"},
{title:"Amazon Music",desc:"Stream Millions of Songs"},
{title:"AmazonGlobal",desc:"Ship Orders Internationally"},
{title:"Home Services",desc:"Experienced Pros Happiness Guarantee"},
{title:"Amazon Ignite",desc:"Sell your original Digital Educational Resources"},
{title:"Amazon Web Services",desc:"Scalable Cloud Computing Services"},
{title:"Audible",desc:"Listen to Books & Original Audio Performances"},

{title:"Book Depository",desc:"Books With Free Delivery Worldwide"},
{title:"Box Office Mojo",desc:"Find Movie Box Office Data"},
{title:"Fabric",desc:"Sewing, Quilting & Knitting"},
{title:"ComiXology",desc:"Thousands of Digital Comics"},
{title:"DPReview",desc:"Digital Photography"},
{title:"Goodreads",desc:"Book reviews & recommendations"},
{title:"IMDb",desc:"Movies, TV & Celebrities"},

{title:"IMDbPro",desc:"Get Info Entertainment Professionals Need"},
{title:"Kindle Direct Publishing",desc:"Indie Digital & Print Publishing Made Easy"},
{title:"eero WiFi",desc:"Stream 4K Video in Every Room"},
{title:"Neighbors App",desc:"Real-Time Crime & Safety Alerts"},
{title:"Blink",desc:"Smart Security for Every Home"},
{title:"Zappos",desc:"Shoes & Clothing"},
{title:"Ring",desc:"Smart Home Security Systems"},

{title:"Shopbop",desc:"Stream Millions of Songs"},
{title:"Woot!",desc:"Deals and Shenanigans"},
{title:"Amazon Subscription Boxes",desc:"Top subscription boxes - right to your door"},
{title:"PillPack",desc:"Pharmacy Simplified"}
]

  return (
    <>
      {/* Sign In Section */}
      <div className=" flex flex-col items-center justify-center p-5 text-white">
        <hr className="text-gray-400 w-full" />

        <div className="flex flex-col items-center justify-center p-5 gap-2">
          <h2>See personalized recommendations</h2>

          <NavLink
            to={"/signin"}
            className="cursor-pointer bg-amber-500 text-white font-semibold font-mono w-52 text-center rounded-2xl h-10 flex items-center justify-center"
          >
            Sign in
          </NavLink>

          <p className="text-sm">
            New Customer?{" "}
            <span className="text-blue-600 cursor-pointer">
              Start Here
            </span>
          </p>
        </div>

        <hr className="text-gray-400 w-full" />
      </div>

      {/* Footer Links */}
      <div className="bg-[#232F3E] text-gray-300">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-6">

          {footerLinks.map((section, index) => (
            <div key={index}>

              <h3 className="text-white font-bold mb-3">
                {section.title}
              </h3>

              <ul className="space-y-2">

                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="hover:underline cursor-pointer"
                  >
                    {link}
                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>

        {/* Divider */}
        <div className="border-t border-gray-600"></div>

        {/* Logo + Language */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6">

          <h1 className="text-white text-xl font-bold">
            amazon
          </h1>

          <button className="border border-gray-400 px-4 py-1 rounded">
            English
          </button>

          <button className="border border-gray-400 px-4 py-1 rounded">
            🌍 Bangladesh
          </button>

        </div>

      </div>

      {/* Bottom Services */}
      <div className="bg-[#131A22] py-10">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6 text-xs">

          {services.map((service, index) => (
            <div key={index}>

              <p className="text-white">
                {service.title}
              </p>

              <p className="text-gray-400">
                {service.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </>
  )
}

export default Footer