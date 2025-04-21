import React from 'react'

interface FooterProps {
  language: string
  onLanguageChange: (language: string) => void
}

/**
 * Footer component for the Notion Avatar Editor app.
 *
 * Renders the footer with a Buy Me A Coffee link and language switcher.
 *
 * :param language: The current language code.
 * :param onLanguageChange: Function to change the language.
 * :returns: The footer as a React functional component.
 */
const Footer: React.FC<FooterProps> = ({ language, onLanguageChange }) => {
  return (
    <footer className="flex items-center justify-center text-gray-400 text-sm pb-5">
      <a
        href="https://www.buymeacoffee.com/miqilin18P"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="transition-opacity duration-300 hover:opacity-75"
      >
        Buy Me A Coffee
      </a>
      <span className="mx-3 relative -top-1">.</span>
      <span
        className="transition-opacity cursor-pointer duration-300 hover:opacity-75"
        onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
      >
        {language === 'en' ? '简体中文' : 'English'}
      </span>
    </footer>
  )
}

export default Footer
