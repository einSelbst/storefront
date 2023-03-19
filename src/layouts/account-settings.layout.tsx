import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getLayout as getSiteLayout } from './site.layout'

type ActiveLinkProps = {
  readonly children: React.ReactNode
  readonly href: string
  readonly className?: string
}

const ActiveLink = ({ children, href, className = '' }: ActiveLinkProps) => {
  const router = useRouter()
  return (
    <Link href={href} scroll={false}>
      <a
        className={`${
          router.pathname === href
            ? 'border-gray-800 text-gray-900'
            : 'border-transparent text-gray-600 hover:text-gray-700'
        } ${className} whitespace-no-wrap block border-b-2 pb-4 text-sm font-semibold focus:text-gray-900 focus:outline-none sm:text-base`}>
        {children}
      </a>
    </Link>
  )
}

const AccountSettingsLayout = ({
  children,
}: {
  readonly children: React.ReactNode
}) => (
  <div className='mx-auto max-w-xl px-8'>
    <h1 className='text-2xl font-semibold text-gray-900'>Account Settings</h1>

    <div
      className='scrollbar-none mt-6 flex overflow-x-auto'
      style={{ boxShadow: 'inset 0 -2px 0 #edf2f7' }}>
      <ActiveLink href='/account-settings/basic-information'>
        Basic Information
      </ActiveLink>

      <ActiveLink className='ml-10' href='/account-settings/profile'>
        Profile
      </ActiveLink>

      <ActiveLink className='ml-10' href='/account-settings/team-settings'>
        Team Settings
      </ActiveLink>

      <ActiveLink className='ml-10' href='/account-settings/billing'>
        Billing
      </ActiveLink>

      <ActiveLink className='ml-10' href='/account-settings/notifications'>
        Notifications
      </ActiveLink>

      <ActiveLink className='ml-10' href='/account-settings/security'>
        Security
      </ActiveLink>
    </div>

    <div>{children}</div>
  </div>
)

/* export const getLayout = (page: React.ReactNode) => */
export const getLayout = (page: NextPage) =>
  getSiteLayout(<AccountSettingsLayout>{page}</AccountSettingsLayout>)

export default AccountSettingsLayout
