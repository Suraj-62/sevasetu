const fs = require('fs');
const oldHome = fs.readFileSync('old_home_utf8.jsx', 'utf8');
const newHome = fs.readFileSync('client/src/pages/Home.jsx', 'utf8');

// 1. Get imports from new Home
const newImports = newHome.substring(0, newHome.indexOf('// --- Data Objects ---'));

// 2. Add missing imports that the old home needed but new didn't have
let lucideMatch = newImports.match(/import \{([^}]+)\} from 'lucide-react';/);
let oldLucideMatch = oldHome.match(/import \{([^}]+)\} from 'lucide-react';/);
let combinedLucide = [...new Set((lucideMatch[1] + ',' + oldLucideMatch[1] + ',Zap,Sparkles').split(',').map(s=>s.trim()).filter(Boolean))].join(', ');

let mergedImports = newImports.replace(lucideMatch[0], `import { ${combinedLucide} } from 'lucide-react';`);

// 3. Get new data objects
const newDataObjs = newHome.substring(newHome.indexOf('// --- Data Objects ---'), newHome.indexOf('const Home = () => {'));

// 4. Get old data objects
let oldDataObjs = oldHome.substring(oldHome.indexOf('const popularSearches'), oldHome.indexOf('// --- Main Component ---'));
// Remove the duplicate Zap/Sparkles import in the old file if it exists
oldDataObjs = oldDataObjs.replace(/import \{ Zap, Sparkles \} from 'lucide-react';/, '');

// 5. Get the new Home Component body (Hero + Features + Popular Services)
let newBody = newHome.substring(newHome.indexOf('const Home = () => {'), newHome.indexOf('</main>'));

// 6. Get the old Home Component bottom sections (Sections 3 to 12)
let oldBodyBottom = oldHome.substring(oldHome.indexOf('{/* 3. Categories Grid */}'), oldHome.indexOf('</main>'));

// 7. Old state
let openFaqState = "\n  const [openFaq, setOpenFaq] = useState(0);\n";
newBody = newBody.replace("const [searchQuery, setSearchQuery] = useState('');", "const [searchQuery, setSearchQuery] = useState('');" + openFaqState);

// Combine
const finalCode = `${mergedImports}${newDataObjs}\n${oldDataObjs}\n${newBody}\n        ${oldBodyBottom}\n      </main>\n    </div>\n  );\n};\n\nexport default Home;\n`;

fs.writeFileSync('client/src/pages/Home.jsx', finalCode);
console.log('Successfully merged Home.jsx!');
