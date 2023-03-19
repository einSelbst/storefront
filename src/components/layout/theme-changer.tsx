import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

const ThemeChanger = (): ComponentReturnType => {
  /* type ThemeType = ReturnType<typeof useTheme> */

  /* const { theme, setTheme }: ThemeType = useTheme() */
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // because jsx-no-bind, for performance reasons I want reusable callback functions
  const setThemeLight = useCallback(() => {
    setTheme('light')
  }, [setTheme])

  const setThemeDark = useCallback(() => {
    setTheme('dark')
  }, [setTheme])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [setTheme, theme])

  /*
   * ToDo [>1.5]: refactor to use nextjs default way of rendering only on client
   * @see {@link https://github.com/vercel/next.js/blob/4e9c5eeae075e2cba60bab0a522cd43ce9662c5c/examples/progressive-render/pages/index.js}
   */
  // eslint-disable-next-line unicorn/no-null
  if (!mounted) return null

  return (
    <div>
      The current theme is: {theme}
      <br />
      <button type='button' onClick={setThemeLight}>
        Light Mode
      </button>
      <br />
      <button type='button' onClick={setThemeDark}>
        Dark Mode
      </button>
      <br />
      <button
        className='mt-16 rounded-md bg-black px-4 py-2 font-semibold text-white dark:bg-white dark:text-black'
        type='button'
        onClick={toggleTheme}>
        Change Theme
      </button>
    </div>
  )
}

export default ThemeChanger
