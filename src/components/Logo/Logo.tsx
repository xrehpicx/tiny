import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'auto' | 'light' | 'dark'
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    variant = 'auto',
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  /* eslint-disable @next/next/no-img-element */
  if (variant === 'dark') {
    return (
      <img
        alt="Tinyleaf Wordmark"
        width={220}
        height={40}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('max-w-[14rem] w-full h-[40px]', className)}
        src="/tiny-wordmark-transparent-white.png"
      />
    )
  }

  if (variant === 'light') {
    return (
      <img
        alt="Tinyleaf Wordmark"
        width={220}
        height={40}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('max-w-[14rem] w-full h-[40px]', className)}
        src="/tiny-wordmark-transparent-black.png"
      />
    )
  }

  return (
    <img
      alt="Tinyleaf Wordmark"
      width={220}
      height={40}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[14rem] w-full h-[40px]', className)}
      src="/tiny-wordmark-transparent-black.png"
    />
  )
}
