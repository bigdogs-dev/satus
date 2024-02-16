import studio from '@theatre/studio'
import { useCurrentProject } from 'libs/theatre'
import { useEffect } from 'react'
import s from './studio.module.scss'

let initialized = false

export function Studio() {
  const project = useCurrentProject()

  useEffect(() => {
    if (initialized) return

    studio.initialize().then(() => {
      console.log('Studio initialized')
    })

    initialized = true
  }, [])

  useEffect(() => {
    studio.ui.restore()

    return () => {
      studio.ui.hide()
    }
  }, [])

  return (
    <div className={s.studio}>
      <button
        onClick={() => {
          // setVisible(!visible)

          console.log(project)
          const id = project.address.projectId
          const json = studio.createContentOfSaveFile(id)

          const file = new File([JSON.stringify(json)], 'config.json', {
            type: 'application/json',
          })
          const url = URL.createObjectURL(file)
          const a = document.createElement('a')
          a.href = url
          // create title using id and date up to seconds
          const title = `${id}-${new Date().toISOString().slice(0, 19)}`
          a.download = title
          a.click()
        }}
        className={s.save}
      >
        💾
      </button>
    </div>
  )
}
