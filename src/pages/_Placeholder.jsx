export default function Placeholder({ name }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="w-12 h-12 rounded-2xl bg-forest-800/10 flex items-center justify-center">
        <span className="text-2xl">🚧</span>
      </div>
      <p className="text-forest-900 font-semibold">{name}</p>
      <p className="text-sm text-gray-400">Coming soon — being built next</p>
    </div>
  )
}
