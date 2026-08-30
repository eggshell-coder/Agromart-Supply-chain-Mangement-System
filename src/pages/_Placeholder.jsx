import Layout from '../components/Layout'

export default function PlaceholderPage({ title, description }) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-xl">
        <div className="w-16 h-16 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mb-md">
          <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
        </div>
        <h2 className="text-headline-md font-bold text-on-surface mb-xs">{title}</h2>
        <p className="text-body-md text-on-surface-variant max-w-md">
          {description || 'This view is queued for conversion.'}
        </p>
      </div>
    </Layout>
  )
}
