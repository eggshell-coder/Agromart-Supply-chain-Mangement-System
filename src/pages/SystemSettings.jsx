import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function SystemSettings() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />
      <div className="flex-1 md:ml-sidebar-width flex flex-col min-h-screen">
        <Topbar />
        <main className="w-full max-w-7xl mx-auto p-xl">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-xl">
            {/* Settings Navigation */}
            <nav className="flex flex-col gap-sm">
              <a className="px-4 py-2 bg-active-highlight text-on-secondary-fixed rounded-full font-bold font-label-md text-label-md transition-colors flex items-center gap-2" href="#">
                <span className="material-symbols-outlined" data-icon="settings">
                  settings
                </span>
                General
              </a>
              <a className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-full font-label-md text-label-md transition-colors flex items-center gap-2" href="#">
                <span className="material-symbols-outlined" data-icon="notifications">
                  notifications
                </span>
                Notifications
              </a>
              <a className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-full font-label-md text-label-md transition-colors flex items-center gap-2" href="#">
                <span className="material-symbols-outlined" data-icon="inventory_2">
                  inventory_2
                </span>
                Inventory
              </a>
              <a className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-full font-label-md text-label-md transition-colors flex items-center gap-2" href="#">
                <span className="material-symbols-outlined" data-icon="security">
                  security
                </span>
                Security
              </a>
            </nav>
            {/* Settings Content Area */}
            <div className="flex flex-col gap-xl">
              <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                <h2 className="font-headline-sm text-headline-sm text-primary mb-md border-b border-outline-variant pb-sm">
                  General Information
                </h2>
                <form className="space-y-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-sm">
                      <label className="font-label-md text-label-md text-on-surface-variant">
                        Company Name
                      </label>
                      <input className="border border-outline-variant rounded p-2 font-body-md text-body-md focus:outline-none focus:border-primary-container" type="text" defaultValue="Agromart Logistics Inc." />
                    </div>
                    <div className="flex flex-col gap-sm">
                      <label className="font-label-md text-label-md text-on-surface-variant">
                        Support Email
                      </label>
                      <input className="border border-outline-variant rounded p-2 font-body-md text-body-md focus:outline-none focus:border-primary-container" type="email" defaultValue="support@agromart.com" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-sm">
                    <label className="font-label-md text-label-md text-on-surface-variant">
                      Timezone
                    </label>
                    <select className="border border-outline-variant rounded p-2 font-body-md text-body-md focus:outline-none focus:border-primary-container bg-transparent">
                      <option>UTC - Coordinated Universal Time</option>
                      <option>EST - Eastern Standard Time</option>
                      <option>PST - Pacific Standard Time</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-primary-container text-on-primary px-4 py-2 rounded font-label-md text-label-md hover:opacity-90 transition-opacity" type="button">
                      Save Changes
                    </button>
                  </div>
                </form>
              </section>
              <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                <h2 className="font-headline-sm text-headline-sm text-primary mb-md border-b border-outline-variant pb-sm">
                  Notification Preferences
                </h2>
                <div className="space-y-md">
                  <div className="flex items-center justify-between p-md border border-outline-variant rounded bg-surface-bright">
                    <div>
                      <h3 className="font-label-md text-label-md text-on-surface">
                        Order Updates
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                        Receive alerts when shipment status changes.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-active-highlight"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-md border border-outline-variant rounded bg-surface-bright">
                    <div>
                      <h3 className="font-label-md text-label-md text-on-surface">
                        Spoilage Alerts
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                        Immediate notifications for temperature anomalies.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-error"></div>
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
