/**
 * Time-Kerchief Core MVP v3.0 - Product Catalogue & Glossary Lexicon
 */

import { Product, ProductId } from '../types/content';
import { COTTON_PRODUCT } from './cottonGarment';
import { BISCUIT_PRODUCT } from './packagedBiscuit';

export const ALL_PRODUCTS: Product[] = [COTTON_PRODUCT, BISCUIT_PRODUCT];

export function getProductById(id: ProductId | string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export const GLOSSARY_DICTIONARY: Record<string, { term: string; definition: string; category: string }> = {
  // Cotton terms
  'Gossypium': {
    term: 'Gossypium',
    definition: 'The genus of cotton-producing plants in the mallow family Malvaceae. Gossypium hirsutum accounts for over 90% of global organic cotton apparel.',
    category: 'Botanical Science',
  },
  'Boll Weevil Control': {
    term: 'Boll Weevil Control',
    definition: 'Integrated pest management techniques to protect blooming cotton capsules without relying on heavy synthetic pesticides.',
    category: 'Agricultural Science',
  },
  'Micronaire Value': {
    term: 'Micronaire Value',
    definition: 'A measure of cotton fiber fineness and maturity determined by air permeability through a standardized plug of fibers.',
    category: 'Fiber Technology',
  },
  'Staple Length': {
    term: 'Staple Length',
    definition: 'The average length of spun cotton fibers (typically 28–32 mm). Longer staple fibers yield softer, significantly stronger yarns.',
    category: 'Fiber Technology',
  },
  'Saw Ginning': {
    term: 'Saw Ginning',
    definition: 'Mechanical separation of cotton fibers from seeds using circular saw blades rotating through narrow slotted grate bars.',
    category: 'Mechanical Engineering',
  },
  'Card Clothing': {
    term: 'Card Clothing',
    definition: 'Heavy foundation studded with millions of fine, angled steel wire teeth that comb and parallelize entangled fibers.',
    category: 'Textile Machinery',
  },
  'Sliver Ribbon': {
    term: 'Sliver Ribbon',
    definition: 'A continuous, untwisted rope of loosely parallelized fibers gathered from the carding web, ready for drawing.',
    category: 'Yarn Production',
  },
  'Nep Count': {
    term: 'Nep Count',
    definition: 'The concentration of small, tangled fiber knots in raw cotton that must be eliminated to ensure smooth yarn surface.',
    category: 'Quality Testing',
  },
  'English Count (Ne)': {
    term: 'English Count (Ne)',
    definition: 'Traditional yarn numbering system indicating the number of 840-yard skeins that weigh one pound. Higher numbers denote finer yarns.',
    category: 'Yarn Metrology',
  },
  'Twist per Inch (TPI)': {
    term: 'Twist per Inch (TPI)',
    definition: 'The number of helical turns imparted per inch of yarn. TPI creates friction locking fibers together for tensile tenacity.',
    category: 'Yarn Engineering',
  },
  'Ring Spindle': {
    term: 'Ring Spindle',
    definition: 'High-speed rotating spindle holding bobbins, spinning at up to 25,000 RPM while steel travelers twist the yarn.',
    category: 'Textile Machinery',
  },
  'Drafting': {
    term: 'Drafting',
    definition: 'The attenuation or stretching of fiber slivers through differential roller speeds, reducing thickness before twisting.',
    category: 'Yarn Production',
  },
  'Circular Knit': {
    term: 'Circular Knit',
    definition: 'A tubular fabric formed by needles arranged in a rotating cylinder, creating a continuous seamless loop of single-jersey.',
    category: 'Fabric Formation',
  },
  'Single Jersey': {
    term: 'Single Jersey',
    definition: 'A plain weft-knitted textile with distinct vertical ribs (wales) on the face and semi-circular loops (courses) on the back.',
    category: 'Fabric Formation',
  },
  'Wale & Course': {
    term: 'Wale & Course',
    definition: 'Wales are vertical columns of loops; courses are horizontal rows. Their geometry gives t-shirts natural 2-way body stretch.',
    category: 'Structural Textile',
  },
  'Greige Good': {
    term: 'Greige Good',
    definition: 'Raw, unbleached, and un-dyed knitted or woven textile straight from the machine, containing natural cotton waxes.',
    category: 'Textile Production',
  },
  'Reactive Dyeing': {
    term: 'Reactive Dyeing',
    definition: 'Dyes containing reactive chemical groups that establish covalent bonds with the hydroxyl groups of cotton cellulose.',
    category: 'Wet Processing',
  },
  'Covalent Bond': {
    term: 'Covalent Bond',
    definition: 'A chemical bond involving the sharing of electron pairs between atoms, providing permanent wash-fast color retention.',
    category: 'Chemical Science',
  },
  'Stenter Frame': {
    term: 'Stenter Frame',
    definition: 'An industrial heated oven chamber that grips fabric edges on pin chains to dry, straighten, and thermally set width.',
    category: 'Finishing Machinery',
  },
  'Liquor Ratio': {
    term: 'Liquor Ratio',
    definition: 'The weight ratio of dye bath water to dry fabric. Modern low-liquor jet dye machines reduce ratios from 1:10 down to 1:4.5.',
    category: 'Resource Efficiency',
  },
  'Marker Efficiency': {
    term: 'Marker Efficiency',
    definition: 'The percentage of fabric area converted into usable pattern panels versus offcut scrap during CAD nesting.',
    category: 'Industrial Optimization',
  },
  'CAD Nesting': {
    term: 'CAD Nesting',
    definition: 'Computer-assisted geometric optimization algorithms that tightly interlock garment shapes across fabric markers.',
    category: 'Digital Manufacturing',
  },
  'Grainline Alignment': {
    term: 'Grainline Alignment',
    definition: 'Aligning pattern pieces with the vertical yarn wales to prevent garment skewing or twisting after domestic washing.',
    category: 'Apparel Design',
  },
  'Ply Height': {
    term: 'Ply Height',
    definition: 'The total number of fabric sheets stacked on the cutting table (typically 30–60 layers) held rigid under vacuum.',
    category: 'Cutting Technology',
  },
  'Overlock 4-Thread': {
    term: 'Overlock 4-Thread',
    definition: 'A flexible industrial stitch (ISO 514) utilizing two needles and two loopers to trim and enclose raw seam edges simultaneously.',
    category: 'Garment Assembly',
  },
  'Coverstitch (ISO 406)': {
    term: 'Coverstitch (ISO 406)',
    definition: 'Dual-needle hem stitch forming parallel rows on top and a chain net below, providing stretch without snapping thread.',
    category: 'Garment Assembly',
  },
  'Stitches Per Inch (SPI)': {
    term: 'Stitches Per Inch (SPI)',
    definition: 'A quality specification measuring stitch density. Everyday premium cotton t-shirts typically target 10–12 SPI.',
    category: 'Quality Standard',
  },
  'Differential Feed': {
    term: 'Differential Feed',
    definition: 'Independent front and rear feed dogs in sewing machines that gather or stretch fabric to prevent unsightly seam wavy ripples.',
    category: 'Sewing Technology',
  },
  'Dimensional Stability': {
    term: 'Dimensional Stability',
    definition: 'The ability of a knitted textile to resist shrinking, stretching, or torque twisting across repeated wash and dry cycles.',
    category: 'Quality Assurance',
  },
  'Tolerance Spec': {
    term: 'Tolerance Spec',
    definition: 'The allowable manufacturing variation (e.g. ±0.5 cm or ±1.5 mm) in garment chest, sleeve, or collar measurements.',
    category: 'Quality Metrology',
  },
  'Seam Integrity': {
    term: 'Seam Integrity',
    definition: 'The strength and elasticity of stitched joins under transverse load without thread breakage or seam grin.',
    category: 'Quality Testing',
  },
  'Barcoding': {
    term: 'Barcoding',
    definition: 'GS1 optical bar patterns and RFID chips providing international retail inventory and provenance traceability.',
    category: 'Supply Chain',
  },

  // Biscuit terms
  'Caryopsis': {
    term: 'Caryopsis',
    definition: 'The botanical term for a dry single-seeded cereal fruit where the outer seed coat is fused completely with the pericarp wall.',
    category: 'Botanical Science',
  },
  'Endosperm': {
    term: 'Endosperm',
    definition: 'The starch-rich nutritive interior tissue of the wheat grain representing ~83% of kernel weight, milled into refined flour.',
    category: 'Food Chemistry',
  },
  'Hygrometry': {
    term: 'Hygrometry',
    definition: 'The scientific measurement of humidity and moisture content in grain stores, critical for preventing mold germination.',
    category: 'Grain Storage',
  },
  'Threshing Concave': {
    term: 'Threshing Concave',
    definition: 'Curved grating beneath the rotating combine cylinder that rubs grains free from their chaff husks.',
    category: 'Agricultural Machinery',
  },
  'Tempering': {
    term: 'Tempering',
    definition: 'Controlled addition of water to raw wheat followed by 12–24h resting to toughen outer bran and mellow the starchy endosperm.',
    category: 'Milling Technology',
  },
  'Fluted Rolls': {
    term: 'Fluted Rolls',
    definition: 'Chilled iron rollers with spiral grooves running at differential speeds to crack open conditioned wheat kernels cleanly.',
    category: 'Milling Technology',
  },
  'Plansifter': {
    term: 'Plansifter',
    definition: 'A massive multi-compartment gyratory sieving stack holding dozens of vibrating screens that sort flour by particle micron size.',
    category: 'Milling Technology',
  },
  'Alveograph (P/L)': {
    term: 'Alveograph (P/L)',
    definition: 'Laboratory instrument inflating a dough bubble until rupture, measuring dough tenacity (P) over extensibility (L) for baking suitability.',
    category: 'Food Rheology',
  },
  'Shortening': {
    term: 'Shortening',
    definition: 'Fat or vegetable oil that physically coats flour proteins, inhibiting long gluten network formation to produce a tender, crumbly biscuit.',
    category: 'Baking Science',
  },
  'Lecithin (INS 322)': {
    term: 'Lecithin (INS 322)',
    definition: 'A natural phospholipid emulsifier extracted from soya that reduces dough viscosity and stabilizes fat-water distribution.',
    category: 'Food Additives',
  },
  'Leavening Salts': {
    term: 'Leavening Salts',
    definition: 'Inorganic food-grade carbonates (e.g. INS 500ii, 503ii) that chemically release carbon dioxide gas bubbles under baking heat.',
    category: 'Food Chemistry',
  },
  'Sigma Blade': {
    term: 'Sigma Blade',
    definition: 'Heavy Z-shaped stainless steel mixing arms that fold, stretch, and homogenize viscous biscuit dough batches.',
    category: 'Industrial Machinery',
  },
  'Rotary Moulder': {
    term: 'Rotary Moulder',
    definition: 'A continuous rotating brass cylinder with engraved recessed cavities that press dough into intricate decorative biscuit rounds.',
    category: 'Food Machinery',
  },
  'Docking Pins': {
    term: 'Docking Pins',
    definition: 'Small needle points in moulder dies that pierce holes through biscuit dough to vent trapped steam during oven expansion.',
    category: 'Baking Technology',
  },
  'Die Cavity': {
    term: 'Die Cavity',
    definition: 'The precisely machined negative relief pocket on a rotary moulder cylinder determining biscuit shape, logo, and edge border.',
    category: 'Tooling & Tooling',
  },
  'Web Return': {
    term: 'Web Return',
    definition: 'An automated conveyor loop returning dough offcuts between cut biscuit pieces back to the primary dough hopper with zero waste.',
    category: 'Resource Efficiency',
  },
  'Maillard Reaction': {
    term: 'Maillard Reaction',
    definition: 'A chemical reaction between amino acids and reducing sugars under baking heat (140°C–200°C) producing golden melanoidins and rich aroma.',
    category: 'Food Biochemistry',
  },
  'Tunnel Oven': {
    term: 'Tunnel Oven',
    definition: 'A long continuous conveyorized industrial oven (60–100m) with separate temperature and humidity zones for progressive baking.',
    category: 'Baking Machinery',
  },
  'Starch Gelatinization': {
    term: 'Starch Gelatinization',
    definition: 'The thermal disruption of starch granules in the presence of moisture (above 65°C), setting the internal structural crumb matrix.',
    category: 'Baking Science',
  },
  'Melanoidins': {
    term: 'Melanoidins',
    definition: 'Brown, high molecular weight nitrogenous pigments created during late-stage Maillard browning that provide color and antioxidants.',
    category: 'Biochemistry',
  },
  'Modified Atmosphere (MAP)': {
    term: 'Modified Atmosphere (MAP)',
    definition: 'Packaging technique replacing ambient oxygen with food-grade inert nitrogen (N2) to prevent fat oxidation and crispness loss.',
    category: 'Packaging Technology',
  },
  'BOPP Film': {
    term: 'BOPP Film',
    definition: 'Biaxially Oriented Polypropylene; an ultra-thin barrier plastic film with high moisture resistance and thermal fin-sealing capability.',
    category: 'Packaging Materials',
  },
  'Fin-Seal': {
    term: 'Fin-Seal',
    definition: 'A longitudinal or end hermetic seal created by heated rotary crimpers folding and pressing film edges together under pressure.',
    category: 'Packaging Technology',
  },
  'Oxidative Rancidity': {
    term: 'Oxidative Rancidity',
    definition: 'Chemical degradation of unsaturated fats reacting with atmospheric oxygen, forming objectionable aldehydes and off-flavors.',
    category: 'Food Safety',
  },
  'Checkweigher': {
    term: 'Checkweigher',
    definition: 'An inline automatic weighing machine that verifies every single sealed pack meets declared net weight standards at 400+ packs/min.',
    category: 'Metrology & QA',
  },
  'Dynamic Load Cell': {
    term: 'Dynamic Load Cell',
    definition: 'A high-speed piezoelectric or strain gauge sensor that accurately measures mass while the product moves continuously across the conveyor.',
    category: 'Sensor Technology',
  },
  'HACCP': {
    term: 'HACCP',
    definition: 'Hazard Analysis and Critical Control Points; a systematic preventive food safety management framework mandated by international law.',
    category: 'Food Safety Standard',
  },
  'Peroxide Value': {
    term: 'Peroxide Value',
    definition: 'A standard laboratory chemical titration metric determining the extent of primary lipid oxidation in baked goods.',
    category: 'Quality Testing',
  },
};
