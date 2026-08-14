import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronRight, FileCheck2, Factory, Globe2, Mail, Menu, MessageCircle, ShieldCheck, X } from 'lucide-react';

const contact = {
  phone: '+92 342 7189884',
  email: 'skylineglobalindustries@gmail.com',
  location: 'Sialkot, Punjab, Pakistan',
};

const categories = [
  { slug: 'motorbike-gloves', name: 'MotorBike Gloves', prefix: 'SLGI-MG', count: 15, copy: 'Built around riding comfort, grip and control.' },
  { slug: 'rugby-gloves', name: 'Rugby Gloves', prefix: 'SLGI-RAG', count: 8, copy: 'Grip-focused gloves for demanding game conditions.' },
  { slug: 'golf-gloves', name: 'Golf Gloves', prefix: 'SLGI-GG', count: 8, copy: 'Precision-focused glove references for the golf category.' },
  { slug: 'fitness-gloves', name: 'Fitness Gloves', prefix: 'SLGI-FG', count: 8, copy: 'Designed around grip, comfort and controlled movement.' },
  { slug: 'cycling-gloves', name: 'Cycling Gloves', prefix: 'SLGI-CG', count: 8, copy: 'Lightweight comfort with grip and control.' },
  { slug: 'tactical-gloves', name: 'Tactical Gloves', prefix: 'SLGI-TG', count: 8, copy: 'Confident grip, comfort and controlled handling.' },
] as const;

type Product = {
  slug: string;
  code: string;
  category: string;
  categoryName: string;
  copy: string;
  index: number;
};

const products: Product[] = categories.flatMap((category) =>
  Array.from({ length: category.count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return {
      slug: `${category.slug}-${number}`,
      code: `${category.prefix}-${number}`,
      category: category.slug,
      categoryName: category.name,
      copy: category.copy,
      index: index + 1,
    };
  }),
);

const nav = [
  ['/about', 'About'],
  ['/products', 'Products'],
  ['/oem-private-label', 'OEM / Private Label'],
  ['/manufacturing', 'Manufacturing'],
  ['/quality', 'Quality'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact'],
];

function App() {
  return <SiteShell><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:category" element={<Products />} />
    <Route path="/products/:category/:slug" element={<ProductDetail />} />
    <Route path="/oem-private-label" element={<OEM />} />
    <Route path="/manufacturing" element={<Manufacturing />} />
    <Route path="/quality" element={<Quality />} />
    <Route path="/credentials" element={<Credentials />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Routes></SiteShell>;
}

function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return <div className="site">
    <header className="header">
      <div className="container nav">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brandMark"><span>SG</span></span>
          <span className="brandText"><strong>SKYLINE</strong><small>GLOBAL INDUSTRIES</small></span>
        </Link>
        <nav className="desktopNav" aria-label="Primary navigation">
          {nav.map(([href, label]) => <NavLink key={href} to={href}>{label}</NavLink>)}
        </nav>
        <Link className="quoteBtn navQuote" to="/contact">Request a Quote <ArrowRight size={15} /></Link>
        <button className="menuBtn" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mobileNav">
        {nav.map(([href, label]) => <Link key={href} className={location.pathname === href ? 'active' : ''} to={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link className="quoteBtn" to="/contact" onClick={() => setOpen(false)}>Request a Quote <ArrowRight size={15} /></Link>
      </motion.nav>}
    </header>
    <main>{children}</main>
    <Footer />
  </div>;
}

function Footer() {
  return <footer className="footer">
    <div className="footerTop container">
      <div className="footerLead">
        <span className="footerKicker">SKYLINE GLOBAL INDUSTRIES</span>
        <h2>Manufacturing from Sialkot.<br />Built for global buyers.</h2>
        <p>Glove manufacturing, OEM and private-label supply for international B2B customers.</p>
      </div>
      <div className="footerLinks"><span>EXPLORE</span><Link to="/products">Product catalogue</Link><Link to="/oem-private-label">OEM / Private Label</Link><Link to="/manufacturing">Manufacturing</Link><Link to="/quality">Quality</Link></div>
      <div className="footerLinks"><span>COMPANY</span><Link to="/about">About Skyline</Link><Link to="/credentials">Credentials</Link><Link to="/gallery">Gallery</Link><Link to="/contact">Contact</Link></div>
      <div className="footerLinks"><span>CONTACT</span><a href={`tel:${contact.phone}`}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><small>{contact.location}</small></div>
    </div>
    <div className="container footerBottom"><span>© 2026 Skyline Global Industries. All rights reserved.</span><span>Sialkot · Pakistan</span></div>
  </footer>;
}

function Home() {
  const reduce = useReducedMotion();
  return <>
    <section className="hero">
      <div className="heroGrid container">
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .7 }} className="heroCopy">
          <div className="eyebrow light">SIALKOT · PAKISTAN · EST. 2026</div>
          <h1>Gloves made for <span>global brands.</span></h1>
          <p>OEM, private-label and custom glove manufacturing from Sialkot, Pakistan — built around quality, craftsmanship and dependable B2B supply.</p>
          <div className="heroActions"><Link className="quoteBtn" to="/products">Explore Catalogue <ArrowRight size={16} /></Link><Link className="ghostBtn" to="/contact">Start an Enquiry</Link></div>
          <div className="heroMeta"><span><b>06</b> categories</span><span><b>55</b> product references</span><span><b>OEM</b> private label</span></div>
        </motion.div>
        <motion.div initial={reduce ? false : { opacity: 0, scale: .96 }} animate={reduce ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .12 }} className="heroProductStage">
          <div className="stageGrid" />
          <GloveVisual variant="hero" />
          <div className="stageCaption"><span>01 / 06</span><strong>PRECISION / CRAFT / EXPORT</strong></div>
        </motion.div>
      </div>
      <div className="heroRail"><div className="container"><span>OEM & PRIVATE LABEL</span><span>QUALITY CONTROL</span><span>INTERNATIONAL B2B SUPPLY</span><span className="railArrow">SCROLL TO EXPLORE ↓</span></div></div>
    </section>

    <section className="intro section"><div className="container introGrid"><div><div className="eyebrow">THE SKYLINE APPROACH</div><h2>A manufacturing partner, not just a supplier.</h2></div><div><p>Skyline Global Industries is positioned around skilled craftsmanship, modern production technology, strict quality control and dependable service for brands, wholesalers, distributors and importers.</p><Link className="textLink" to="/about">About the company <ArrowRight size={15} /></Link></div></div></section>

    <section className="categorySection section"><div className="container"><SectionHeader eyebrow="PRODUCT CATALOGUE" title="Six categories. One focused manufacturing partner." link="View all products" to="/products" /><div className="categoryGrid">{categories.map((category, index) => <Link className="categoryCard" key={category.slug} to={`/products/${category.slug}`}><div className="cardNumber">0{index + 1}</div><div className="categoryVisual"><GloveVisual variant="card" /></div><div className="categoryInfo"><span>{String(category.count).padStart(2, '0')} REFERENCES · {category.prefix}</span><h3>{category.name}</h3><p>{category.copy}</p><ArrowRight size={17} /></div></Link>)}</div></div></section>

    <section className="oemFeature"><div className="container oemGrid"><div><div className="eyebrow light">OEM / PRIVATE LABEL</div><h2>Your brand.<br /><span>Our manufacturing.</span></h2></div><div><p>Custom design, logo printing, private-label branding, packaging and production support are part of the stated OEM offering.</p><Link className="lightLink" to="/oem-private-label">Explore OEM capabilities <ArrowRight size={16} /></Link></div></div></section>

    <section className="qualityTease section"><div className="container qualityTeaseGrid"><div className="qualityPanel"><div className="eyebrow">QUALITY & COMMITMENT</div><h2>Quality is a process, not a badge.</h2><p>The company positioning emphasizes quality control, innovation, customer satisfaction and long-term reliability.</p><Link className="textLink" to="/quality">Our quality approach <ArrowRight size={15} /></Link></div><div className="statsPanel"><div><strong>01</strong><span>Skilled craftsmanship</span></div><div><strong>02</strong><span>Modern machinery</span></div><div><strong>03</strong><span>Quality control</span></div><div><strong>04</strong><span>Global B2B focus</span></div></div></div></section>

    <section className="quoteCta"><div className="container quoteCtaInner"><div><div className="eyebrow">START A CONVERSATION</div><h2>Have a glove program in mind?</h2><p>Tell us what you need to source and we'll take it from there.</p></div><Link className="quoteBtn large" to="/contact">Request a Quote <ArrowRight size={17} /></Link></div></section>
  </>;
}

function SectionHeader({ eyebrow, title, link, to }: { eyebrow: string; title: string; link: string; to: string }) {
  return <div className="sectionHeader"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div><Link className="textLink" to={to}>{link} <ArrowRight size={15} /></Link></div>;
}

function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <section className="pageHero"><div className="container pageHeroInner"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{copy && <p>{copy}</p>}</div></section>;
}

function Products() {
  const { category } = useParams();
  const [filter, setFilter] = useState(category ?? 'all');
  const visible = useMemo(() => filter === 'all' ? products : products.filter((product) => product.category === filter), [filter]);
  return <><PageHero eyebrow="PRODUCT CATALOGUE" title="A clear catalogue for faster sourcing." copy="Browse the confirmed launch range by category. Product pages remain deliberately factual where individual technical specifications were not supplied." /><section className="section productsSection"><div className="container"><div className="filterBar"><button className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>All <b>{products.length}</b></button>{categories.map((item) => <button className={filter === item.slug ? 'selected' : ''} key={item.slug} onClick={() => setFilter(item.slug)}>{item.name} <b>{item.count}</b></button>)}</div><div className="catalogTop"><span>{visible.length} product references</span><span>SKU-led catalogue · OEM enquiries welcome</span></div><div className="productGrid">{visible.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div></div></section></>;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: .35, delay: Math.min(index * .015, .12) }}><Link className="productCard" to={`/products/${product.category}/${product.slug}`}><div className="productImage"><GloveVisual variant="product" /><span className="productCode">{product.code}</span><span className="viewPill">VIEW <ChevronRight size={12} /></span></div><div className="productMeta"><div><span>{product.categoryName}</span><strong>{product.code}</strong></div><ArrowRight size={15} /></div></Link></motion.div>;
}

function ProductDetail() {
  const { category, slug } = useParams();
  const product = products.find((item) => item.category === category && item.slug === slug);
  if (!product) return <NotFound />;
  return <><PageHero eyebrow={product.categoryName.toUpperCase()} title={product.code} copy={product.copy} /><section className="section detailSection"><div className="container detailGrid"><div className="detailVisual"><GloveVisual variant="detail" /><span>{product.categoryName} · {product.code}</span></div><div className="detailCopy"><div className="eyebrow">PRODUCT REFERENCE</div><h2>{product.code}</h2><p>{product.copy}</p><div className="detailRows"><div><span>Category</span><b>{product.categoryName}</b></div><div><span>Product code</span><b>{product.code}</b></div><div><span>Supply model</span><b>OEM / B2B</b></div></div><Link className="quoteBtn" to={`/contact?product=${encodeURIComponent(product.code)}`}>Request Quote for {product.code} <ArrowRight size={16} /></Link><p className="finePrint">Technical materials, sizes, colours, applications and individual MOQ are not published here because they were not supplied in the source catalogue.</p></div></div></section></>;
}

function About() {
  return <><PageHero eyebrow="ABOUT SKYLINE" title="A Sialkot manufacturing partner built for global business." copy="Skyline Global Industries is a manufacturer and exporter of premium-quality gloves specializing in OEM manufacturing, private labeling and custom glove solutions." /><section className="section"><div className="container editorialGrid"><div><div className="eyebrow">POSITIONING</div><h2>Manufacturing with a buyer-first mindset.</h2></div><div className="editorialCopy"><p>Based in Sialkot, Pakistan, Skyline serves brands, wholesalers, distributors and importers seeking a dependable glove manufacturing partner.</p><p>The supplied company material positions the business around skilled craftsmanship, modern production technology, strict quality control, competitive factory pricing and on-time delivery.</p><div className="principles"><div><strong>01</strong><span>Craftsmanship</span></div><div><strong>02</strong><span>Quality control</span></div><div><strong>03</strong><span>Customer focus</span></div></div></div></div></section><section className="darkStatement"><div className="container"><div className="eyebrow light">SI · PAKISTAN</div><h2>From a specialist manufacturing region to international B2B supply.</h2></div></section></>;
}

function OEM() {
  const steps = ['Design & development', 'Sampling', 'Branding & packaging', 'Production & quality control', 'Final shipment'];
  return <><PageHero eyebrow="OEM / PRIVATE LABEL" title="Turn your glove concept into a production program." copy="The supplied catalogue describes custom design, logo printing, private-label branding, packaging, premium quality materials and low-MOQ production as part of the OEM offering." /><section className="section"><div className="container"><div className="processList">{steps.map((step, index) => <div className="processItem" key={step}><span>0{index + 1}</span><div><h3>{step}</h3><p>Buyer-focused coordination around the manufacturing stage.</p></div><ArrowRight size={18} /></div>)}</div><div className="darkCta"><div><div className="eyebrow light">OEM ENQUIRY</div><h2>Bring the product brief.</h2><p>Start with the category, reference or concept you want to develop.</p></div><Link className="quoteBtn" to="/contact?interest=OEM%20%2F%20Private%20Label">Start OEM enquiry <ArrowRight size={16} /></Link></div></div></section></>;
}

function Manufacturing() {
  const items = [
    ['01', 'Modern machinery', 'The company material describes production supported by modern machinery and technology.'],
    ['02', 'Skilled craftsmanship', 'Craftsmanship is a core part of the supplied company positioning.'],
    ['03', 'Quality control', 'Quality control is emphasized throughout the production story.'],
    ['04', 'International B2B supply', 'The website is structured for brands, wholesalers, distributors and importers.'],
  ];
  return <><PageHero eyebrow="MANUFACTURING" title="Production presented with precision, without inflated claims." copy="This page stays grounded in the manufacturing claims supplied by the company material." /><section className="section"><div className="container featureRows">{items.map(([number, title, copy]) => <div className="featureRow" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ChevronRight size={18} /></div>)}</div></section></>;
}

function Quality() {
  const items = [['Quality', 'We never compromise on quality.'], ['Innovation', 'The supplied material states a focus on latest technology and techniques.'], ['Customer satisfaction', 'Customer satisfaction is positioned as a priority.'], ['Trust & reliability', 'The company emphasizes long-term relationships through trust and reliability.']];
  return <><PageHero eyebrow="QUALITY & COMMITMENT" title="Quality is a process, not a badge." copy="The public-facing story separates quality commitments from legal registration documents." /><section className="section"><div className="container qualityGrid">{items.map(([title, copy]) => <div className="qualityCard" key={title}><div className="qualityIcon"><Check size={17} /></div><h3>{title}</h3><p>{copy}</p></div>)}</div></section><section className="section qualityNote"><div className="container"><ShieldCheck size={24} /><div><div className="eyebrow">LEGAL VS QUALITY</div><h2>A certificate of incorporation is not a quality certification.</h2><p>The credentials page therefore presents the SECP document only as formal company registration.</p></div></div></section></>;
}

function Credentials() {
  return <><PageHero eyebrow="CREDENTIALS" title="Formal company registration, shown accurately." copy="The launch credentials page contains the confirmed SECP Certificate of Incorporation only." /><section className="section"><div className="container credentialWrap"><div className="certificateCard"><div className="certificateTop"><FileCheck2 size={21} /><span>SECP · CERTIFICATE OF INCORPORATION</span></div><div className="certificateStamp">SGI</div><div className="certificateBody"><span>SKYLINE GLOBAL INDUSTRIES</span><h2>(SMC-PRIVATE) LIMITED</h2><p>Incorporated under the Companies Act, 2017.</p><div className="certificateRef"><span>Corporate Unique Identification No.</span><strong>0323878</strong></div><div className="certificateDate"><span>Issued</span><strong>22 January 2026</strong></div></div><div className="certificateFooter"><span>LEGAL COMPANY REGISTRATION</span><small>Not a quality, safety or manufacturing-standard certification.</small></div></div></div></section></>;
}

function Gallery() {
  return <><PageHero eyebrow="GALLERY" title="A visual catalogue ready for the real product story." copy="The current source catalogue provides category/product imagery as page collages. Individual optimized product photography is the next asset pass." /><section className="section"><div className="container galleryGrid">{categories.map((category, index) => <div className="galleryTile" key={category.slug}><div className="galleryIndex">0{index + 1}</div><GloveVisual variant="gallery" /><div><span>{category.prefix} · {category.count} REFERENCES</span><h3>{category.name}</h3></div></div>)}</div></section></>;
}

function Contact() {
  const [params] = useSearchParams();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', interest: params.get('interest') || params.get('product') || '', message: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  return <><PageHero eyebrow="CONTACT / REQUEST A QUOTE" title="Let's discuss your next glove program." copy="Send your product interest and requirements. The form is intentionally front-end only until the client's preferred email/WhatsApp workflow is confirmed." /><section className="section"><div className="container contactGrid"><div className="contactInfo"><div className="eyebrow">DIRECT CONTACT</div><h2>Start with the requirement.</h2><p>For a product enquiry, include the reference code or category you are interested in.</p><a href={`tel:${contact.phone}`}><span>PHONE</span><strong>{contact.phone}</strong></a><a href={`mailto:${contact.email}`}><span>EMAIL</span><strong>{contact.email}</strong></a><div><span>LOCATION</span><strong>{contact.location}</strong></div></div><form className="quoteForm" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="formGrid"><label>Name<input required value={form.name} onChange={(event) => update('name', event.target.value)} /></label><label>Company<input value={form.company} onChange={(event) => update('company', event.target.value)} /></label></div><div className="formGrid"><label>Email<input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} /></label><label>Product / interest<input value={form.interest} onChange={(event) => update('interest', event.target.value)} /></label></div><label>Requirement<textarea required rows={7} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell us category, product reference, target market, quantity or any other requirement..." /></label><button className="quoteBtn" type="submit">{sent ? 'Enquiry Prepared' : 'Send Enquiry'} <ArrowRight size={16} /></button>{sent && <p className="formSuccess">The enquiry is captured in this demo. Connect the form to the client's preferred receiving workflow before launch.</p>}</form></div></section></>;
}

function NotFound() { return <><PageHero eyebrow="404" title="This page doesn't exist." copy="Return to the product catalogue or start a new enquiry." /><section className="section"><div className="container"><Link className="quoteBtn" to="/products">Back to catalogue <ArrowRight size={16} /></Link></div></section></>; }

function GloveVisual({ variant }: { variant: 'hero' | 'card' | 'product' | 'detail' | 'gallery' }) {
  return <div className={`gloveVisual ${variant}`} aria-hidden="true"><div className="gloveShape"><i /><i /><i /><i /><i /></div><span>SG</span></div>;
}

export default App;
