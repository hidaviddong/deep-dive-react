import { RouterProvider } from 'react-router-dom'

import { router } from './router'

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <RouterProvider router={router} />
    </div>
  )
}
