import { useState } from 'react'

export default function QuantityPresets({ onChange }) {
  const presets = [1, 3, 5, 10]

  return (
    <div className='quantity-presets'>
      {presets.map((preset) => (
        <button
          key={preset}
          className='quantity-preset'
          onClick={() => onChange(preset)}
        >
          {preset}
        </button>
      ))}
    </div>
  )
}
