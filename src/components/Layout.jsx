import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ children }) {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />
      <div className="flex-grow md:ml-[280px] w-full max-w-full overflow-x-hidden bg-background">
        <Topbar />
        <main className="p-margin-mobile md:p-margin-desktop max-w-max-width mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
