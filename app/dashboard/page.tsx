'use server'

import { db } from "@/lib/db"
import { ContentDashboard } from "./_components/content"

const LandingPage = async () => {
  const dataComputer = await db.computer.findMany()

  return (
    <ContentDashboard computer={dataComputer}/>
  )
}

export default LandingPage
