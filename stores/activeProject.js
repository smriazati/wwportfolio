// stores/counter.js
import { defineStore } from 'pinia'

export const useActiveProjectStore = defineStore('activeProject', {
    state: () => {
        return {
            activeProject: {
                title: undefined,
                location: undefined,
                _id: undefined
            },
            activeProjectType: undefined
        }
    },
    actions: {
        setActiveProject(title, location, _id) {
            this.activeProject.title = title
            this.activeProject.location = location
            this.activeProject._id = _id
        },
        clearActiveProject() {
            this.activeProject.title = undefined;
            this.activeProject.location = undefined;
            this.activeProject._id = undefined
        },
        setActiveProjectType(type) {
            this.activeProjectType = type
        },
        clearActiveProjectType() {
            this.activeProjectType = undefined
        }
    },
})