import {
  Balloon,
  Cigarette,
  Cylinder,
  Droplets,
  Flame,
  FlameKindling,
  Footprints,
  Gem,
  House,
  Layers,
  Medal,
  Package,
  Paperclip,
  PartyPopper,
  PenLine,
  PlugZap,
  Scissors,
  ShowerHead,
  Smile,
  SprayCan,
  ToyBrick,
} from 'lucide-react'

const registry = {
  Balloon,
  Cigarette,
  Cylinder,
  Droplets,
  Flame,
  FlameKindling,
  Footprints,
  Gem,
  House,
  Layers,
  Medal,
  Paperclip,
  PartyPopper,
  PenLine,
  PlugZap,
  Scissors,
  ShowerHead,
  Smile,
  SprayCan,
  ToyBrick,
}

export default function CategoryIcon({ name, size = 22 }) {
  const Icon = registry[name] ?? Package
  return <Icon size={size} aria-hidden='true' />
}
