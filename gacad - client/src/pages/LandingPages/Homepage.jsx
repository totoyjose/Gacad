import Button from '../../components/Button';
import heroImage from '../../assets/styles/f1.jpg';
import cardone from '../../assets/styles/cardone.jpg';
import cardtwo from '../../assets/styles/cardtwo.jpg';
import cardthree from '../../assets/styles/cardthree.jpg';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#FFD100] bg-[#002147] inline-block px-2.5 py-1 rounded">
              Hero Section
            </p>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-[#002147] sm:text-4xl">
              Welcome to AGAP Builders!
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              AGAP Company is a full-service construction and design firm specializing in architecture, engineering, and contracting solutions. We are committed to delivering high-quality, innovative, and sustainable projects that meet the needs of our clients across residential, commercial, and industrial sectors.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[#002147] bg-white overflow-hidden flex items-center justify-center p-8 max-h-[400px] shadow-md shadow-blue-900/5">
            <img 
              src={heroImage} 
              alt="AGAP Builders Logo" 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="border-y border-zinc-200 bg-[#002147]/5 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#002147]">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#002147]">Quick overview blocks</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-l-4 border-b-2 border-[#002147] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#002147]">1200</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Projects
            </p>
          </div>
          <div className="rounded-3xl border-l-4 border-b-2 border-[#FFD100] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#002147]">03</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Sections
            </p>
          </div>
          <div className="rounded-3xl border-l-4 border-b-2 border-[#002147] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#002147]">44</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Screens
            </p>
          </div>
          <div className="rounded-3xl border-l-4 border-b-2 border-[#FFD100] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#002147]">4</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Layouts
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#002147]">
            Feature Cards
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#002147]">AGAP Company Highlighted Projects</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Feature Card One */}
          <article className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-md shadow-blue-900/5 hover:border-[#002147] transition-all duration-300">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-100 border border-zinc-200 overflow-hidden">
              <img 
                src={cardone} 
                alt="Architectural Design" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#002147]">Ongoing Project</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 min-h-[48px]">
              Current Project Located at Newport, Palm Tree Villas, Condo.
            </p>
            <Button className="mt-4 w-full" variant="primary">View More</Button>
          </article>

          {/* Feature Card Two */}
          <article className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-md shadow-blue-900/5 hover:border-[#FFD100] transition-all duration-300">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-100 border border-zinc-200 overflow-hidden">
              <img 
                src={cardtwo} 
                alt="Architectural Design" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#002147]">Provincial Project</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 min-h-[48px]">
              Provincial Project Located at Alaminos, Pangasinan, Subdivision House.
            </p>
            <Button className="mt-4 w-full" variant="primary">View More</Button>
          </article>

          {/* Feature Card Three */}
          <article className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-md shadow-blue-900/5 hover:border-[#002147] transition-all duration-300">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-100 border border-zinc-200 overflow-hidden">
              <img 
                src={cardthree} 
                alt="Architectural Design" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#002147]">Shipping Company Office</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 min-h-[48px]">
              Shipping Company Office Located at Port Area, Tondo, Manila.
            </p>
            <Button className="mt-4 w-full" variant="primary">View More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;