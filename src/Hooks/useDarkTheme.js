import { useState, useEffect} from "react"

function useDarkTheme() {
    const [siteTheme, setSiteTheme] = useState(localStorage.siteTheme);
    const colorSiteTheme = siteTheme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
      const root = window.document.documentElement
      root.classList.remove(colorSiteTheme)
      root.classList.add(siteTheme)
      localStorage.setItem('siteTheme', siteTheme)

    }, [siteTheme, colorSiteTheme])


  return[colorSiteTheme, setSiteTheme]
}

export default useDarkTheme