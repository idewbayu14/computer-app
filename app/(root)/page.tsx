'use server'

import { db } from "@/lib/db"
import { ContentComponent } from "./_components/content"

const LandingPage = async () => {
  const dataComputer = await db.computer.findMany() 

  return (
    <ContentComponent computer={dataComputer}/>
  )
}

export default LandingPage
