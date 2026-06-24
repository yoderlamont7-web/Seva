type IconProps = { className?: string }

export function IconBolt({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconTag({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function IconPin({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function IconTelegram({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.94 4.6 18.9 19.2c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78L18.4 6.3c.38-.34-.08-.53-.59-.19L6.04 13.5l-4.66-1.46c-1.01-.32-1.03-1.01.21-1.5l18.22-7.02c.84-.31 1.58.2 1.13 1.08Z" />
    </svg>
  )
}

export function IconClock({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m5 12 5 5L20 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const advantageIcons = {
  bolt: IconBolt,
  tag: IconTag,
  pin: IconPin,
} as const
