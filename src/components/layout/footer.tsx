import Toggle from '../toggle'

const NOTIFICATION_STATES: Record<string, string> = {
  error: 'Something went wrong ...',
  info: 'Did you know? ...',
  warning: 'Be careful here ...',
} as const

const Netlify = () => (
  <>
    <a href='https://www.netlify.com' rel='noopener noreferrer' target='_blank'>
      <img
        alt='visit netlify.com'
        className='logo'
        height='51'
        src='https://www.netlify.com/img/global/badges/netlify-color-accent.svg'
        width='114'
      />
    </a>
    <a href='https://www.netlify.com'>
      <img
        alt='Deploys by Netlify'
        height='51'
        src='https://www.netlify.com/img/global/badges/netlify-color-bg.svg'
        width='114'
      />
    </a>
    <a href='https://www.netlify.com'>
      <img
        alt='Deploys by Netlify'
        height='51'
        src='https://www.netlify.com/img/global/badges/netlify-light.svg'
        width='114'
      />
    </a>
  </>
)

const HosterLogoLink = ({
  href,
  hoster,
  logoSrc,
  logoWidth,
  logoHeight,
}: {
  href: string
  hoster: string
  logoSrc: string
  logoWidth: number
  logoHeight: string
}) => (
  <a href={href} rel='noopener noreferrer' target='_blank'>
    <img
      alt={`${hoster} logo`}
      className='logo'
      height={logoHeight}
      src={`/logos/${logoSrc}`}
      title={`visit ${hoster}`}
      width={`${logoWidth}px`}
    />
    <style jsx>{`
      img.logo {
        margin: 11px auto;
      }
    `}</style>
  </a>
)

const Amplify = () => (
  <HosterLogoLink
    hoster='AWS Amplify'
    href='https://aws.amazon.com/de/amplify/'
    logoHeight='24px'
    logoSrc='aws-amplify-logo.png'
    logoWidth={169}
  />
)

const Vercel = () => (
  <HosterLogoLink
    hoster='Vercel'
    href='https://vercel.com'
    logoHeight='24px'
    logoSrc='vercel-logo.svg'
    logoWidth={106}
  />
)

const HOSTER: Record<string, React.ReactNode> = {
  AMPLIFY: <Amplify />,
  LOCALHOST: <span>Localhost</span>,
  NETLIFY: <Netlify />,
  VERCEL: <Vercel />,
}

/*
 * callback should be outside of the actual component for proper memoization
 * alternatively can use 'useCallback', see 'Toggle' component
 */
const toggleCss = (cssStyling: boolean) => {
  const styles = document.styleSheets
  /* let I = document.querySelectorAll('[style]') // probably not so relevant */

  if (cssStyling) {
    // show styles
    for (const index in styles) {
      if (styles[index].type === 'text/css') {
        styles[index].disabled = false
      }
    }
  } else {
    // hide styles
    for (const index in styles) {
      if (styles[index].type === 'text/css') {
        styles[index].disabled = true
      }
    }
    /* for (var i in I) I[i].style = '' */
  }
}

/**
 * I show the hoster in the footer. At build time the hoster is determined from the
 * env vars and memoized in an old-style next.js env var in next.config.js.
 * This values is used here to render the matching logo and link.
 */
const Footer = ({
  _platform = 'VERCEL',
  _notification = 'error',
}: {
  _platform?: keyof typeof HOSTER
  _notification?: keyof typeof NOTIFICATION_STATES
}): ComponentReturnType => (
  <>
    <div style={{ display: 'inline-block' }}>
      <p>Hosted on</p>
      {HOSTER[process.env.platform as string]}
    </div>
    <p>©Copyright 2050 by nobody. All rights reversed.</p>
    <Toggle
      checked
      label='CSS styling'
      toggleId='cssStyling'
      onChange={toggleCss}
    />
    <Toggle disabled label='Something else' toggleId='somethingElse' />
  </>
)

export default Footer
