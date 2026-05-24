import { useInventory } from '../App';

export default function Toggles({authorized=false}){
   const{ theme,lang,setTheme,setLang,translations,logout} = useInventory()
   return <div className="header-right" style={authorized?{}:{width:'100%',justifyContent:'flex-end'}}>
        <button
          className="active-element switch-btn"
          onClick={() => setLang(prev => (prev === 'en' ? 'ru' : 'en'))}
          aria-label={translations[lang].toggleLang}
          title={translations[lang].switchLang}
        >
          {lang === 'en' ? '🇺🇸' : '🇷🇺'}
        </button>

        <button
          className="active-element switch-btn"
          onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
          aria-label="Toggle theme"
          title={theme === 'light' ? translations[lang].switchDark : translations[lang].switchLight}
        >
          {theme === 'light' ? '🌞' : '🌕'}
        </button>
        {authorized &&<button
          className="active-element switch-btn"
          onClick={() => logout()}
          aria-label={translations[lang].logout}
          title={translations[lang].logout}
          style={{color:"red"}}
        >
          ➜]
        </button>}
      </div>
}