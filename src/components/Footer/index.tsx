/*
MIT License

Original project: https://github.com/zonemeen/react-notion-avatar (c) 2021 zonemeen and contributors.
This fork and update: (c) 2024 Joao Pedro Goncalves
*/
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
        href="https://github.com/zonemeen/react-notion-avatar"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="transition-opacity duration-300 hover:opacity-75"
      >
        [PRESS HERE]To go to the original Github project that this is based on.
      </a>
    </footer>
  )
}

export default Footer
