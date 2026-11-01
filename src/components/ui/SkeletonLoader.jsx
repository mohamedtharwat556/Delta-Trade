import { useState } from 'react'

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const skeletons = Array.from({ length: count })

  return (
    <div className='skeleton-loader'>
      {skeletons.map((_, index) => (
        <div key={index} className={`skeleton skeleton--${type}`}>
          <div className='skeleton__shimmer' />
        </div>
      ))}
    </div>
  )
}
