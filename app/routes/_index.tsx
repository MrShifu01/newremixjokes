import { Outlet } from "@remix-run/react";

function Index() {
  return (
    <>
      <Outlet/>
      <div>Index Route</div>
    </>
  )
}

export default Index