import { createBrowserRouter } from 'react-router-dom'

import ChildComponent from '@/pages/child-component'
import ControllerRender from '@/pages/controller-render'
import Home from '@/pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/controller-render',
    element: (
      <ChildComponent>
        <ControllerRender />
      </ChildComponent>
    )
  }
])
