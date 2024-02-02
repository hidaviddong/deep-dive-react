import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

const sources = [
  'https://images.pexels.com/photos/939478/pexels-photo-939478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1692984/pexels-photo-1692984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/162829/squirrel-sciurus-vulgaris-major-mammal-mindfulness-162829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]

function Icon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="css-i6dzq1">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}
interface FlyOutContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FlyOutContext = createContext<FlyOutContextType | null>(null)

function Flyout(props: PropsWithChildren) {
  const [open, setOpen] = useState(false)

  return (
    <div className="absolute right-0 top-0">
      <FlyOutContext.Provider value={{ open, setOpen }}>{props.children}</FlyOutContext.Provider>
    </div>
  )
}

function Toggle() {
  const context = useContext(FlyOutContext)
  return (
    <div onClick={() => context?.setOpen(!context.open)} className="text-white">
      <Icon />
    </div>
  )
}

function List(props: PropsWithChildren) {
  const context = useContext(FlyOutContext)
  return context?.open ? (
    <ul className="absolute top-5 flex flex-col items-center justify-center gap-y-1 rounded-md bg-white p-2">
      {props.children}
    </ul>
  ) : (
    <></>
  )
}

function Item(props: PropsWithChildren) {
  return (
    <li
      onClick={() => console.log(props.children)}
      className="mx-4 w-full cursor-pointer rounded-md bg-gray-50 text-center hover:bg-gray-100">
      {props.children}
    </li>
  )
}
Flyout.Toggle = Toggle
Flyout.List = List
Flyout.Item = Item

function FlyoutMenu() {
  return (
    <Flyout>
      <Flyout.Toggle />
      <Flyout.List>
        <Flyout.Item>Edit</Flyout.Item>
        <Flyout.Item>Delete</Flyout.Item>
      </Flyout.List>
    </Flyout>
  )
}

export default function CompoundPattern() {
  return (
    <div className="flex flex-col gap-y-4">
      {sources.map((source) => (
        <div className="relative w-40 rounded-md bg-cover" key={source}>
          <img src={source} />
          <FlyoutMenu />
        </div>
      ))}
    </div>
  )
}
