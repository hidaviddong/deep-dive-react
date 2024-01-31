import { createBrowserRouter } from 'react-router-dom'

import ChildComponent from '@/pages/child-component'
import ControllerRender from '@/pages/controller-render'
import EventBus from '@/pages/event-bus'
import Home from '@/pages/home'
import RenderFunction from '@/pages/render-function'
import StaticProperty from '@/pages/static-property'

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
  },
  {
    path: '/render-function',
    element: (
      <ChildComponent>
        <RenderFunction />
      </ChildComponent>
    )
  },
  {
    path: '/static-property',
    element: (
      <ChildComponent>
        <StaticProperty />
      </ChildComponent>
    )
  },
  {
    path: '/event-bus',
    element: (
      <ChildComponent>
        <EventBus />
      </ChildComponent>
    )
  }
])
