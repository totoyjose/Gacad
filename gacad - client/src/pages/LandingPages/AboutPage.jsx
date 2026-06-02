import Button from '../../components/Button';
import about1 from '../../assets/styles/about1.jpg';
import about2 from '../../assets/styles/about2.jpg';
import about3 from '../../assets/styles/about3.jpg';
import about4 from '../../assets/styles/about4.jpg';
import about5 from '../../assets/styles/about5.jpg';
//test
const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-[#002147] bg-white overflow-hidden flex items-center justify-center max-h-[500px] shadow-md shadow-blue-900/5">
            <img 
              src={about1} 
              alt="AGAP - Alex Gacad and Partners" 
              className="w-full h-full object-cover object-top" 
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#FFD100] bg-[#002147] inline-block px-2.5 py-1 rounded">
              About Us
            </p>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-[#002147] sm:text-4xl">
              AGAP - Alex Gacad and Partners
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Agap is a soon to build family company consisting of Alex Gacad and his partners. We are a team of architects, engineers, and designers who are passionate about creating innovative and sustainable solutions for our clients. 
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-zinc-200 bg-[#002147]/5 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#002147]">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#002147]">Quick summary blocks</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-l-4 border-b-2 border-[#002147] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#002147]">05</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Years
            </p>
          </div>
          <div className="rounded-3xl border-l-4 border-b-2 border-[#FFD100] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#002147]">16</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Projects
            </p>
          </div>
          <div className="rounded-3xl border-l-4 border-b-2 border-[#002147] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#002147]">09</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Clients
            </p>
          </div>
          <div className="rounded-3xl border-l-4 border-b-2 border-[#FFD100] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#002147]">03</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Focus Areas
            </p>
          </div>
        </div>
      </section>

      {/* Section Flow & Visual Grid */}
      <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#002147]">
              Section Flow
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#002147]">Contact Us</h2>
            
            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-md shadow-blue-900/5 hover:border-[#002147] transition-all duration-300">
                <h3 className="text-lg font-bold text-[#002147]">Agap Company</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Group of contractors, architects, engineers, and designers.
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-md shadow-blue-900/5 hover:border-[#FFD100] transition-all duration-300">
                <h3 className="text-lg font-bold text-[#002147]">Experience Block</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Veteran in the field of construction
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-md shadow-blue-900/5 hover:border-[#002147] transition-all duration-300">
                <h3 className="text-lg font-bold text-[#002147]">Contact Info</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 uppercase tracking-wider font-semibold text-zinc-500">
                  contact us
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-md shadow-blue-900/5">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#002147]">
              Visual Grid
            </p>
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4 mt-3">
              <div className="grid gap-4 sm:grid-cols-2">
                {[about2, about3, about4, about5].map((img, index) => (
                  <div 
                    key={index} 
                    className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-white border border-zinc-200 overflow-hidden shadow-sm"
                  >
                    <img 
                      src={img} 
                      alt={`Gallery item ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
            <Button className="mt-5 w-full" variant="primary">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;