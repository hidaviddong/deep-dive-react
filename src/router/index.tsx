import { createBrowserRouter } from 'react-router-dom'

import ErrorBoundary from '@/components/ui/error-boundary'
import BatchUpdate from '@/pages/batch-update'
import ChildComponent from '@/pages/child-component'
import CompoundPattern from '@/pages/compound-pattern'
import ControllerRender from '@/pages/controller-render'
import EventBus from '@/pages/event-bus'
import ExternalStore from '@/pages/external-store'
import FlushSync from '@/pages/flush-sync'
import HOCErrorBoundary from '@/pages/hoc-error-boundary'
import HOCPropsProxy from '@/pages/hoc-props-proxy'
import Home from '@/pages/home'
import RenderFunction from '@/pages/render-function'
import RenderSlice from '@/pages/render-slice'
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
  },
  {
    path: '/hoc-props-proxy',
    element: (
      <ChildComponent>
        <HOCPropsProxy />
      </ChildComponent>
    )
  },
  {
    path: '/hoc-error-boundary',
    element: (
      <ChildComponent>
        <ErrorBoundary fallback={<p>成功捕获错误！</p>}>
          <HOCErrorBoundary />
        </ErrorBoundary>
      </ChildComponent>
    )
  },
  {
    path: '/render-slice',
    element: (
      <ChildComponent>
        <RenderSlice />
      </ChildComponent>
    )
  },
  {
    path: '/compound-pattern',
    element: (
      <ChildComponent>
        <CompoundPattern />
      </ChildComponent>
    )
  },
  {
    path: '/batch-update',
    element: (
      <ChildComponent>
        <BatchUpdate />
      </ChildComponent>
    )
  },
  {
    path: '/flush-sync',
    element: (
      <ChildComponent>
        <FlushSync />
      </ChildComponent>
    )
  },
  {
    path: '/external-store',
    element: (
      <ChildComponent>
        <ExternalStore />
      </ChildComponent>
    )
  }
])
