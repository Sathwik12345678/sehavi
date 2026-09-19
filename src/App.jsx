import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  Instagram,
  Leaf,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Wheat,
  X,
  Youtube,
} from "lucide-react";
import logo from "./assets/logo.jpg";
import fallbackProductImage from "./assets/prod1.png";

const imageBase = "https://res.cloudinary.com/czcltpi5/image/upload";

const products = [
  { id: "atta", name: "Millet Atta", category: "Flour", price: 220, oldPrice: 260, badge: "11 super grains", color: "#d8a64f", image: `${imageBase}/v1785391583/ma_front_dgcrhv.png`, description: "A fine blend of 11 super-ingredients for soft rotis, dosas and everyday comfort." },
  { id: "mix", name: "Millet Mix", category: "Multigrain", price: 220, oldPrice: 240, badge: "Protein + fibre", color: "#d7774b", image: `${imageBase}/v1787332817/Home/ProductImg/product-1-20260821-4603.jpg`, description: "Nutrient-rich millets crafted into a tasty, easy breakfast bowl." },
  { id: "moringa", name: "Moringa Leaf Flour", category: "Flour", price: 400, oldPrice: 500, badge: "20% off", color: "#6f8f5b", image: `${imageBase}/v1786193700/Home/ProductImg/moringa-leaf-powder-1-20260808-5874.jpg`, description: "Dried moringa leaves, finely milled for smoothies and nourishing bowls." },
  { id: "sorghum", name: "Sorghum Flour", category: "Flour", price: 117, oldPrice: 180, badge: "35% off", color: "#9c6a4b", image: `${imageBase}/v1786193220/Home/ProductImg/sorghum-flour-1-20260808-2419.jpg`, description: "Naturally gluten-free, nutrient-rich flour made from whole sorghum grains." },
  { id: "little", name: "Little Millet Flour", category: "Flour", price: 145, oldPrice: 220, badge: "34% off", color: "#b77c3c", image: `${imageBase}/v1786193564/Home/ProductImg/little-millet-flour-1-20260808-8744.jpg`, description: "A wholesome, versatile flour for healthy cooking and light bakes." },
  { id: "quinoa", name: "Quinoa Flour", category: "Flour", price: 143, oldPrice: 260, badge: "45% off", color: "#c99a52", image: `${imageBase}/v1786193587/Home/ProductImg/quinoa-flour-1-20260808-7015.jpg`, description: "Protein-rich quinoa flour for lighter, nourishing meals and bakes." },
  { id: "ragi", name: "Finger Millet Flour", category: "Flour", price: 98, oldPrice: 200, badge: "51% off", color: "#8b5a44", image: `${imageBase}/v1786193672/Home/ProductImg/finger-millet-flour-1-20260808-7015.jpg`, description: "Earthy, nutritious ragi flour for wholesome breakfasts and easy comfort food." },
  { id: "foxtail", name: "Foxtail Millet Flour", category: "Flour", price: 146, oldPrice: 185, badge: "21% off", color: "#e2af57", image: `${imageBase}/v1787136659/Home/ProductImg/foxtail-millet-flour-1-20260819-9952.jpg`, description: "Pure millet flour for rotis, dosas, cheelas and protein-rich pancakes." },
  { id: "combo", name: "Multigrain Combo", category: "Combos", price: 400, oldPrice: 440, badge: "9% off", color: "#4d7c64", image: `${imageBase}/v1787136704/Home/ProductImg/multigrain-combo-1-20260819-4440.jpg`, description: "A curated pantry bundle of nutritious grains and flours for everyday cooking." },
];

const tabs = ["Home", "Shop", "About"];

const grainProfiles = [
  { name: "Millet Atta", accent: "#d3a455", detail: "11 super grains • soft rotis & everyday comfort", image: "https://res.cloudinary.com/czcltpi5/image/upload/v1785391583/ma_front_dgcrhv.png" },
  { name: "Finger Millet Flour", accent: "#d77b4f", detail: "Iron-rich • earthy • everyday nutrition", image: fallbackProductImage },
  { name: "Foxtail Millet Flour", accent: "#cda56b", detail: "Light texture • protein-rich • versatile", image: "https://res.cloudinary.com/czcltpi5/image/upload/v1787136659/Home/ProductImg/foxtail-millet-flour-1-20260819-9952.jpg" },
  { name: "Sorghum Flour", accent: "#94a36e", detail: "Gluten-free • hearty • naturally nourishing", image: "https://res.cloudinary.com/czcltpi5/image/upload/v1786193220/Home/ProductImg/sorghum-flour-1-20260808-2419.jpg" },
  { name: "Little Millet Flour", accent: "#b9945b", detail: "Gentle taste • balanced nutrition • easy to cook", image: "https://res.cloudinary.com/czcltpi5/image/upload/v1786193564/Home/ProductImg/little-millet-flour-1-20260808-8744.jpg" },
  { name: "Quinoa Flour", accent: "#efc875", detail: "Protein-rich • lighter baking • modern pantry", image: "https://res.cloudinary.com/czcltpi5/image/upload/v1786193587/Home/ProductImg/quinoa-flour-1-20260808-7015.jpg" },
  { name: "Moringa Leaf Flour", accent: "#c47f4e", detail: "Leafy nutrition • nourishing • functional blend", image: "https://res.cloudinary.com/czcltpi5/image/upload/v1786193700/Home/ProductImg/moringa-leaf-powder-1-20260808-5874.jpg" },
  { name: "Multigrain Combo", accent: "#84644b", detail: "Curated pantry mix • everyday variety", image: "https://res.cloudinary.com/czcltpi5/image/upload/v1787136704/Home/ProductImg/multigrain-combo-1-20260819-4440.jpg" },
];

const routines = [
  { key: "breakfast", time: "06:30 AM", title: "Quick breakfast", desc: "Warm millet porridge and ragi dosa for a lighter, better start.", product: "Ragi + Oats Mix" },
  { key: "morning", time: "10:30 AM", title: "Mid-morning reset", desc: "A nourishing snack or smoothie bowl to keep energy balanced.", product: "Millet Mix" },
  { key: "lunch", time: "01:30 PM", title: "Lunch bowl", desc: "Nutritious rotis, bowls and grain sides for filling, fresh meals.", product: "Multigrain Atta" },
  { key: "snack", time: "05:00 PM", title: "Afternoon bite", desc: "Light, satisfying bites without the heaviness of refined flour.", product: "Jowar & Bajra Blend" },
  { key: "dinner", time: "08:30 PM", title: "Dinner ease", desc: "Comfort dinners built around real grains and honest ingredients.", product: "Sorghum + Quinoa Flour" },
];

const recipeIdeas = [
  { name: "Roti", type: "Breakfast staple", detail: "Soft, wholesome and ready in minutes.", image: "https://www.cookwithkushi.com/wp-content/uploads/2022/11/multigrain_roti_recipe.jpg" },
  { name: "Dosa", type: "Crisp & light", detail: "Crunchy, golden and easy to love.", image: "https://shop.sankalpfoods.com/wp-content/uploads/2024/10/Finger-Millet-Dosa-Mix-04.jpg" },
  { name: "Upma", type: "Savory comfort", detail: "A grainy breakfast that feels hearty.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" },
  { name: "Porridge", type: "Slow energy", detail: "Warm, creamy and gently nourishing.", image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80" },
  { name: "Pancake", type: "Weekend treat", detail: "Light and naturally satisfying.", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80" },
];

const socialCards = [
  { title: "Kitchen stories", tag: "#sehavi", accent: "#d7a14c", image: "https://www.cookwithkushi.com/wp-content/uploads/2022/11/multigrain_roti_recipe.jpg" },
  { title: "Recipe reels", tag: "@sehavi", accent: "#9fa870", image: "https://shop.sankalpfoods.com/wp-content/uploads/2024/10/Finger-Millet-Dosa-Mix-04.jpg" },
  { title: "Behind the grain", tag: "Farm to pack", accent: "#b96a4e", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85" },
  { title: "Everyday rituals", tag: "Real food", accent: "#5f7e67", image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=85" },
];

const reviews = [
  { quote: "It became part of our everyday breakfast. The taste is honest, comforting and easy to trust.", name: "Priya", place: "Hyderabad" },
  { quote: "The millet atta makes soft rotis and feels like a small upgrade to every family meal.", name: "Ananya", place: "Bengaluru" },
  { quote: "Clean ingredients, thoughtful packaging and genuinely lovely flour. I am ordering it again.", name: "Rahul", place: "Pune" },
  { quote: "The dosa mix is quick, light and full of flavour. It has earned a permanent spot in our pantry.", name: "Meera", place: "Chennai" },
];

function ProductImage({ src, alt, className = "", style, ...props }) {
  const [imageSrc, setImageSrc] = useState(src || fallbackProductImage);

  useEffect(() => {
    setImageSrc(src || fallbackProductImage);
  }, [src]);

  return (
    <img
      {...props}
      className={className}
      style={style}
      src={imageSrc}
      alt={alt}
      onError={(event) => {
        if (!event.currentTarget.dataset.fallbackApplied) {
          event.currentTarget.dataset.fallbackApplied = "true";
          event.currentTarget.src = fallbackProductImage;
        }
      }}
    />
  );
}

function RevealSection({ children, className = "", delay = 0, as: Tag = "section" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${className} reveal ${visible ? "visible" : ""}`.trim()} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="SeHaVi home">
      <img src={logo} alt="SeHaVi - Real ingredients. Real health." />
    </a>
  );
}

function App() {
  const [active, setActive] = useState(window.location.hash.slice(1) || "home");
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setActive(window.location.hash.slice(1) || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const addToCart = (product) => {
    setCart((items) =>
      items.some((item) => item.id === product.id)
        ? items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...items, { ...product, quantity: 1 }]
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const navigateToPage = (event, tab) => {
    event.preventDefault();
    setMenu(false);
    window.location.hash = `#${tab.toLowerCase()}`;
    window.scrollTo(0, 0);
  };

  return (
    <div className="site-shell">
      <div className="announcement">
        <Sparkles size={14} /> Free shipping on orders above ₹699 <span>•</span> 100% natural, zero preservatives
      </div>

      <header className="nav-wrap">
        <Logo />
        <nav className={menu ? "nav-links is-open" : "nav-links"}>
          {tabs.map((tab) => (
            <a key={tab} className={active === tab.toLowerCase() ? "active" : ""} href={`#${tab.toLowerCase()}`} onClick={(event) => navigateToPage(event, tab)}>
              {tab}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <Search size={19} />
          </button>
          <a className="icon-button desktop-only" href="#account" aria-label="Account">
            <CircleUserRound size={19} />
          </a>
          <button className="bag-button" onClick={() => document.querySelector(".cart-drawer")?.classList.add("is-open")} aria-label={`Cart with ${cartCount} items`}>
            <ShoppingBag size={19} />
            <span>{cartCount}</span>
          </button>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Menu">
            <Menu size={21} />
          </button>
        </div>
      </header>

      {active === "home" || active === "" ? <Home addToCart={addToCart} /> : active === "shop" ? <Shop addToCart={addToCart} /> : active === "about" ? <Editorial /> : <Home addToCart={addToCart} />}

      {searchOpen && <SearchOverlay close={() => setSearchOpen(false)} />}
      <CartDrawer cart={cart} setCart={setCart} />

      <footer>
        <div className="footer-top">
          <Logo />
          <p>
            Ancient grains for modern rituals.<br />
            Made with care in Warangal, Telangana.
          </p>
          <div className="socials">
            <a href="https://www.instagram.com/sehavifoods" aria-label="Instagram"><Instagram size={19} /></a>
            <a href="https://www.youtube.com/@sehavifoods" aria-label="YouTube"><Youtube size={19} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SeHaVi Enterprises Pvt. Ltd.</span>
          <span>Made in India • FSSAI certified • Lab tested</span>
        </div>
      </footer>
    </div>
  );
}

function HeroVisual() {
  const [selectedHeroProduct, setSelectedHeroProduct] = useState("Millet Atta");

  const highlighted = grainProfiles.find((grain) => grain.name === selectedHeroProduct) || grainProfiles[0];

  return (
    <div className="hero-visual" aria-label="Interactive product selector display">
      <div className="grain-field" aria-hidden="true">
        <span className="spark spark-1">R</span>
        <span className="spark spark-2">J</span>
        <span className="spark spark-3">B</span>
        <span className="spark spark-4">O</span>
        <span className="spark spark-5">W</span>
        <span className="spark spark-6">M</span>
      </div>

      <div className="hero-product-board">
        <button className={`hero-product-pill ${selectedHeroProduct === "Millet Atta" ? "active" : ""}`} onMouseEnter={() => setSelectedHeroProduct("Millet Atta")} onFocus={() => setSelectedHeroProduct("Millet Atta")}>
          MILLET ATTA
        </button>

        <button className={`hero-product-pill ${selectedHeroProduct === "Sorghum Flour" ? "active" : ""}`} onMouseEnter={() => setSelectedHeroProduct("Sorghum Flour")} onFocus={() => setSelectedHeroProduct("Sorghum Flour")}>
          SORGHUM
        </button>

        <button className={`hero-product-pill ${selectedHeroProduct === "Quinoa Flour" ? "active" : ""}`} onMouseEnter={() => setSelectedHeroProduct("Quinoa Flour")} onFocus={() => setSelectedHeroProduct("Quinoa Flour")}>
          QUINOA
        </button>

        <div className="hero-product-focus" style={{ background: `${highlighted.accent}cc` }}>
          <div className="hero-product-pack">
            <ProductImage src={highlighted.image} alt={highlighted.name} />
          </div>
        </div>

        <button className={`hero-product-pill ${selectedHeroProduct === "Foxtail Millet Flour" ? "active" : ""}`} onMouseEnter={() => setSelectedHeroProduct("Foxtail Millet Flour")} onFocus={() => setSelectedHeroProduct("Foxtail Millet Flour")}>
          FOXTAIL
        </button>

        <button className={`hero-product-pill ${selectedHeroProduct === "Moringa Leaf Flour" ? "active" : ""}`} onMouseEnter={() => setSelectedHeroProduct("Moringa Leaf Flour")} onFocus={() => setSelectedHeroProduct("Moringa Leaf Flour")}>
          MORINGA
        </button>

        <button className={`hero-product-pill ${selectedHeroProduct === "Finger Millet Flour" ? "active" : ""}`} onMouseEnter={() => setSelectedHeroProduct("Finger Millet Flour")} onFocus={() => setSelectedHeroProduct("Finger Millet Flour")}>
          FINGER MILLET
        </button>

        <button className={`hero-product-pill ${selectedHeroProduct === "Little Millet Flour" ? "active" : ""}`} onMouseEnter={() => setSelectedHeroProduct("Little Millet Flour")} onFocus={() => setSelectedHeroProduct("Little Millet Flour")}>
          LITTLE MILLET
        </button>
      </div>

      <div className="hero-scroll"><span>Scroll</span><ArrowRight size={16} /></div>
    </div>
  );
}

function Home({ addToCart }) {
  const [filter, setFilter] = useState("All");
  const [selectedRoutine, setSelectedRoutine] = useState("breakfast");

  const featured = useMemo(
    () => (filter === "All" ? products : products.filter((product) => product.category === filter)),
    [filter]
  );

  const activeRoutine = routines.find((item) => item.key === selectedRoutine) || routines[0];

  return (
    <main id="home">
      <RevealSection as="section" className="hero-section" delay={80}>
        <div className="hero-copy">
          <p className="eyebrow"><span /> Ancient grains. Modern everyday food.</p>
          <h1>
            GOOD FOOD.<br />
            <em>ROOTED IN GRAINS.</em>
          </h1>
          <p className="hero-lede">From millet mornings to honest, everyday meals — SeHaVi turns traditional grains into a premium, modern pantry experience.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#shop">Explore products <ArrowRight size={16} /></a>
            <a className="text-link" href="#about">Our story <ChevronDown size={15} /></a>
          </div>
          <div className="hero-proof">
            <span className="proof-icon"><Leaf size={17} /></span>
            <span>
              <strong>10</strong> super grains<br />
              <small>crafted in small batches</small>
            </span>
          </div>
        </div>

        <HeroVisual />
      </RevealSection>

      <RevealSection as="section" className="ticker" delay={120}>
        <div>NO CHEMICALS</div><span>✦</span><div>NO PRESERVATIVES</div><span>✦</span><div>NO MAIDA</div><span>✦</span><div>JUST GOOD GRAINS</div><span>✦</span><div>NO CHEMICALS</div>
      </RevealSection>

      <RevealSection as="section" className="shop-section" id="shop" delay={160}>
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> The pantry</p>
            <h2>Made for your daily rhythm.</h2>
          </div>
          <div className="category-pills">
            {['All', 'Multigrain', 'Flour', 'Combos'].map((item) => (
              <button className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="product-showcase">
          {featured.map((product) => (
            <FeatureProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" className="story-section section-block" delay={200}>
        <div className="section-heading narrow">
          <div>
            <p className="eyebrow"><span /> From grain to packet</p>
            <h2>Real ingredients.<br /><em>Carefully carried forward.</em></h2>
          </div>
        </div>

        <div className="journey">
          {[
            ["01", "The grain", "Selected with care and rooted in tradition."],
            ["02", "Selected", "The right grains are chosen for texture, taste and nutrition."],
            ["03", "Cleaned", "Each lot is cleaned to preserve purity without shortcuts."],
            ["04", "Ground", "Slow milling turns whole grain into gentle flour and texture."],
            ["05", "Packed", "Packed fresh with attention to flavour and daily use."],
            ["06", "Ready", "Now it is ready for your kitchen and everyday rituals."],
          ].map(([step, title, text]) => (
            <div key={step} className="journey-step">
              <span>{step}</span>
              <div>
                <h3 aria-label={title}>
                  {title.split("").map((letter, letterIndex) => (
                    <span key={`${title}-${letterIndex}`}>{letter === " " ? "\u00a0" : letter}</span>
                  ))}
                </h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" className="manifesto section-block" delay={220}>
        <div className="manifesto-art">
          <div className="sun-disc" />
          <div className="manifesto-grain">✦</div>
          <span>from soil<br />to soul</span>
        </div>

        <div className="manifesto-copy">
          <p className="eyebrow"><span /> Why SeHaVi</p>
          <h2>We keep it honest.<br /><em>We keep it real.</em></h2>
          <p>Small-batch milling, transparent ingredients and no shortcuts. The result is food that nourishes, tastes good and belongs in the rhythm of everyday life.</p>
          <a className="button button-dark" href="#about">Discover our story <ArrowRight size={16} /></a>
        </div>
      </RevealSection>

      <RevealSection as="section" className="routine-section section-block" delay={240}>
        <div className="section-heading narrow">
          <div>
            <p className="eyebrow"><span /> How do you eat?</p>
            <h2>Made for your day.</h2>
          </div>
        </div>

        <div className="routine-wrap">
          <div className="routine-tabs">
            {routines.map((item) => (
              <button className={selectedRoutine === item.key ? 'active' : ''} key={item.key} onClick={() => setSelectedRoutine(item.key)}>
                <span>{item.time}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>

          <div className="routine-card">
            <p className="eyebrow"><span /> {activeRoutine.time}</p>
            <h3>{activeRoutine.title}</h3>
            <p>{activeRoutine.desc}</p>
            <div className="chip-row">
              <span>{activeRoutine.product}</span>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="recipe-section section-block" delay={260}>
        <div className="section-heading narrow">
          <div>
            <p className="eyebrow"><span /> Turn grains into something good</p>
            <h2>Breakfast to dinner.<br /><em>In every form.</em></h2>
          </div>
        </div>

        <div className="recipe-slider">
          {recipeIdeas.map((recipe) => (
            <article key={recipe.name} className="recipe-card">
              <div className="recipe-visual">
                <img src={recipe.image} alt={recipe.name} loading="lazy" />
                <div className="recipe-badge">{recipe.type}</div>
              </div>
              <h3>{recipe.name}</h3>
              <p>{recipe.detail}</p>
              <button className="button button-light">Make this <ArrowRight size={15} /></button>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" className="quote-section section-block" delay={280}>
        <p className="eyebrow"><span /> Customer stories</p>
        <blockquote>“{reviews[0].quote}”</blockquote>
        <p className="quote-by">— {reviews[0].name}, {reviews[0].place}</p>
        <div className="review-grid">
          {reviews.slice(1).map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>“{review.quote}”</blockquote>
              <p>— {review.name}, {review.place}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection as="section" className="social-section section-block" delay={300}>
        <div className="section-heading narrow">
          <div>
            <p className="eyebrow"><span /> Sehavi IRL</p>
            <h2>Fresh looks.<br /><em>Everyday rituals.</em></h2>
          </div>
        </div>

        <div className="social-grid">
          {socialCards.map((card) => (
            <article key={card.title} className="social-card" style={{ background: `${card.accent}22` }}>
              <div className="social-visual" style={{ background: card.accent }}>
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="social-meta">
                <span>{card.tag}</span>
                <h3>{card.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}

function FeatureProductCard({ product, addToCart }) {
  return (
    <article className="feature-product">
      <div className="feature-visual" style={{ background: `linear-gradient(135deg, ${product.color}cc, ${product.color})` }}>
        <span className="product-badge">{product.badge}</span>
        <ProductImage src={product.image} alt={product.name} />
      </div>
      <div className="feature-copy">
        <div className="feature-header">
          <div>
            <p className="product-category">{product.category}</p>
            <h3>{product.name}</h3>
          </div>
          <button className="add-button" onClick={() => addToCart(product)}><Plus size={17} /> Add</button>
        </div>
        <p>{product.description}</p>
        <div className="price-row"><strong>₹{product.price}</strong><del>₹{product.oldPrice}</del><span>500g</span></div>
      </div>
    </article>
  );
}

function Shop({ addToCart }) {
  return (
    <main className="shop-page">
      <RevealSection as="div" className="page-intro" delay={80}>
        <p className="eyebrow"><span /> The full pantry</p>
        <h1>Good things,<br /><em>all together.</em></h1>
        <p>From everyday atta to superfood flours and thoughtful combos, find your next pantry staple.</p>
      </RevealSection>
      <RevealSection as="div" className="shop-toolbar" delay={120}>
        <span>{products.length} products</span>
        <span>Sorted by <strong>Most loved</strong> <ChevronDown size={15} /></span>
      </RevealSection>
      <div className="product-grid">
        {products.map((product, index) => (
          <RevealSection as="div" className="product-card-wrap" key={product.id} delay={80 + index * 60}>
            <ProductCard product={product} addToCart={addToCart} />
          </RevealSection>
        ))}
      </div>
    </main>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <div className="product-visual" style={{ "--product-color": product.color }}>
        <span className="product-badge">{product.badge}</span>
        <ProductImage src={product.image} alt={product.name} loading="lazy" />
        <div className="product-shadow" />
      </div>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <button className="add-button" onClick={() => addToCart(product)}><Plus size={17} /> Add</button>
        <p className="product-description">{product.description}</p>
        <div className="price-row"><strong>₹{product.price}</strong><del>₹{product.oldPrice}</del><span>500g</span></div>
      </div>
    </article>
  );
}

function Editorial() {
  const aboutProduct = products.find((product) => product.id === "atta") || products[0];

  return (
    <main className="editorial-page">
      <RevealSection as="section" className="page-intro about-hero" delay={80}>
        <div className="about-hero-copy">
          <p className="eyebrow"><span /> Our story</p>
          <h1>Rooted in care.<br /><em>Made for now.</em></h1>
          <p>SeHaVi began with a simple question: what if everyday nourishment could be both deeply good and genuinely delightful?</p>
        </div>
        <div className="about-hero-visual" style={{ background: `linear-gradient(135deg, ${aboutProduct.color}dd, ${aboutProduct.color})` }}>
          <span className="product-badge">Our everyday staple</span>
          <ProductImage src={aboutProduct.image} alt={aboutProduct.name} />
        </div>
      </RevealSection>

      <RevealSection as="div" className="editorial-grid" delay={140}>
        <div className="editorial-art">
          <div className="art-rings" />
          <Wheat size={86} strokeWidth={1} />
          <span>the good<br />grain story</span>
        </div>

        <div className="editorial-copy">
          <p>We source with intention, mill in small batches and make food that earns a place in your kitchen. From Ragi to Quinoa, each product celebrates diversity, not complexity.</p>
          <div className="value-list">
            <div><span>01</span><h3>Pure by nature</h3><p>Zero chemicals, zero preservatives and no artificial elements.</p></div>
            <div><span>02</span><h3>Made with respect</h3><p>Careful processing that keeps the grain's natural goodness intact.</p></div>
            <div><span>03</span><h3>For every table</h3><p>Wholesome pantry staples that work beautifully in real everyday recipes.</p></div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}

function SearchOverlay({ close }) {
  const [query, setQuery] = useState("");
  const results = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="overlay">
      <div className="search-panel">
        <button className="close-button" onClick={close}><X size={21} /></button>
        <p className="eyebrow"><span /> Search the pantry</p>
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “millet”, “flour”..." />

        {query && (
          <div className="search-results">
            {results.map((product) => (
              <a href="#shop" onClick={close} key={product.id}>
                <span>{product.name}</span>
                <strong>₹{product.price}</strong>
              </a>
            ))}
            {!results.length && <p>No grains found yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function CartDrawer({ cart, setCart }) {
  const close = () => document.querySelector(".cart-drawer")?.classList.remove("is-open");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-drawer">
      <div className="cart-head">
        <div>
          <p className="eyebrow"><span /> Your pantry</p>
          <h2>Cart <small>({cart.length})</small></h2>
        </div>
        <button className="close-button" onClick={close}><X size={21} /></button>
      </div>

      {cart.length ? (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-thumb" style={{ backgroundColor: item.color }}>
                  <ProductImage src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} · 500g</p>
                  <div className="quantity">
                    <button onClick={() => setCart((items) => items.map((entry) => entry.id === item.id ? { ...entry, quantity: Math.max(0, entry.quantity - 1) } : entry).filter((entry) => entry.quantity))}><Minus size={13} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => setCart((items) => items.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry))}><Plus size={13} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total"><span>Subtotal</span><strong>₹{total}</strong></div>
          <button className="button button-dark checkout">Checkout <ArrowRight size={16} /></button>
        </>
      ) : (
        <div className="empty-cart">
          <ShoppingBag size={34} />
          <p>Your pantry is waiting.</p>
          <a className="button button-light" href="#shop" onClick={close}>Browse products</a>
        </div>
      )}
    </div>
  );
}

export default App;
