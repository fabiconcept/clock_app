import React, { useContext, useEffect } from 'react'
import { contextData } from '../App'
import DailyProgess from '../features/dailyProgess'
import SetFocus from '../features/SetFocus'
import TodoTab from '../features/todoTab'

const Focus = () => {
  const {nav} = useContext(contextData)


  return (
    <div className="focus">
        <section>
            <SetFocus/>
            <TodoTab/>
        </section>
        <section>
          <DailyProgess/>
        </section>
    </div>
  )
}

export default Focus