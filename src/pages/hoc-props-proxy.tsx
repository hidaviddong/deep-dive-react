// 可以看看React-Router中WithRouter的实现方式
// https://reactrouter.com/en/main/start/faq
// import {
//     useLocation,
//     useNavigate,
//     useParams,
//   } from "react-router-dom";

//   function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//       let location = useLocation();
//       let navigate = useNavigate();
//       let params = useParams();
//       return (
//         <Component
//           {...props}
//           router={{ location, navigate, params }}
//         />
//       );
//     }

//     return ComponentWithRouterProp;
//   }

import type { ComponentType } from 'react'

interface HOCProps {
  title?: string
}

export function HOC<P extends object>(WrappedComponent: ComponentType<P & HOCProps>) {
  return function Advance(props: P) {
    return <WrappedComponent {...props} title="This is Title" />
  }
}

function SimpleComponent(props: HOCProps) {
  return <div className="text-3xl font-bold">{props.title}</div>
}

const EnhancedComponent = HOC(SimpleComponent)

export default function HOCPropsProxy() {
  return (
    <div>
      <p>下面的值是由HOC注入的</p>
      <EnhancedComponent />
    </div>
  )
}
