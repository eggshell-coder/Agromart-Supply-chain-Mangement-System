import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function AuditHistory() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />
      <div className="flex-1 md:ml-sidebar-width flex flex-col min-h-screen">
        <Topbar />
        <main className="p-xl flex-1 bg-background">
          <div className="mb-lg flex justify-between items-end">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                Audit History
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Comprehensive log of all system administrative actions and data modifications.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-outline-variant rounded-full font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors text-on-surface">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
              <button className="px-4 py-2 border border-outline-variant rounded-full font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors text-on-surface">
                <span className="material-symbols-outlined text-sm">download</span>
                Export
              </button>
            </div>
          </div>
          {/* Data Grid Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-table-header-bg border-b border-outline-variant">
                  <tr>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      User
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Role
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Action
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Entity
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Details (Before / After)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant font-body-sm text-body-sm text-on-surface">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      2023-10-27 14:32:01
                    </td>
                    <td className="p-4 font-label-md text-label-md">
                      Sarah Jenkins
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-surface-container-highest rounded-full text-xs">
                        Logistics Mgr
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold">
                        UPDATE
                      </span>
                    </td>
                    <td className="p-4">
                      Shipment #SH-8821
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-on-surface-variant line-through">
                          Status: In Transit
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-outline">
                          arrow_forward
                        </span>
                        <span className="text-primary-fixed-dim font-medium">
                          Status: Delivered
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      2023-10-27 13:15:44
                    </td>
                    <td className="p-4 font-label-md text-label-md">
                      David Chen
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-surface-container-highest rounded-full text-xs">
                        SysAdmin
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold">
                        CREATE
                      </span>
                    </td>
                    <td className="p-4">
                      User Account
                    </td>
                    <td className="p-4 text-on-surface-variant">
                      Created user 'm.rodriguez' with role 'Warehouse Staff'
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Showing 1 to 2 of 1,024 entries
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-50 text-sm">
                  Prev
                </button>
                <button className="px-3 py-1 bg-primary-container text-on-primary rounded text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low text-sm">
                  2
                </button>
                <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
